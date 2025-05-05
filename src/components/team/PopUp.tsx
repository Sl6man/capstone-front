import React from "react";


interface PopUpProps {
    
    children: React.ReactNode;
   
  }

function PopUp(  {children }: PopUpProps) {


  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center py-36 z-50">
      <div className="bg-wihte w-[43%] h-full  ">
        
      
        

        <div className=" h-auto ">
        {children} </div>
      </div>
    </div>
  );
}

export default PopUp;