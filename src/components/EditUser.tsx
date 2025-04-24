"use client"

import React, { useState } from 'react'
import { useEffect } from 'react'
import PopUp from './PopUp' 
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"





interface EditUserProps {
  userID:number
  onClose: () => void; // closing popup
  
}
function EditUser({onClose,userID}:EditUserProps) {

  const [errorMessage, setErrorMessage] = useState(''); //write by Fahad
    const [userInfo,setUserInfo]=useState({
      
        username: "",
        email: "",
        job_title: "",
        fname: "",
        lname: "",
        group_id:0,
        role_id:0
      
      })

  const [firstname,setFirstname]=useState('')
  const [lastname,setLastname]=useState('')
  const [email,setEmail]=useState('')
  const [username,setUsername]=useState('')

  const [jobtitle,setJobTitle]=useState('')
  const [group_id,setGroupid]=useState(0)
  const [role_id,setRoleid]=useState(0)
  


  const [roles,setRoles]=useState<{role_id:number; name:string}[]>([])
  const [groups,setGroups]=useState<{group_id:number; name:string}[]>([])




useEffect(() => {
  console.log("User ID is:", userID); // write by Fahad
  if (!userID) return; //write by Fahad
 
  fetch("http://127.0.0.1:8000/users/role")
  .then((response)=>response.json())
  .then((data)=>setRoles(data))
  .catch((error)=>console.error('Error fetching rolse',error))


  fetch("http://127.0.0.1:8000/users/groups")
  .then((response)=>response.json())
  .then((data)=>setGroups(data))
  .catch((error)=>console.error('error fetching groups',error))
 
  fetch(`http://127.0.0.1:8000/users/user/info/${userID}`)
  .then((response)=> response.json())
  .then((data)=> {
    setUserInfo(data)
    setFirstname(data.fname);
  setLastname(data.lname)
  setEmail(data.email)
  setUsername(data.username)
 
  setJobTitle(data.job_title)
  setGroupid(data.group_id)
  setRoleid(data.role_id)

  })
  .catch((error)=> console.error('Error fetching user info',error))



}, [userID]); //write by Fahad

useEffect(()=>{
    
console.log(userInfo)
  


},[userInfo])




const handleEdit = async () => {  //write by Fahad
  if (!firstname || !lastname || !email || !group_id || !role_id) {
    setErrorMessage("Please fill in all the required fields");
    return;
  }

  const updatedFields: { [key: string]: any } = {}

  if (firstname !== userInfo.fname) updatedFields.fname = firstname
  if (lastname !== userInfo.lname) updatedFields.lname = lastname
  if (email !== userInfo.email) updatedFields.email = email
  if (jobtitle !== userInfo.job_title) updatedFields.job_title = jobtitle
  if (group_id !== userInfo.group_id) updatedFields.group_id = Number(group_id)
  if (role_id !== userInfo.role_id) updatedFields.role_id = Number(role_id)

  // لو ما تغير شيء لا تسوي الطلب ,, تم التغيير من فهد
  if (Object.keys(updatedFields).length === 0) {
    setErrorMessage("No changes made");
    return;
  }
  

  console.log(updatedFields)

  try {
    const response = await fetch(`http://127.0.0.1:8000/users/edit/user/${userID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(updatedFields),
    })

    const data = await response.json()

    if (response.ok) {  //write by Fahad
      setErrorMessage("");
      alert("User updated successfully!");
      onClose();
    }
     else {
      setErrorMessage(data.detail || "Something went wrong");
    }
  } catch (error) {
    console.error("Error during update:", error)
    alert("Something went wrong")
  }
}




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
      <Input className='' type="text" id="Username" placeholder="Username" value={username}  readOnly/>
      </div>
  

    </div>
    
    {/* line 4 */}

    <div className='flex justify-center gap-6 mt-6 '>

      <div  className='w-1/2 ml-6  '>
      <Label htmlFor="Password">Password</Label>
      <Input className='' type="password" id="Password" placeholder="Password" value={12345678}  disabled/>
      </div>
      <div className='w-1/2  mr-6'>
      <Label htmlFor="jobtitle">Job Title</Label> 
      <Input className='' type="text" id="jobtitle" placeholder="Job Title" value={jobtitle ?? ""} onChange={(e)=>setJobTitle(e.target.value)}/> 
      </div>  {/*write By Fahad*/}

     
  

    </div>

   {/* line 5*/}

   <div className='flex justify-center gap-6 mt-6'>

<div  className='w-1/2 ml-6 '>
<Label htmlFor="Group">Groups</Label>
          <select
            id="Group"
            className="w-full p-2 border rounded"
            value={group_id} onChange={(e)=>setGroupid(Number(e.target.value))}
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
            value={role_id} onChange={(e)=>setRoleid(Number(e.target.value))}
          >
            <option value="">Select Role</option>
            {roles.map((role)=>(
              <option key={role.role_id} value={role.role_id}>{role.name}</option>
            ))}
          </select>
</div>


</div>


   </div>

    <div className="w-full h-6 text-red-500 text-center font-semibold mb-6">
      {errorMessage}
    </div>
  
   
   <div className="mt-28">
  <div className="flex justify-end">
    <Button className="mr-6 w-1/3" onClick={handleEdit}>
      Save
    </Button>
  
</div>

</div>






</div>
    </PopUp>
  )
}

export default EditUser