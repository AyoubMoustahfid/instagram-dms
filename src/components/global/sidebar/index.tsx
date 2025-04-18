"use client"

import { usePaths } from '@/hooks/use-nav'
import { LogoSmall } from '@/svgs/logo-small'
import React from 'react'
import Items from './items'
import { Separator } from '@/components/ui/separator'
import ClerkAuthState from '../clerk-auth-state'
import HelpDuoToneWhite from '../help-duo-tone-white'
import UpgradeCard from './upgrade'
import SubscriptionPlan from '../subscription-plan'

type Props = {
    slug: string
}

const Sidebar = ({ slug }: Props) => {
    const { page } = usePaths()
    return (
        <div
            className="w-[250px] border-[1px] radial fixed left-0 hidden lg:block border-[#545454] bg-gradient-to-b from-[#768BDD] via-[#171717] to-[#758BDD] bottom-0 top-0 m-3 rounded-3xl overflow-hidden"
        >
            <div
                className='flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-3xl'
            >
                <div
                    className="flex gap-x-3 items-center p-2 justify-start"
                >
                    <LogoSmall />
                    <span className="font-white text-xl font-semibold">
                        Logoipsum
                    </span>
                </div>
                <div className="flex flex-col py-3">
                    <Items
                        page={page}
                        slug={slug}
                    />
                </div>
                <div className="px-16">
                    <Separator
                        orientation="horizontal"
                        className="bg-[#333336]"
                    />
                </div>
                <div className="px-3 flex flex-col gap-y-5">
                    <div className="flex gap-x-2">
                        <ClerkAuthState />
                        <p className="text-[#989CA0]">
                            Profile
                        </p>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <HelpDuoToneWhite />
                        <p className="text-[#989CA0]">
                            Help
                        </p>
                    </div>
                </div>
                <SubscriptionPlan type="FREE">
                    <div className="flex-1 flex flex-col justify-end">
                        <UpgradeCard />
                    </div>
                </SubscriptionPlan>
            </div>
        </div>
    )
}

export default Sidebar