import { InstagramDuoTone, SalesforceDuoToneBlue } from "@/icons/gloabl-icons"
import React from "react"

type Props = {
    title: string
    icon: React.ReactNode
    description: string
    strategy: 'INSTAGRAM' | 'CRM'
}


export const INTEGRATION_CARDS: Props[] = [
    {
        title: 'Connect Integram',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, officia eligendi. Eos.',
        icon: <InstagramDuoTone
            color="blue"
            width="35"
            height="35"
        />,
        strategy: 'INSTAGRAM',
    },
    {
        title: 'Connect Saledforce',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, officia eligendi. Eos.',
        icon: <SalesforceDuoToneBlue/>,
        strategy: 'CRM',
    },
]