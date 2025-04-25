"use client"


import React, { useState } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import Image from 'next/image'
import ViewAllScraper from '@/components/map/ViewAllScraper'
import AddScraper from '@/components/map/AddScraper'
import ViewScraper from '@/components/map/ViewScraper'
import EditScraper from '@/components/map/EditScraper'


function Page() {
  const [isOpenNow, setIsOpenNow] = useState<string | null>(null)




  

  
  const [selectedScraperId, setSelectedScraperId] = useState<number | null>(null);
  ;

  return (
    
       <div className="w-full h-screen bg-gray-200 overflow-hidden  overflow-x-hidden relative ">
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

      <ViewAllScraper  setIsOpenNow={setIsOpenNow}   setSelectedScraperId={setSelectedScraperId} ></ViewAllScraper>
      {isOpenNow === 'AddScraper' &&  <AddScraper  setIsOpenNow={setIsOpenNow}/>}
      {isOpenNow === 'ViewScraper' &&  <ViewScraper scraperId={selectedScraperId} setIsOpenNow={setIsOpenNow} />}
      {isOpenNow === 'EditScraper' &&  <EditScraper scraperId={selectedScraperId} setIsOpenNow={setIsOpenNow} />}
    </div>     


  )
}

export default Page