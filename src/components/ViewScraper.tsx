import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md";


interface ViewScraprProps{
    scraperId:number | null
    setIsOpenNow: (value : string | null)=>void;

    
}


function ViewScraper({scraperId,setIsOpenNow}:ViewScraprProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;


    const [isOpen,setIsOpen]=useState(false)
    const [scraper,setScrapers]=useState<{title?:string,status?:boolean,started_date?:string,end_date?:string,}>({})

    useEffect(()=>{
        setIsOpen(true)
        

        fetch(`${apiUrl}/scraper/${scraperId}`)
        .then((response)=>response.json())
        .then((data)=>setScrapers(data))

},[])



  return (
    <div className={`absolute  top-0 right-1 h-[35%] w-[30%] py-3 mr-7 
        flex-col items-center
     transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`
    }>

    <div className='  w-full h-full  bg-white rounded-2xl shadow-lg flex flex-col '>
        
        <div className='felx justify-start w-full mt-4 '>
            <button onClick={()=>setIsOpenNow(null)} className=''><MdClose className='text-lg ml-3'/></button>
        </div>

        <div className='flex justify-center  items-center '>
        <p className='font-medium text-3xl'>{scraper.title}</p>
        </div>

        <div className='px-7'>
        <div className="w-full h-[1px] mt-6 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-60" />
        </div>
        
        <div className='flex justify-between mt-5'>

            <div className=' ml-10 flex-col items-center'>
                <div className='flex justify-center items-center'>
                    <p className='text-lg font-thin'>Scraper Status</p>
                </div>
                <div className='flex justify-center mt-1'>
                {scraper.status ? (
                        <span className="bg-green-300 text-black px-4 py-1 rounded-full">Active</span>)
                     : 
                        (<span className="bg-red-400 text-black px-4 py-1 rounded-full">Disabled</span>)
                    }
                </div>
            </div>


            <div className=' mr-12 flex-col items-center'>
                <div className='mt m-1'>
                <p className='text-lg font-thin'>Media Collected</p>
                </div>
                <div className='flex justify-center'>
                    ------
                </div>
            </div>

        </div>


        <div 
        className='mt-auto flex justify-end'>    

                 <button 
                 className='bg-yellow-400 w-28 mr-3 mb-3 rounded-3xl '
                 onClick={()=>setIsOpenNow("EditScraper")}
                 >
                    <p className='text-white text-lg font-normal'>Edit</p>
                 </button> 

        </div>

        
        </div>
        </div>
  )
}

export default ViewScraper