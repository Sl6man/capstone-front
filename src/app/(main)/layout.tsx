import Menu from "@/components/Menu";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //<PopUp></PopUp> <EditUser></EditUser>
    <div className="h-screen flex overflow-hidden">
      {/* left */}
      <div className="w-[15%]  bg-main-background border-r-2 border-gray-50">
        <Menu></Menu>
      </div>

      {/* right */}
      <div className="w-[85%] bg-main-background flex flex-col h-screen ">
        {children}
      </div>
    </div>
  );
}
