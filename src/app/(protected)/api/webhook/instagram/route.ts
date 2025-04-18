import { createChatHistory, getChatHistory, getKeywordAutomation, getKeywordPost, matchKeyword, trackResponses } from "@/actions/webhook/queries";
import { sendDM, sendPrivateMessage } from "@/lib/fetch";
import { NextRequest, NextResponse } from "next/server";
import {client} from "@/lib/prisma"
import { findAutomation } from "@/actions/automations/queries";
import OpenAI from "openai"
const openai = new OpenAI()


export async function GET(req: NextRequest) {
    const hub = req.nextUrl.searchParams.get('hub.challenge')
    return new NextResponse(hub)
}


export async function POST(req: NextRequest){
    const webhook_payload = await req.json()

    let matcher

    try{
        if(webhook_payload.entry[0].messaging){
            matcher = await matchKeyword(webhook_payload.entry[0].messaging[0].message.text)
        }

        if(webhook_payload.entry[0].changes){
            matcher = await matchKeyword(
                webhook_payload.entry[0].changes[0].value.text
            )
        }

        if(matcher && matcher.automationId){
            if(webhook_payload.entry[0].messaging){
                const automation = await getKeywordAutomation(matcher.automationId, true)
                if(automation && automation.triggers){
                    if(automation.listener && automation.listener.listener === 'MESSAGE'){
                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id, 
                            webhook_payload.entry[0].messaging[0].sender.id,
                            automation.listener?.prompt,
                            automation.User?.integrations[0].token!
                        )

                        if(direct_message.status === 200){
                            const tracked = await trackResponses(automation.id, 'DM')

                            if(tracked){
                                return NextResponse.json({
                                    message: "Message sent"
                                }, 
                                { status: 200  }
                                )
                            }
                        }
                    }

                    if(automation.listener && automation.listener.listener === "SMARTAI" && automation.User?.subscription?.plan === "PRO"){
                        const smart_ai_message = await openai.chat.completions.create({
                            model: 'gpt-4o',
                            messages: [
                                {
                                    role: 'assistant',
                                    content: `${automation.listener?.prompt}: keep responses under 2 sentences`
                                }
                            ]
                        })

                        if(smart_ai_message.choices[0].message.content){
                            const receiver = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                webhook_payload.entry[0].messaging[0].message.text
                            )
                            const sender = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                smart_ai_message.choices[0].message.content
                            )

                            await client.$transaction([receiver, sender])

                            const direct_message = await sendDM(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                smart_ai_message.choices[0].message.content,
                                automation.User?.integrations[0].token!
                            )

                            if(direct_message.status === 200){
                                const tracked = await trackResponses(automation.id, 'DM')
                                if(tracked){
                                    return NextResponse.json({
                                        message: 'Message sent'
                                    }, {status: 200})
                                }
                            }
                        }

                    }
                }
            }
            console.log("Received webhook entry:", JSON.stringify(webhook_payload.entry[0], null, 2));

            if(
                webhook_payload.entry[0].changes && 
                webhook_payload.entry[0].changes[0].field === 'comments'
            ){
                const automation = await getKeywordAutomation(matcher.automationId, false)
                console.log('getting the automations')

                const automation_post = await getKeywordPost(
                    webhook_payload.entry[0].changes[0].value.media.id, automation?.id!
                )

                console.log('found keyword', automation_post)

                if(automation && automation_post && automation.triggers){
                    console.log('first if')
                    if(automation.listener){
                        console.log('second if')
                        if(automation.listener.listener === "MESSAGE"){
                            console.log(
                                'SENDING DM, WEB HOOK PAYLOAD',
                                webhook_payload,
                                'changes',
                                webhook_payload.entry[0].changes[0].value.from
                            )

                            console.log(
                                'COMMENT VERSION:',
                                webhook_payload.entry[0].changes[0].value.from.id
                            )

                            const direct_message = await sendPrivateMessage(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].changes[0].value.id,
                                automation.listener?.prompt,
                                automation.User?.integrations[0].token!
                            )

                            if(direct_message.status === 200){
                                const tracked = await trackResponses(automation.id, 'COMMENT')

                                if(tracked){
                                    return NextResponse.json(
                                        {
                                            message: 'Message sent'
                                        },
                                        {status: 200}
                                    )
                                }
                            }
                        }

                        if(automation.listener.listener === 'SMARTAI' && automation.User?.subscription?.plan === 'PRO'){
                            console.log('chat with OPENAI')
                            const smart_ai_message = await openai.chat.completions.create({
                                model: 'gpt-4o',
                                messages: [
                                    {
                                        role: 'assistant',
                                        content: `${automation.listener?.prompt} : Keep responses under 2 sentences`
                                    }
                                ]
                            })

                            if(smart_ai_message.choices[0].message.content){
                                const receiver = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].choices[0].value.from.id,
                                    webhook_payload.entry[0].choices[0].value.text
                                )
                                const sender = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].choices[0].value.from.id,
                                    smart_ai_message.choices[0].message.content
                                )

                                await client.$transaction([receiver, sender])

                                const direct_message = await sendDM(
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].choices[0].value.from.id,
                                    smart_ai_message.choices[0].message.content,
                                    automation.User?.integrations[0].token!
                                )

                                if(direct_message.status === 200){
                                    const tracked = await trackResponses(automation.id, 'COMMENT')
                                    if(tracked){
                                        return NextResponse.json({
                                            message: 'Message sent'
                                        }, {status: 200})
                                    }
                                }
                            }
                            return NextResponse.json(
                                {
                                    message: 'Chat With AI didn"t matched'
                                }, 
                                {
                                    status: 404
                                }
                            )
                        }
                    }
                }
            }
        }

        if(!matcher){
            const customer_history = await getChatHistory(
                webhook_payload.entry[0].messaging[0].recipient.id,
                webhook_payload.entry[0].messaging[0].sender.id
            )
            console.log('not matchet', customer_history.history)

            if(customer_history.history.length > 0) {
                console.log('history length')

                const automation = await findAutomation(customer_history.automationId!)

                if(automation?.User?.subscription?.plan === 'PRO' && automation.listener?.listener === 'SMARTAI'){
                    console.log('subscription')
                    const smart_ai_message = await openai.chat.completions.create({
                        model: 'gpt-4o',
                        messages: [
                          {
                            role: 'assistant',
                            content: `${automation.listener?.prompt} : Keep responses under 2 sentences`,
                          },
                          ...customer_history.history,
                          {
                            role: 'user',
                            content: webhook_payload.entry[0].messaging[0].message.text,
                          },
                        ],
                      });
                    

                    if(smart_ai_message.choices[0].message.content){
                        const receiver = createChatHistory(
                            automation.id, 
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            webhook_payload.entry[0].messaging[0].message.text
                        )
                        const sender = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            smart_ai_message.choices[0].message.content
                        )

                        await client.$transaction([receiver, sender])

                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            smart_ai_message.choices[0].message.content,
                            automation.User?.integrations[0].token!
                        )

                        if(direct_message.status === 200){
                            return NextResponse.json(
                                {
                                    message: 'Message sent'
                                }, 
                                {
                                    status: 200
                                }
                            )
                        }
                    }

                }

                return NextResponse.json(
                    {
                        message: 'No automation set'
                    }, 
                    {
                        status: 200
                    }
                )
            }               
            console.log('error 404')
            
            return NextResponse.json(
                {
                    message: 'No automation set'
                }, 
                {
                    status: 200
                }
            )
        }

    }catch(err){
        console.log('error', err)
        return NextResponse.json(
            {
                message: 'No automation set'
            }, 
            {
                status: 500
            }
        )
    }
}