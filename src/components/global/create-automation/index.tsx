"use client"

import { Button } from '@/components/ui/button'
import React, { useMemo } from 'react'
import Loader from '../loader'
import { AutomationDuoTone } from '@/icons/gloabl-icons'
import { useCreateAutomation } from '@/hooks/use-automations'
import { v4 } from 'uuid'

// Optional: You can externalize this into a utility file if you want
const adjectives = ['Smart', 'Fast', 'Auto', 'Dynamic', 'Intelligent', 'Creative', 'Silent', 'Powerful']
const nouns = ['Workflow', 'Routine', 'Script', 'Sequence', 'Bot', 'Task', 'Trigger', 'Engine']

const generateAutomationName = () => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    const timestamp = new Date().getTime().toString().slice(-4) // just to ensure uniqueness
    return `${adj} ${noun} ${timestamp}`
}

type Props = {}

const CreatAutomation = (props: Props) => {
    const mutationId = useMemo(() => v4(), [])
    const { isPending, mutate } = useCreateAutomation()

    const handleCreate = () => {
        const generatedName = generateAutomationName()
        mutate({ name: generatedName, id: mutationId })
    }

    return (
        <Button
            className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]"
            onClick={handleCreate}
        >
            <Loader state={isPending}>
                <AutomationDuoTone color="white" />
                <p className="lg:inline hidden">
                    Create an Automation
                </p>
            </Loader>
        </Button>
    )
}

export default CreatAutomation
