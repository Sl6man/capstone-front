import  Menu  from "@/components/Menu";
import PopUp from "@/components/PopUp";
import EditUser from "@/components/EditUser";
import React from "react";

export default function MainLayout({

    children,
  } :Readonly<{
    children:React.ReactNode;
  }>){
    return(//<PopUp></PopUp> <EditUser></EditUser>
        <div className="h-screen flex overflow-hidden">
     
     
     
            {/* left */}
            <div className="w-[15%] bg-gray-100 border-r-2 borfer-gray-50">

              <Menu ></Menu>
            </div>

        

            { /* right */}
            <div className="w-[85%] bg-gray-100 flex flex-col h-screen ">

              {children}
            </div>
            
            


        </div>
           
    );

  }


