/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MdClose } from "react-icons/md";

interface EditScraperProps {
  scraperId: number | null;
  setIsOpenNow: (value: string | null) => void;
}

function EditScraper({ scraperId, setIsOpenNow }: EditScraperProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [isOpen, setIsOpen] = useState(false);
  const [scraper, setScraper] = useState<any>({
    title: "",
    started_date: "",
    end_date: "",
    status: true,
  });

  const [originalScraper, setOriginalScraper] = useState<any>(null); // 🟢 store original data
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsOpen(true);

    fetch(`${apiUrl}/scraper/${scraperId}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = {
          title: data.title,
          started_date: data.started_date?.slice(0, 16) || "",
          end_date: data.end_date?.slice(0, 16) || "",
          status: data.status,
        };
        setScraper(formattedData);
        setOriginalScraper(formattedData); // 🟢 save original
      })
      .catch((e) => console.error(e));
  }, [scraperId, apiUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setScraper((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusToggle = (checked: boolean) => {
    setScraper((prev: any) => ({
      ...prev,
      status: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/scraper/update/${scraperId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scraper),
      });

      if (!response.ok) {
        throw new Error("Failed to update scraper");
      }

      console.log("Scraper updated!");
      window.dispatchEvent(new Event("scraper-added"));
      setIsOpenNow(null);
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 compare function
  const hasChanges = () => {
    if (!originalScraper) return false;
    return (
      scraper.title !== originalScraper.title ||
      scraper.started_date !== originalScraper.started_date ||
      scraper.end_date !== originalScraper.end_date ||
      scraper.status !== originalScraper.status
    );
  };

  const handelDeleteScraper=async(scraper_id : number) =>{
    

  try {
    setIsOpen(null)
    const response = await fetch(`http://127.0.0.1:8000/scraper/delete/${scraper_id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
     
      },
    });

    if (response.ok) {
      window.location.reload();
      
     
    } else {
      const errorData = await response.json();
      alert("Error: " + JSON.stringify(errorData));
    }
  } catch (error) {
    console.error("Delete error:", error);
    alert("An unexpected error occurred.");
  }

  }


  return (
    <div
      className={`absolute top-0 right-1 h-screen w-auto py-3 mr-7 
        flex-col items-center
        transition-transform duration-300 ease-in-out
     ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      <div className="w-full h-full bg-white rounded-3xl shadow-lg flex flex-col ">
        <div className="flex justify-start w-full mt-4">
          <button onClick={() => setIsOpenNow(null)} className="">
            <MdClose className="text-lg ml-3" />
          </button>
        </div>

        <div className="flex justify-center items-center mt-4">
          <p className="font-medium text-3xl mt-2">Edit Scraper</p>
        </div>

        <div className="px-7">
          <div className="w-full h-[1px] mt-6 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-60" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6 px-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={scraper.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="started_date">Start Date</Label>
              <Input
                id="started_date"
                name="started_date"
                type="datetime-local"
                value={scraper.started_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                name="end_date"
                type="datetime-local"
                value={scraper.end_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <Label>Status</Label>
            <Switch
              checked={scraper.status}
              onCheckedChange={handleStatusToggle}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary-yellow mt-4"
            disabled={!hasChanges() || loading} // 🟢 disable if no change
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>

          
        </form>
        <div className="w-full px-6 mt-auto mb-6">
        <Button 
        className="w-full bg-red-600  "
        onClick={()=>handelDeleteScraper(scraperId)}
        >
          <p className=" text-lg text-white"> Delete</p>
        </Button>
        </div>
      </div>
    </div>
  );
}

export default EditScraper;
