import  Menu  from "@/components/Menu";
import PopUp from "@/components/PopUp";
import CreateUser from "@/components/CreateUser";
import React from "react";

export default function MainLayout({

    children,
  } :Readonly<{
    children:React.ReactNode;
  }>){
    return(
        <div className="h-screen flex overflow-hidden">
     <PopUp>
      <CreateUser></CreateUser>
     </PopUp>
            {/* left */}
            <div className="w-[20%] bg-gray-100 border-r-2 borfer-gray-50">

              <Menu ></Menu>
            </div>

        

            { /* right */}
            <div className="w-[80%] bg-gray-100 flex flex-col h-screen ">

              {children}
            </div>
            
            


        </div>
           
    );

  }


