"use client";

import { RefObject, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AddLocations from "./AddLocations";
import { Location } from "@/types/scraprs";

export default function ScraperForm({
  mapRef,
  setIsOpenNow,
}: {
  mapRef: RefObject<mapboxgl.Map>;
  setIsOpenNow: (value: string | null) => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    status: true,
    started_date: "",
    end_date: "",
  });
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.started_date.trim() !== "" &&
      formData.end_date.trim() !== "" &&
      locations.length > 0
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setLoading(true);
    try {
      // 1️⃣ Create scraper
      const scraperResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/scraper/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!scraperResponse.ok) {
        throw new Error("Failed to create scraper");
      }

      const scraperData = await scraperResponse.json();
      const scraperId = scraperData.scraper_id;

      console.log("Created scraper:", scraperData);

      // 2️⃣ Create locations
      for (const location of locations) {
        const locationPayload = {
          neighborhood_name: location.neighborhood_name,
          radius: location.radius,
          lat: location.lat,
          long: location.long,
          scraper_id: scraperId,
        };

        const locationResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/scraper/create/location`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(locationPayload),
          }
        );

        if (!locationResponse.ok) {
          throw new Error(
            `Failed to create location: ${location.neighborhood_name}`
          );
        }

        const locationData = await locationResponse.json();
        console.log("Created location:", locationData);
        window.dispatchEvent(new Event("scraper-added"));
      }

      // 3️⃣ Success
      setIsOpenNow(null);
    } catch (error) {
      console.error("Error submitting scraper:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4 px-4 ">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
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
            value={formData.started_date}
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
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <AddLocations
        locations={locations}
        setLocations={setLocations}
        mapRef={mapRef}
      />

      <Button
        type="submit"
        className="w-full bg-primary-yellow"
        disabled={!isFormValid() || loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
