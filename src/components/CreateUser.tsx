"use client"

import React, { useState } from 'react'
import { useEffect } from 'react'
import PopUp from './PopUp' 

interface CreateUserProps {
  
  onClose: () => void; // closing popup
}
function CreateUser({onClose}:CreateUserProps) {
const [n,setn]=useState(1)



useEffect(() => {
  alert("create user open");
  console.log("Value of n:", n);
}, [n]);
  return (
    <PopUp  onClose={onClose}>
   dfsfdsd44
   {n}
   <button onClick={()=>setn(n+1)}>nnnnnnnnnnn</button>
    </PopUp>
  )
}

export default CreateUser