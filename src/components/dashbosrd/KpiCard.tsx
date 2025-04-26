import React  from 'react'

interface kpiCardPorps{
    background?:string; 
    textStyle?:string;
    icon?:React.ReactNode;
    label?:string ;
    value?: string | number ;
}


function KpiCard({background,textStyle,icon,label,value}:kpiCardPorps) {



  return (
    <div className={`w-1/3 h-64 rounded-2xl shadow-md flex-col items-center bg-${background ||"slate-950"} `}>

        <div className='flex justify-start gap-4 m-6 '>
            <div className={`text-5xl text-${textStyle}`}>
                {icon}
            </div>
            <div className={`text-2xl text-${textStyle} mt-2 `}>
                {label}
            </div>
        </div>

        <div className='flex justify-center items-center py-6'>
            
            <p className={`text-5xl font-medium text-${textStyle}`}>{value}</p>
        </div>


    </div>
  )
}

export default KpiCard