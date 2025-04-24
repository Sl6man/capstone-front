"use client"

import React, { useState } from 'react'
import { useEffect } from 'react'
import PopUp from './PopUp' 
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


interface CreateUserProps {
  
  onClose: () => void; // closing popup
}
function CreateUser({onClose}:CreateUserProps) {

  const [firstname,setFirstname]=useState('')
  const [lastname,setLastname]=useState('')
  const [email,setEmail]=useState('')
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [jobtitle,setJobTitle]=useState('')
  const [group_id,setGroupid]=useState('')
  const [role_id,setRoleid]=useState('')
  


  const [roles,setRoles]=useState<{role_id:number; name:string}[]>([])
  const [groups,setGroups]=useState<{group_id:number; name:string}[]>([])
  const [errorMessage, setErrorMessage] = useState('');   //write by Fahad





useEffect(() => {
 
  fetch("http://127.0.0.1:8000/users/role")
  .then((response)=>response.json())
  .then((data)=>setRoles(data))
  .catch((error)=>console.error('Error fetching rolse',error))


  fetch("http://127.0.0.1:8000/users/groups")
  .then((response)=>response.json())
  .then((data)=>setGroups(data))
  .catch((error)=>console.error('error fetching groups',error))
 
},[]);




const handleAdd = async () => {  //غيرت اشياء كثير داخل الفنكشن فهد
  if (!firstname || !lastname || !email || !username || !password || !group_id || !role_id) {
    setErrorMessage("Please fill in all the fields");
    return;
  }

  const user = {
    username,
    email,
    jobtitle,
    fname: firstname,
    lname: lastname,
    password,
    group_id: Number(group_id),
    role_id: Number(role_id)
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/users/create/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.status === 201) {
      alert('Created!!');
      setErrorMessage(""); 
      onClose();
    } else {
      setErrorMessage(data.detail || "Something went wrong");
    }

  } catch (error) {
    console.error('❌ Real error:', error);
    setErrorMessage("An error occurred while creating user"); 
  }
};





  return (
    <PopUp  onClose={onClose}>
   <div className='h-full'>
   <div className='flex-col items-center my-6'>
   
  {/* line 1 */}
    <div className='flex ml-6 '><h2><span className='text-xl font-semibold align-text-top'>Create User</span></h2></div>

    {/* line 2 */}

    <div className='flex justify-center gap-6 mt-16'>

      <div  className='w-1/2 ml-6 '>
      <Label htmlFor="fname">First Name</Label>
      <Input  className='' type="text" id="fname" placeholder="First Name" value={firstname} onChange={(e)=>setFirstname(e.target.value)} />
      </div>
      <div className='w-1/2  mr-6'>
      <Label htmlFor="lname">Last Name</Label>
      <Input className='' type="text" id="lname" placeholder="Last Name" value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
      </div>
  

    </div>

    {/* line 3 */}

    <div className='flex justify-center gap-6 mt-6'>

      <div  className='w-1/2 ml-6 '>
      <Label htmlFor="Email">Email</Label>
      <Input className='' type="email" id="Email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div className='w-1/2  mr-6'>
      <Label htmlFor="Username">Username</Label>
      <Input className='' type="text" id="Username" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
      </div>
  

    </div>
    
    {/* line 4 */}

    <div className='flex justify-center gap-6 mt-6 '>

      <div  className='w-1/2 ml-6  '>
      <Label htmlFor="Password">Password</Label>
      <Input className='' type="password" id="Password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </div>
      <div className='w-1/2  mr-6'>
      <Label htmlFor="jobtitle">Job Title</Label>
      <Input className='' type="text" id="jobtitle" placeholder="Job Title" value={jobtitle} onChange={(e)=>setJobTitle(e.target.value)}/>
      </div>

     
  

    </div>

   {/* line 5*/}

   <div className='flex justify-center gap-6 mt-6'>

<div  className='w-1/2 ml-6 '>
<Label htmlFor="Group">Groups</Label>
          <select
            id="Group"
            className="w-full p-2 border rounded"
            value={group_id} onChange={(e)=>setGroupid(e.target.value)}
          >
            <option >Select Group</option>
            {groups.map((group)=>(
              <option key={group.group_id} value={group.group_id}>{group.name}</option>
            ))}


          </select>

</div>




<div className='w-1/2  mr-6'>
<Label htmlFor="Role">Role</Label>
          <select
            id="Role"
            className="w-full p-2 border rounded"
            value={role_id} onChange={(e)=>setRoleid(e.target.value)}
          >
            <option value="">Select Role</option>
            {roles.map((role)=>(
              <option key={role.role_id} value={role.role_id}>{role.name}</option>
            ))}
          </select>
</div>


</div>


   </div>
   {/*write by Fahad*/}
  <div className="w-full h-6 text-red-500 text-center font-semibold "> 
    {errorMessage}
  </div>


<div className='flex justify-end  '><Button className='mt-28 mr-6 w-1/3' onClick={handleAdd}>Add</Button> </div>


   </div>
   
    </PopUp>
  )
}

export default CreateUser