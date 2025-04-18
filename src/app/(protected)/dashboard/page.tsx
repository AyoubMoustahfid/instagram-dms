'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { onBoardUser } from '@/actions/user'

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const user = await onBoardUser()
      if (user.status === 200 || user.status === 201) {
        router.push(`/dashboard/${user.data?.firstname}${user.data?.lastname}`)
      } else {
        router.push('/sign-in')
      }
    }

    fetchData()
  }, [])

  return null
}

export default Page
