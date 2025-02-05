"use client";

import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hospital } from "@/types/hospital";

interface MapViewProps {
  hospitals: Hospital[];
}

export default function MapView({ hospitals }: MapViewProps) {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  return (
    <div className="relative h-[calc(100vh-120px)] bg-white rounded-xl shadow-lg border border-sky-100">
      {/* Map placeholder */}
      <div className="absolute inset-0 bg-gray-100">
        <div className="h-full w-full relative">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${30 + hospital.id * 20}%`,
                left: `${30 + hospital.id * 20}%`,
              }}
              onClick={() => setSelectedHospital(hospital)}
            >
              <div className="relative group">
                <MapPin
                  size={32}
                  className="text-sky-600 hover:text-sky-700 transition-colors duration-300"
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Card className="w-48">
                    <CardContent className="p-2">
                      <p className="font-semibold">{hospital.name}</p>
                      <p className="text-sm text-gray-500">{hospital.location}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search overlay */}
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

      {/* Selected hospital details */}
      {selectedHospital && (
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/95 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
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
                    className="bg-sky-600 hover:bg-sky-700"
                    onClick={() => {
                      /* Handle booking */
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}