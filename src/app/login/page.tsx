import React from 'react'
import Image from 'next/image'
import { FaSquareSnapchat } from "react-icons/fa6";
function page() {

  return (



    <div className='bg-gray-50 min-h-screen flex flex-col items-center py-6'>
        {/*container */}
        <div className='bg-gray-50 w-4/5 py-10 flex flex-col items-center '>
        {/* logo */}
        <div className='flex  justify-center mt-32'>
         <Image
          src='/Snapchat-logo-black-and-white-png.png'
          alt=''
          width={80}
          height={0}
         />
        </div>

        {/* login form */}
        <div className='bg-white w-6/12 m-4 flex flex-col items-center rounded-2xl shadow-lg'>

            <div className='mt-12 flex flex-col items-center p'>
            <h2 className="text-yellow-400 font-bold text-3xl">Welcome Back</h2>
            <h2 className='text-gray-400 font-bold mt-1'>Enter your email and password to sign in</h2>
                 </div>

            {/*-- input email  */}
            <div className='w-5/6 mt-8 '>
            <label htmlFor="username" 
            className="block text-sm font-mono text-left">Email</label>
             <input
                id="email"
                type="email"
                placeholder="Your email address"
                className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                </div>     

             {/*-- input password */}
             <div className='w-5/6 mt-8 '>
            <label htmlFor="password" 
            className="block text-sm font-mono text-left">Password</label>
             <input
                id="password"
                type="password"
                placeholder="Your password"
                className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                </div>  

             {/*-- Button login */}
             <div className='w-5/6 mt-8 mb-12'>
             <button 
             className="w-full bg-[#FFBF00] text-white font-bold py-3 rounded-xl hover:bg-yellow-500 transition">
                SIGN IN</button>

                </div>                 


        </div>
        
        </div>

        </div>
  )
}

export default page