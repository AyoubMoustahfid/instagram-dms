"use client"
import React, { useMemo } from 'react'
import { usePaths } from '@/hooks/use-nav'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import GradientButton from '../gradient-button'
import { Button } from '@/components/ui/button'
import { useQueryAutomations } from '@/hooks/use-queries'
import CreatAutomation from '../create-automation'
import moment from 'moment'
import { useMutationDataState } from '@/hooks/use-mutation-data'

type Props = {}

const AutomationList = (props: Props) => {
    const { data } = useQueryAutomations()
    const { latestVariable } = useMutationDataState(["create-automation"])
    const { pathname } = usePaths()

    const optimisticUiData = useMemo(() => {
        if (
            data?.status === 200 &&
            latestVariable?.variables &&
            Array.isArray(data?.data)
        ) {
            const test = [latestVariable.variables, ...data.data]
            return { data: test }
        }
        return data
    }, [latestVariable, data])

    const noData =
        data?.status !== 200 ||
        !data?.data ||
        !Array.isArray(data.data) ||
        data.data.length === 0

    if (noData) {
        return (
            <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
                <h3>No automations</h3>
                <CreatAutomation />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-3">
            {optimisticUiData?.data.map((automation) => (
                <Link
                    href={`${pathname}/${automation.id}`}
                    key={automation.id}
                    className="bg-[#1D1D1D] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]"
                >
                    <div className="flex flex-col flex-1 items-start">
                        <h2 className="text-xl font-semibold">
                            {automation.name}
                        </h2>
                        <p className="text-[#9B9CA0] text-sm font-light mb-2">
                            This is from the comment
                        </p>
                        {automation.keywords && automation.keywords.length > 0 ? (
                            <div className="flex gap-x-2 flex-wrap mt-3">
                                {
                                    // @ts-ignore
                                    automation.keywords.map((keyword, index) => (
                                        <div
                                            key={keyword.id || index}
                                            className={cn(
                                                'rounded-full px-4 py-1 capitalize',
                                                (index + 1) % 1 === 0 && 'bg-keyword-green/15 border-2 border-keyword-green',
                                                (index + 1) % 2 === 0 && 'bg-keyword-purple/15 border-2 border-keyword-purple',
                                                (index + 1) % 3 === 0 && 'bg-keyword-yellow/15 border-2 border-keyword-yellow',
                                                (index + 1) % 4 === 0 && 'bg-keyword-red/15 border-2 border-keyword-red'
                                            )}
                                        >
                                            {keyword.word}
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
                                <p className="text-sm text-[#bfc0c3]">
                                    No Keywords
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-between">
                        <p className="capitalize text-sm font-light text-[#9B9CA0]">
                            {moment(automation.createdAt).format("MMM Do YY")}
                        </p>
                        {automation.listener?.listener === 'SMARTAI' ? (
                            <GradientButton
                                type="BUTTON"
                                className="w-full bg-background-80 text-white hover:bg-background-80"
                            >
                                Smart AI
                            </GradientButton>
                        ) : (
                            <Button className="bg-background-80 hover:bg-background-80 text-white">
                                Standard
                            </Button>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default AutomationList
