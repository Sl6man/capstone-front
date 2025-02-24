import React from 'react'
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdGroups } from "react-icons/md";
function page() {
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
            
            
            <button 
            className=' flex justify-between gap-2  bg-[#FFBF00] text-white  text-sm font-extralight p-2 rounded-lg hover:bg-yellow-500 transition mr-2'>
              <MdGroups className='text-lg'/> Create Group
            </button> 

            <button 
            className='flex justify-between gap-1  bg-[#FFBF00] text-white  text-sm font-extralight p-2 rounded-lg hover:bg-yellow-500 transition mr-2'>
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