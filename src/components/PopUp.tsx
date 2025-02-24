import React from "react";
interface PopUpProps {
    isVisible: boolean; 
    children: React.ReactNode;
    onClose?: () => void; 
  }

function PopUp(  { isVisible, children, onClose }: PopUpProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center py-28">
      <div className="bg-white w-[43%]  rounded-lg shadow-lg">
        {children} 
      </div>
    </div>
  );
}

export default PopUp;