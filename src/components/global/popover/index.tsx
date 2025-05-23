import { Popover } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React, { JSX } from 'react'

type Props = {
    trigger: JSX.Element
    children: React.ReactNode
    className?: string
}

const PopOver = ({ children, trigger, className }: Props) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {trigger}
            </PopoverTrigger>
            <PopoverContent
                className={cn('bg-[#1D1D1D] shadow-lg', className)}
                align='end'
                side="bottom"
            >
                {children}
            </PopoverContent>
        </Popover>
    )
}

export default PopOver