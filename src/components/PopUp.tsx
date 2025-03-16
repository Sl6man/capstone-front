import React, { useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface PopUpProps {
    
    children: React.ReactNode;
    onClose?: () => void; 
  }

function PopUp(  {children,onClose }: PopUpProps) {


  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center py-28">
      <div className="bg-white w-[43%]  rounded-lg shadow-lg">
        
      
        <div className="w-full flex justify-end ">

          <button onClick={onClose}>
            <IoMdCloseCircleOutline className="text-black text-lg mt-2 mr-2" />
          </button>
        </div>
              


        {children} 
      </div>
    </div>
  );
}

export default PopUp;