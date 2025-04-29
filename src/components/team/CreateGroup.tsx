import PopUp from "./PopUp";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface CreateGroupProps{
    onClose: () => void;
}

function CreateGroup( {onClose}:CreateGroupProps){

    const [name,setName]=useState('')


const handleCreate= async ()=>{
    const group={
        name:name,
    }

    try{
        const response=await fetch("http://127.0.0.1:8000/users/groupCreate",{

            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(group)
        })
        const data = await response.json()

        if (response.status===201){
            window.location.reload();
            onClose()
        }else{
            alert("error: "+JSON.stringify(data));
        }

    }catch(error){
        console.error("error creating user ",error)
    }
}

return(


    <PopUp >
        <div className="flex flex-col items-start bg-white rounded-xl shadow-md">

            <div className="w-full flex justify-end ">
                  <button onClick={onClose}>
                    <IoMdCloseCircleOutline className="text-black text-lg mt-2 mr-2" />
                  </button>
            </div>



        <div className="my-6 ml-6"><h2 ><span className="text-xl font-semibold">Create Group</span></h2></div>


        <div className="w-full px-14 mt-9">
            <Label htmlFor="groupName">Group Name</Label>
            <Input id="groupName" type="text" placeholder="Group Name"
            value={name} onChange={(e)=>setName(e.target.value)}
            ></Input>
        </div>

        <div className="w-full px-14 my-10">
            <Button className="w-full mt-6" onClick={handleCreate}> Create</Button>

        </div>

       </div>
    </PopUp>
)

}


export default CreateGroup;