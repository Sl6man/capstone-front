"use client"


import React from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import Image from 'next/image'
import ViewAllScraper from '@/components/ViewAllScraper'

function Page() {
  return (
    
       <div className="w-full h-screen bg-gray-200 overflow-hidden">
      <TransformWrapper>
        <TransformComponent>
          <Image
            src="/Maps.png"
            alt="Temporary Map"
            width={1000}
            height={120}
            className="w-[2000px] h-auto"
          />
        </TransformComponent>
      </TransformWrapper>

      <ViewAllScraper></ViewAllScraper>
    </div>     


  )
}

export default Page