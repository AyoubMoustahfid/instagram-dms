import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { prefetchUserAutomations, PrefetchUserProfile } from '@/react-query/prefetch'
import ReactQueryClientLayout from '@/components/global/react-query-client/layout'

type Props = {
  children: React.ReactNode
  params: Promise<{ slug: string }> 
}

const Layout = async ({ children, params }: Props) => {
  const queryClient = new QueryClient()
  const { slug } = await params

  await PrefetchUserProfile(queryClient)
  await prefetchUserAutomations(queryClient)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReactQueryClientLayout slug={slug}>
        {children}
      </ReactQueryClientLayout>
    </HydrationBoundary>
  )
}

export default Layout
