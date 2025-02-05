"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HospitalCard from "@/components/hospital-card";
import MapView from "@/components/map-view";
import { Input } from "@/components/ui/input";
import AuthNavbar from "@/components/AuthNavbar";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin, List } from "lucide-react";
import { hospitals } from "@/data/hospital";

export default function HospitalPage() {
  const [mapMode, setMapMode] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <AuthNavbar />

      {/* Added pt-24 to ensure content starts below the Navbar */}
      <div className="max-w-7xl mx-auto p-4 pt-24">
        {/* Animated Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mb-8"
        >
          <div className="flex justify-between items-center">
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              Find Premium Healthcare
            </motion.h1>
            
            <Button
              onClick={() => setMapMode(!mapMode)}
              className="flex items-center gap-2 border-sky-500 text-sky-600 hover:bg-sky-50"
            >
              {mapMode ? <List size={20} /> : <MapPin size={20} />}
              {mapMode ? "List View" : "Map View"}
            </Button>
          </div>

          {/* Search Bar with Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" />
              <Input
                placeholder="Search hospitals..."
                className="pl-10 h-12 rounded-xl border-sky-100 focus:border-sky-500"
              />
            </div>
          </motion.div>
        </motion.header>

        {/* Animated Content Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mapMode ? 'map' : 'list'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {mapMode ? (
              <MapView hospitals={hospitals} />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {hospitals.map((hospital) => (
                  <HospitalCard key={hospital.id} hospital={hospital} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}