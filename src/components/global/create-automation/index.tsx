"use client"

import { Button } from '@/components/ui/button'
import React, { useMemo } from 'react'
import Loader from '../loader'
import { AutomationDuoTone } from '@/icons/gloabl-icons'
import { useCreateAutomation } from '@/hooks/use-automations'
import { v4 } from 'uuid'

type Props = {}

const CreatAutomation = (props: Props) => {
    const mutationId = useMemo(() => v4(), [])
    const {isPending, mutate} = useCreateAutomation()

    return (
        <Button
            className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]"
            onClick={() => mutate({name: "Untitled", id: mutationId, createdAt: new Date(), keywords: []})}
        >
            <Loader state={isPending}>
                <AutomationDuoTone color="white"/>
                <p className="lg:inline hidden">
                    Create an Automation
                </p>
            </Loader>
        </Button>
    )
}

export default CreatAutomation