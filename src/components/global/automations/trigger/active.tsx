import { InstagramDuoTone } from '@/icons/gloabl-icons'
import { PlaneIcon, SendIcon } from 'lucide-react'
import React from 'react'

type Props = {
    type: string
    keywords: {
        id: string
        word: string
        automationId: string | null
    }[]
}

const ActiveTrigger = ({type, keywords}: Props) => {
  return (
    <div className="bg-background-80 p-3 rounded-xl w-full">
        <div className="flex gap-x-2 items-center">
            {type === 'COMMENT' ? <InstagramDuoTone color='blue' width="20" height="20"/> : <SendIcon color='blue' size={20}/>}
            <p className='text-lg font-semibold'>
                {type === 'COMMENT' 
                ? 'User comments on my post.'
                : 'User sends me a direct message.'
                }
            </p>
        </div>
        <p className="text-gray-400">
            {type === "COMMENT"
            ? 'If the user comments on a video that is setup to listen for keywords, this automation will fire'
            : 'If the user send your a message that contains a keyword, this automation will fire'
            }
        </p>
        <div className="flex gap-2 my-5 flex-wrap">
            {keywords.map((word) => (
                <div
                    key={word.id}
                    className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center gap-x-2 capitalize text-white font-light py-1 px-4 rounded-full"
                >
                    {word.word}
                </div>
            ))}
        </div>
    </div>
  )
}

export default ActiveTrigger