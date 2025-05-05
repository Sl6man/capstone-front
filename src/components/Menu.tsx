"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonProps from "./ButtonProps";
import { IoHome } from "react-icons/io5";
import { PiMapPinArea } from "react-icons/pi";
import { MdOutlineGroups } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function Menu() {
  const [selectedButton, setSelectedButton] = useState<string>("Dashboard");
  const router = useRouter();

  const handleLogout = () => {
    // Remove token from cookies
    Cookies.remove("token");

    //  Redirect to login page
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-start p-5 mt-3 ml-3 h-screen border-r-2  ">
      {/* logo */}
      <div className="flex items-center gap-3 ml-16 md:ml-6 justify-center md:justify-start ">
       
          <Image src="/Group.png" alt="" width={40} height={0} />
        

        <div className="mt-4 pt-1 ">
          <h2 className="">
            <span className="text-md text-gray-800 font-semibold">
              SnapScope
            </span>
          </h2>
        </div>
      </div>
      {/*---------- */}

      <div className="flex flex-col items-center w-full mt-5">
        <div className="w-full h-[1px] border-t border-t-gray-00 shadow-2xl"></div>
      </div>

    
      {/*end logo */}

      {/* HOME */}
      <div className="flex flex-col items-start w-full   ">
        <Link href="/dashboard" className="w-full">
          <ButtonProps
            text="Dashboard"
            variant="Primary"
            icon={
              <IoHome
                className={`${
                  selectedButton === "Dashboard"
                    ? "text-xl  text-white py-1"
                    : "text-xl  text-yellow-400 py-1"
                }`}
              />
            }
            className={`mt-4 ${
              selectedButton === "Dashboard" ? "bg-white" : ""
            }`}
            textStyle="text-gray-400 text-sm font-semibold"
            iconBG={`${
              selectedButton === "Dashboard"
                ? "rounded-lg shadow-md p-1 bg-yellow-400"
                : "rounded-lg shadow-md p-1 bg-white"
            }`}
            onClick={() => setSelectedButton("Dashboard")}
          />
        </Link>

        <Link href="/map" className="w-full">
          <ButtonProps
            text="Map"
            textStyle="text-gray-400 text-sm font-semibold"
            variant="Primary"
            icon={
              <PiMapPinArea
                className={`${
                  selectedButton === "Map"
                    ? "text-xl  text-white"
                    : "text-xl  text-yellow-400"
                }`}
              />
            }
            iconBG={`${
              selectedButton === "Map"
                ? "rounded-lg shadow-md p-1 bg-yellow-400"
                : "rounded-lg shadow-md p-1 bg-white"
            }`}
            className={`mt-2 ${selectedButton === "Map" ? "bg-white" : ""}`}
            onClick={() => setSelectedButton("Map")}
          />
        </Link>

        <Link href="/team" className="w-full">
          <ButtonProps
            text="Team"
            variant="Primary"
            icon={
              <MdOutlineGroups
                className={`${
                  selectedButton === "Team"
                    ? "text-xl  text-white"
                    : "text-xl  text-yellow-400"
                }`}
              />
            }
            textStyle="text-gray-400 text-sm font-semibold"
            iconBG={`${
              selectedButton === "Team"
                ? "rounded-lg shadow-md p-1 bg-yellow-400"
                : "rounded-lg shadow-md p-1 bg-white"
            }`}
            className={`mt-2 ${selectedButton === "Team" ? "bg-white" : ""}`}
            onClick={() => setSelectedButton("Team")}
          />
        </Link>
      </div>

      <div className="mt-auto w-full">
        <Link href="/login" className="w-full ">
          <ButtonProps
            text="Logout"
            className="text-white py-2"
            variant="Danger"
            onClick={handleLogout}
            icon={<RiLogoutCircleLine className="text-xl  text-white" />}
            textStyle=""
          />
        </Link>
      </div>
    </div>
  );
}

export default Menu;
