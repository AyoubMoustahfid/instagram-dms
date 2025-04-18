"use client"
import React from 'react'
import { usePaths } from "@/hooks/use-nav"
import { PAGE_BREAD_CRUMBS } from '@/constans/page'
import { Menu } from 'lucide-react'
import Sheet from '../sheet'
import Items from '../sidebar/items'
import { Separator } from '@/components/ui/separator'
import ClerkAuthState from '../clerk-auth-state'
import HelpDuoToneWhite from '../help-duo-tone-white'
import SubscriptionPlan from '../subscription-plan'
import UpgradeCard from '../sidebar/upgrade'
import { LogoSmall } from '@/svgs/logo-small'
import CreatAutomation from '../create-automation'
import Notification from './notification'
import Search from './search'
import MainBreadCrumb from '../bread-crumbs/main-bread-crumb'

type Props = {
    slug: string
}

const InfoBar = ({ slug }: Props) => {
    const { page } = usePaths()
    const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug

    return currentPage && (
        <div className="flex flex-col">
            <div className="flex gap-x-3 lg:gap-x-5 justify-end">
                <span className="lg:hidden flex items-center flex-1 gap-x-2">
                    <Sheet
                        trigger={<Menu />}
                        className="lg:hidden"
                    >
                        <div
                            className='flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-3xl'
                        >
                            <div
                                className="flex gap-x-2 items-center p-2 justify-start"
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
                    </Sheet>
                </span>
                <Search/>
                <CreatAutomation/>
                <Notification/>
            </div>
            <MainBreadCrumb
                page={page === slug ? 'Home' : page}
                slug={slug}
            />
        </div>
    )
}

export default InfoBar