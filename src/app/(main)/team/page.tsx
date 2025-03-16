"use client"

import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdGroups } from "react-icons/md";
import CreateUser from "@/components/CreateUser";
import CreateGroup from '@/components/CreateGroup';
import  Cookies  from 'js-cookie';

function page() {
  const router = useRouter();
  const [isPopupVisibleAddMember, setIsPopupVisibleAddMember] = useState(false);
  const [isPopupVisibleCreateGroup, setIsPopupVisibleCreateGroup] = useState(false);


  useEffect(()=>{
    if(!Cookies.get('token'))
      router.push('login')
  })

  return (
    <div className='bg-gray-100 h-full flex flex-col '>
      {/* container */}
     
      
        {/* first line */}
        <div className='flex items-start '>
          <h2 className='text-sm text-gray-300 m-6'>Pages <span className='text-black'>/ Team</span> </h2>
        </div>

        {/* second line */}
        <div className='flex justify-between  mt-7'>

          <div className=' ml-10'><h2 className='text-3xl font-bold'>Team</h2></div>

          <div className=' flex justify-center '>
            



{isPopupVisibleCreateGroup && <CreateGroup  onClose={() => setIsPopupVisibleCreateGroup(false)} />}
            <button 
            className=' flex justify-between gap-2  bg-[#FFBF00] text-white  text-sm font-extralight p-2 rounded-lg hover:bg-yellow-500 transition mr-2'
            onClick={()=>setIsPopupVisibleCreateGroup(true)}>
              <MdGroups className='text-lg'
              />
               Create Group
            </button> 

            


{isPopupVisibleAddMember && <CreateUser  onClose={() => setIsPopupVisibleAddMember(false)} />}
            <button 
            className='flex justify-between gap-1  bg-[#FFBF00] text-white  text-sm font-extralight p-2 rounded-lg hover:bg-yellow-500 transition mr-2'
            onClick={()=> setIsPopupVisibleAddMember(true)}
            >
              <AiOutlineUsergroupAdd className='text-lg'/> Add Team Member
            </button>   

          </div>

        </div>


        {/* body */}
        <div className='flex-1 m-6 bg-white red-400   rounded-lg shadow border-1 "'>33</div>

      
    </div>
  )
}

export default page