import { BlueAIIcon, InstagramDuoTone, TinyInstagram } from "@/icons/gloabl-icons"
import { PlaneIcon, SendIcon } from "lucide-react"
import { JSX } from "react"
import { v4 } from "uuid"


export type AutomationListenerProps = {
    id: string
    label: string
    icon: JSX.Element
    description: string
    type: 'SMARTAI' | 'MESSAGE'
}

export type AutomationTriggerProps = {
    id: string
    label: string
    icon: JSX.Element
    description: string
    type: 'COMMENT' | 'DM'
}


export const AUTOMATION_TRIGGERS: AutomationTriggerProps[] = [
    {
        id: v4(),
        label: 'User comments on my post',
        icon: <InstagramDuoTone color="#768BDD" width="20" height="20" />,
        description: 'Select if you want to automate comments on your post',
        type: 'COMMENT'
    },
    {
        id: v4(),
        label: 'User sends me a dm with a keyword',
        icon: <InstagramDuoTone color="#768BDD" width="20" height="20" />,
        description: 'Select if you want to automate Dms comments on your profile',
        type: 'DM'
    },
]

export const AUTOMATION_LISTENER: AutomationListenerProps[] = [
    {
        id: v4(),
        label: "Send the user a message",
        icon: <SendIcon color="#768BDD" size={16} />,
        description: "Enter the message that you want to send the user.",
        type: 'MESSAGE',
    },
    {
        id: v4(),
        label: "Let Smart AI take over",
        icon: <BlueAIIcon/>,
        description: "Tell AI about your project. (Upgrade to use this feature)",
        type: 'SMARTAI',
    },
] 