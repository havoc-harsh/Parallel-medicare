// components/map-view.tsx
"use client";
import "@/lib/fixLeafletIcons";
import "leaflet/dist/leaflet.css";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { MapPin, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hospital } from "@/types/hospital";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useRouter } from "next/navigation";

import L from "leaflet";



interface MapViewProps {
  hospitals: Hospital[];
}

export default function MapView({ hospitals }: MapViewProps) {
  const router = useRouter();
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Memoize the mapKey so it remains constant during the component's lifecycle.
  const mapKey = useMemo(() => Date.now().toString(), []);

  // Reset the container's _leaflet_id if it exists to prevent double initialization.
  useEffect(() => {
    const container = L.DomUtil.get(`map-${mapKey}`);
    if (container && (container as any)._leaflet_id) {
       (container as any)._leaflet_id = null;
    }
  }, [mapKey]);

  useEffect(() => {
    const container = L.DomUtil.get("map-container");
    if (container) {
      container.innerHTML = ""; // Clears any previous Leaflet instances
    }
  }, []);

  return (
    <div className="relative h-[calc(100vh-120px)] bg-white rounded-xl shadow-lg border border-sky-100">
      <MapContainer
        key={mapKey} // Unique key for React reconciliation
        id={`map-${mapKey}`} // Unique ID for Leaflet container
        center={[30.7333, 76.7794]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        ref={(map) => {
          if (map && !mapRef.current) {
            mapRef.current = map;
          }
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hospitals.map((hospital) => (
          <Marker
            key={hospital.id}
            position={[hospital.latitude, hospital.longitude]}
            eventHandlers={{
              click: () => setSelectedHospital(hospital),
            }}
          >
            <Popup>
              <Card className="w-48">
                <CardContent className="p-2">
                  
                  <p className="font-semibold">{hospital.name}</p>
                  <p className="text-sm text-gray-500">{hospital.location}</p>
                </CardContent>
              </Card>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* --- Search overlay --- */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              placeholder="Search locations..."
              className="pl-10 border-sky-100 focus:border-sky-500"
            />
          </div>
        </div>
      </div>

      {/* --- Selected hospital details overlay --- */}
{selectedHospital && (
  <div className="absolute bottom-20 left-4 right-4 z-[1000]">  {/* Moved overlay slightly up */}
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white/95 backdrop-blur shadow-lg">
        <CardContent className="p-4 flex justify-between items-center"> {/* Centered content */}
          <div>
            <h3 className="text-lg font-semibold">
              {selectedHospital.name}
            </h3>
            <p className="text-gray-500 text-sm">
              {selectedHospital.location}
            </p>
            <div className="mt-2 flex gap-2">
              {selectedHospital.specialities.map((speciality) => (
                <span
                  key={speciality}
                  className="bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded-full"
                >
                  {speciality}
                </span>
              ))}
            </div>
          </div>

          
          <Button
            className="bg-sky-600 hover:bg-sky-700 self-center py-2"
            onClick={() => router.push(`/hospital/${selectedHospital.id}`)}
          >
            Book Now
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
)}
    </div>
  );
}