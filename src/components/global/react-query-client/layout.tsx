"use client"


import React from 'react'
import Sidebar from '../sidebar'
import InfoBar from '../infobar'

type Props = {
  slug: string
  children: React.ReactNode
}

const ReactQueryClientLayout = ({ slug, children }: Props) => {
  return (
    <div className='p-3'>
      <Sidebar slug={slug} />

      <div className="lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto">
        <InfoBar slug={slug} />
        {children}
      </div>
    </div>
  )
}

export default ReactQueryClientLayout
