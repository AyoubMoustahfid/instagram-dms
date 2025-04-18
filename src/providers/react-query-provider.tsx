'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type Props = {
  children: React.ReactNode
}

export default function ReactQueryProvider({children} : Props) {
  const client = new QueryClient()
  
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}