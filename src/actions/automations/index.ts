'use server'

import {onCurrentUser} from "../user"
import { findUser } from "../user/queries"
import { addKeyword, addListener, addPost, addTrigger, createAutomation, deleteKeywordQuery, findAutomation, getAutomations, updateAutomation } from "./queries"

export const createAutomations = async (data?: { id?: string; name?: string }) => {
    const user = await onCurrentUser()
    try {
      const create = await createAutomation(user.id, data ?? {})
      if (create) return { status: 200, data: 'Automation created' }
      return { status: 404, data: 'Oops! Something went wrong' }
    } catch (err) {
      console.log('err', err)
      return { status: 500, data: 'Internal server error' }
    }
  }

export const getAllAutomations = async () => {
    const user = await onCurrentUser()
    try{
        const automations = await getAutomations(user.id)
        if(automations) return {status: 200, data: automations.automations}
        return {status: 404, data: []}
    }catch(err){
        return {status: 500, data: []}
    }
}


export const getAutomationInfo = async (id: string) => {
    await onCurrentUser()
    try{
        const automation = await findAutomation(id)
        if(automation) return { status: 200, data: automation }
        return {status: 404}
    }catch(error){
        return {status: 404}
    }
}


export const updateAutomationName = async (automationId: string, data: {name?: string, active?: boolean, automation?: string}) => {
    await onCurrentUser()
    try{
        const update = await updateAutomation(automationId, data)
        if(update){
            return {
                status: 200,
                data: 'Automation successfully updated'
            }
        }
        return {
            status: 404,
            data: 'Oops! could not find automation'
        }
    }catch(error){
        return {
            status: 500,
            data: 'Oops! semething went wrong'
        }
    }
}


export const saveListener = async (automationId: string, listener: 'SMARTAI' | 'MESSAGE', prompt: string, reply?: string ) => {
    await onCurrentUser()

    try{
        const create = await addListener(automationId,listener, prompt, reply)
        if(create) return {status: 200, data: 'Listener created'}
        return {status: 404, data: 'Cant save listener'}
    }catch(error){
        return { status: 500, data: 'Oops! something went wrong' }
    }
}


export const saveTrigger = async (automationId: string, trigger: string[]) => {
    await onCurrentUser()
    try{
        const create = await addTrigger(automationId, trigger)
        if(create) return { status: 200, data: 'Trigger saved' }
        return {status: 404, data: 'Cannot save trigger'}
    }catch(err){
        console.log('error', err)
        return { status: 500, data: 'Oops! something went wrong save trigger' }
    }
}

export const saveKeyword = async (automationId: string, keyword: string) => {
    await onCurrentUser()
    try{
        console.log('keyword', keyword)
        const create = await addKeyword(automationId, keyword)

        if(create) return {status: 200, data: 'Keyword added successfully'}
        return {status: 404, data: 'Cannot add this keyword'}
    }catch(err){
        console.log('error keyword', err)
        return {status: 500, data: 'Oops! something went wrong'}
    }
}


export const deleteKeyword = async (id: string) => {
    await onCurrentUser()
    try{
        const deleted = await deleteKeywordQuery(id)

        if(deleted) return {status: 200, data: 'Keyword deleted'}
        return {status: 404, data: 'Keyword not found'}
    }catch(err){
        return {status: 500, data: 'Oops! something went wrong'}
    }
}


export const getProfilePosts = async () => {
    const user = await onCurrentUser()

    try {
        const profile = await findUser(user.id)

        console.log('profile', profile?.integrations)

        const token = profile?.integrations[0]?.token

        if (!token) {
            console.log('No integration token found for user.')
            return { status: 401, data: null }
        }

        const posts = await fetch(
            `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${token}`
        )

        const parsed = await posts.json()

        if (parsed) {
            return { status: 200, data: parsed }
        }

        console.log('Error in getting posts')
        return { status: 404, data: null }
    } catch (err) {
        console.log('Server side error in getting posts:', err)
        return { status: 500, data: null }
    }
}



export const savePosts = async (
    automationId: string,
    posts: {
        postId: string
        caption: string
        media: string
        mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
    }[]
) => {
    await onCurrentUser()
    try{
        const create = await addPost(automationId, posts)

        if(create) return { status: 200, data: 'Posts attached' }
        return { status: 404, data: 'Automation not found'}
    }catch(err){
        return { status: 500, data: 'Oops! something went wrong' }
    }
}


export const activateAutomation = async (id: string, state: boolean) => {
    await onCurrentUser()

    try{
        const update = await updateAutomation(id, {active: state})

        if(update) return {status: 200, data: `Automation ${state ? 'activated' : 'deleted'}`}

        return {status: 404, data: 'Automation not found'}
    }catch(err){
        return {status: 500, data: 'Oops! something went wrong'}
    }
}