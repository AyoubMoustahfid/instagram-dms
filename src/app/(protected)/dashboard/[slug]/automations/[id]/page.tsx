import { getAutomationInfo } from '@/actions/automations'
import PostNode from '@/components/global/automations/post/node'
import ThenNode from '@/components/global/automations/then/node'
import Trigger from '@/components/global/automations/trigger'
import AutomationsBreadCrumb from '@/components/global/bread-crumbs/automations'
import { Warning } from '@/icons/gloabl-icons'
import { PrefetchUserAutomation } from '@/react-query/prefetch'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

type Props = {
    params: {
        slug: string
        id: string
    }
}

export async function generateMetadata({ params }: Props) {
    const { id } = await params
    const info = await getAutomationInfo(id)

    return {
        title: info.data?.name,
    }
}

// ✅ This can still be a server component
const Page = async ({ params }: Props) => {
    const { id } = await params
    console.log('id', id)
    const query = new QueryClient()
    await PrefetchUserAutomation(query, id)

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex flex-col items-center gap-y-20">
                <AutomationsBreadCrumb id={id} />
                <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
                    <div className="flex gap-x-2">
                        <Warning />
                        When...
                    </div>
                    <Trigger id={id} />
                </div>
                <ThenNode id={id} />
                <PostNode id={id} />
            </div>
        </HydrationBoundary>
    )
}

export default Page
