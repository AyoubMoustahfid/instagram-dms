'use server'

import { redirect } from 'next/navigation'
import { onCurrentUser } from '../user'
import { createIntegration, getIntegration } from './query'
import { generateTokens } from '@/lib/fetch'
import axios from 'axios'



export const onOAuthInstagram = async ( strategy: 'INSTAGRAM' | 'CRM' ) => {
    if(strategy === 'INSTAGRAM'){
        return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
    }
}


export const onIntegrate = async (code: string) => {
    const user = await onCurrentUser()

    try{
        const integration = await getIntegration(user.id)

        if(integration && integration.integrations.length === 0){
            const token = await generateTokens(code)

            if(token){
                const insta_id = await axios.get(
                    `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
                )

                const today = new Date()
                const expire_date = today.setDate(today.getDate() + 60)
                const create = await createIntegration(
                    user.id,
                    token.access_token,
                    new Date(expire_date),
                    insta_id.data.user_id
                )

                return { status: 200, data: create }
            }
            return { status: 401 }
        }
    }catch(error){
        return { status: 500 }
    }
}