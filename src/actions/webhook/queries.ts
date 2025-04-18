import {client} from "@/lib/prisma"
import { validate as isUuid } from 'uuid';

export const matchKeyword = async (keyword: string) => {
    return await client.keyword.findFirst({
        where: {
            word: {
                equals: keyword,
                mode: 'insensitive'
            }
        }
    })
}


export const getKeywordAutomation = async (
    automationId: string,
    dm: boolean
) => {
    return await client.automation.findUnique({
        where: {
            id: automationId
        },
        include: {
            dms: dm,
            triggers: {
                where: {
                    type: dm ? 'DM' : 'COMMENT'
                }
            },
            listener: true,
            User: {
                select: {
                    subscription: {
                        select: {
                            plan: true
                        }
                    },
                    integrations: {
                        select: {
                            token: true
                        }
                    }
                }
            }
        }
    })
}


export const trackResponses = async (automationId: string, type: 'COMMENT' | 'DM') => {
    if(type === 'COMMENT'){
        return await client.listener.update({
            where: {automationId},
            data: {
                commentCount: {
                    increment: 1,
                }
            }
        })
    }

    if(type === 'DM') {
        return await client.listener.update({
            where: { automationId },
            data: {
                dmCount: {
                    increment: 1,
                }
            }
        })
    }
}

export const createChatHistory = (
    automationId: string,
    sender: string,
    receiver: string,
    message: string
) => {
    return client.automation.update({
        where: {
            id: automationId
        },
        data: {
            dms: {
                create: {
                    receiver,
                    senderId: sender,
                    message
                }
            }
        }
    })
}

export const getChatHistory = async (
    recipientId: string,
    senderId: string
  ): Promise<{ history: any[]; automationId?: string }> => {
    const history = await client.dms.findMany({
      where: {
        receiver: recipientId,
        senderId: senderId
      },
      orderBy: {
        createdAt: 'asc'
      },
      select: {
        message: true,
        Automation: {
          select: {
            id: true
          }
        },
        createdAt: true
      }
    });
  
    if (!history || history.length === 0) {
      return { history: [] };
    }
  
    const formattedHistory = history.map((entry, index) => {
      return {
        role: index % 2 === 0 ? 'user' : 'assistant', // alternate roles, assuming simple back-and-forth
        content: entry.message
      };
    });
  
    return {
      history: formattedHistory,
      automationId: history[0]?.Automation?.id // grab from first entry
    };
  };
  

export const getKeywordPost = async (postId: string, automationId: string) => {
    return await client.post.findFirst({
        where: {
            AND: [{ postId: postId }, { automationId }]
        },
        select: { automationId: true }
    })
}