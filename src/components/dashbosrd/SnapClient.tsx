"use client"


import React from 'react'
import { SnapAreaChart } from './SnapAreaChart'




type SnapClientProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  areaChartData: any[]

}


function SnapClient({ areaChartData }: SnapClientProps) {

   
  return (
    <div>
      <SnapAreaChart areaChartData={areaChartData}/>
    </div>
  )
}

export default SnapClient



