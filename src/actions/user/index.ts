"use server"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { createUser, findUser, updateSubscription } from "./queries"
import { refreshToken } from "@/lib/fetch"
import {stripe} from "@/app/(protected)/api/payment/route"
import { updateIntegration } from "../integrations/query"

export const onCurrentUser = async () => {
    const user = await currentUser()
    if (!user) redirect('/sign-in')
    return user
}

export const onBoardUser = async () => {
    try {
        const user = await onCurrentUser()
        const found = await findUser(user.id)

        if (found) {
            // Token refresh logic
            if (found.integrations.length > 0) {
                const today = new Date()
                const expiresAt = found.integrations[0].expiresAt
                
                if (expiresAt) {
                    const timeLeft = expiresAt.getTime() - today.getTime()
                    const days = Math.round(timeLeft / (1000 * 3600 * 24))
                    
                    if (days < 5) {
                        const refresh = await refreshToken(`${found.integrations[0].token}`)
                        const expireDate = new Date()
                        expireDate.setDate(expireDate.getDate() + 60)
                        
                        await updateIntegration(
                            refresh.data.access_token,
                            expireDate,
                            found.integrations[0].id
                        )
                    }
                }
            }

            return {
                status: 200,
                data: {
                    firstname: found.firstname,
                    lastname: found.lastname,
                }
            }
        }

        // Create new user
        const created = await createUser(
            user.id,
            user.firstName || '',
            user.lastName || '',
            user.emailAddresses[0].emailAddress
        )

        return { status: 201, data: created }
    } catch (error) {
        console.error('User onboarding failed:', error)
        return { status: 500 }
    }
}


export const onUserInfo = async () => {
    const user = await onCurrentUser()

    try{
        const profile = await findUser(user.id)
        if(profile) return {status: 200, data: profile}
        return {status: 404}
    }catch (err){
        return {status: 500}
    }
}

export const onSubscribe = async (session_id: string) => {
    const user = await onCurrentUser()

    try{
        const session = await stripe.checkout.sessions.retrieve(session_id)
        if(session){
            const subscriped = await updateSubscription(user.id, {
                customerId: session.customer as string,
                plan: 'PRO'
            })

            if(subscriped) return {status: 200}
            return { status: 401 }
        }
        return {status: 404}
    }catch(err){
        return { status: 500 }
    }
}