/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdGroups } from "react-icons/md";
import EditUser from "@/components/team/EditUser";
import CreateGroup from '@/components/team/CreateGroup';
import CreateUser from '@/components/team/CreateUser';

import  Cookies  from 'js-cookie';

import { DataTable } from './data-table';
import {columns} from './columns';
 




function Page() {
  const router = useRouter();
  const [isPopupVisibleAddMember, setIsPopupVisibleAddMember] = useState(false);
  const [isPopupVisibleCreateGroup, setIsPopupVisibleCreateGroup] = useState(false);
  const [isPopupVisibleEditUser, setIsPopupVisibleEditUser] = useState(false);


  const  [userID,setUserID]=useState(0)
 

  const [userInfoTable ,setUserInfoTable]=useState<{id:number ;name:string; email:string; group:string; role:string}[]>([])

  useEffect(()=>{
    if(!Cookies.get('token'))
      router.push('login')
    
    fetch("http://127.0.0.1:8000/users/usersInfoTable")
    .then((response)=> response.json())
    .then((data)=>setUserInfoTable(data))
    .catch((error)=> console.error('Erorr fetching users' ,error))


  
  },[])

/** 
  useEffect(()=>{
    fetch("http://localhost:8000/users/test", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + Cookies.get('token'),
        "Accept": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => setUserID1(data))
    .catch(err => console.error(err));
    
  },[])
*/

  const handelViewUser = (user_id: number) => { //write by Fahad
    setUserID(user_id);
    setTimeout(() => {
      setIsPopupVisibleEditUser(true);
    }, 0);
  };
  
  

  const handelDeleteUser=async(user_id : number) =>{
    
    
    const confirmed = window.confirm("Are you sure you want to delete this user?");
  if (!confirmed) return;

  try {
    const response = await fetch(`http://127.0.0.1:8000/users/delete/user/${user_id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
     
      },
    });

    if (response.ok) {
      window.location.reload();
      
     
    } else {
      const errorData = await response.json();
      alert("Error: " + JSON.stringify(errorData));
    }
  } catch (error) {
    console.error("Delete error:", error);
    alert("An unexpected error occurred.");
  }

  }



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
        <div className='flex-1 m-6 bg-white red-400   rounded-lg shadow border-1 "'>
      <div className='m-6 my-8'>
      <DataTable data={userInfoTable} columns={columns(handelViewUser,handelDeleteUser)} />
      {isPopupVisibleEditUser && <EditUser  onClose={() => setIsPopupVisibleEditUser(false)} userID={userID} />}
      </div>


        </div>

      
    </div>
  )
}

export default Page