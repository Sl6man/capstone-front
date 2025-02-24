import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import ButtonProps from './ButtonProps';
import { IoHome } from "react-icons/io5";
import { PiMapPinArea } from "react-icons/pi";
import { MdOutlineGroups } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";



function Menu() {




  return (
    <div className='flex flex-col items-start p-5 mt-3 ml-3 h-screen'>



      {/* logo */}
      <div className='flex justify-center gap-3 ml-2'>

      <div className=''>
      <Image 
        src='/Group.png'
        alt=''
        width={40}
        height={0}
      />
    </div>

    <div className='mt-4 pt-1'>
    <h2 className=''><span className='text-md text-gray-800 font-semibold'>SnapScope</span></h2>
    </div>

      </div>
     {/*---------- */}

    <div className='flex flex-col items-center w-full mt-5'>
      <div className="w-full h-[1px] border-t border-t-gray-400 shadow-2xl"></div>
    </div>
 {/*end logo */}


    {/* HOME */}
    <div className='flex flex-col items-start w-full  '>
   

    <Link href='/dashboard' className='w-full'>
      <ButtonProps text='Dashboard' variant='Primary' icon={<IoHome className='text-xl py-1  text-yellow-400'/>} className='mt-4'
      textStyle='text-gray-400 text-sm font-semibold'
       iconBG='rounded-lg shadow-md p-1 bg-white bg-white' 
      
      />
    </Link>  
    
    <Link href='/map'className='w-full' >
      <ButtonProps text='Map' textStyle='text-gray-400 text-sm font-semibold' variant='Primary' icon={<PiMapPinArea  className='text-xl  text-yellow-400'/>}
       iconBG='rounded-lg shadow-md p-1 bg-white' className='mt-2'/>
      </Link> 

      <Link href='/team'className='w-full' >

      <ButtonProps text='Team' variant='Primary' icon={<MdOutlineGroups className='text-xl  text-yellow-400'/>} 
      textStyle='text-gray-400 text-sm font-semibold'
       iconBG='rounded-lg shadow-md p-1 bg-white bg-white' className='mt-2'/>

      </Link> 
    

 
      
     
  

    </div>

    <div  className='mt-auto w-full'>
    <Link href='/login' className='w-full '>
      <ButtonProps text=''  variant='Danger'
      
      icon={<RiLogoutCircleLine  className='text-xl  text-white'/>} 
      textStyle=''
      className='py-2'/>
      </Link> 
    </div>

    </div>
  )
}

export default Menu