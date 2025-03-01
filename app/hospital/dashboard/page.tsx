"use client";

import { useState, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import {
  Home,
  Settings,
  ClipboardList,
  Bed,
  Droplet,
  Ambulance,
  HeartPulse,
  Stethoscope,
  Activity,
  Clock,
  CalendarClock,
  Bell,
} from "lucide-react";

// Define interfaces for state data
interface BedData {
  ICU: number;
  General: number;
  Emergency: number;
  Maternity: number;
  Pediatric: number;
}

interface BloodData {
  A_Positive: number;
  B_Positive: number;
  O_Positive: number;
  AB_Positive: number;
}

interface OxygenData {
  "Oxygen Cylinders": number;
  "Liquid Oxygen": number;
}

interface AmbulanceData {
  Total: number;
  "In Operation": number;
  "Under Maintenance": number;
}

// Reusable Modal Component
const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

// Enhanced Radial Progress Component
const RadialProgress = ({
  percent,
  label,
  color,
}: {
  percent: number;
  label: string;
  color: string;
}) => (
  <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm">
    <div className="relative w-16 h-16">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-100"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className={color}
          strokeWidth="10"
          strokeDasharray={`${percent * 2.83} 283`}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
      </svg>
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
        {percent}%
      </span>
    </div>
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-xs text-gray-400">Performance metric</p>
    </div>
  </div>
);

// Sidebar Component
const Sidebar = ({
  isCollapsed,
  toggleSidebar,
  bedData,
  setBedData,
  bloodData,
  setBloodData,
  oxygenData,
  setOxygenData,
  ambulanceData,
  setAmbulanceData,
}: {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  bedData: BedData;
  setBedData: Dispatch<SetStateAction<BedData>>;
  bloodData: BloodData;
  setBloodData: Dispatch<SetStateAction<BloodData>>;
  oxygenData: OxygenData;
  setOxygenData: Dispatch<SetStateAction<OxygenData>>;
  ambulanceData: AmbulanceData;
  setAmbulanceData: Dispatch<SetStateAction<AmbulanceData>>;
}) => {
  const [activeModal, setActiveModal] = useState<
    "beds" | "blood" | "oxygen" | "ambulance" | "settings" | null
  >(null);

  return (
    <div
      className={`bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 h-screen fixed left-0 top-0 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full" />
        {!isCollapsed && (
          <span className="text-xl font-bold text-gray-900">
            Hospital Admin
          </span>
        )}
      </div>

      <nav className="p-4">
        <div className="space-y-2">
          <Link href="/hospital/dashboard">
            <button
              className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100/50 rounded-xl transition ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <Home className="w-5 h-5 text-blue-600" />
              {!isCollapsed && "Dashboard"}
            </button>
          </Link>

          <button
            onClick={() => setActiveModal("settings")}
            className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100/50 rounded-xl transition ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Settings className="w-5 h-5 text-blue-600" />
            {!isCollapsed && "Settings"}
          </button>

          <div className="border-t border-gray-200 mt-3 pt-3 space-y-2">
            <button
              onClick={() => setActiveModal("beds")}
              className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100/50 rounded-xl transition ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <Bed className="w-5 h-5 text-blue-600" />
              {!isCollapsed && "Available Beds"}
            </button>

            <button
              onClick={() => setActiveModal("blood")}
              className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100/50 rounded-xl transition ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <Droplet className="w-5 h-5 text-blue-600" />
              {!isCollapsed && "Blood Bank"}
            </button>

            <button
              onClick={() => setActiveModal("oxygen")}
              className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100/50 rounded-xl transition ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <HeartPulse className="w-5 h-5 text-green-600" />
              {!isCollapsed && "Oxygen Supply"}
            </button>

            <button
              onClick={() => setActiveModal("ambulance")}
              className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100/50 rounded-xl transition ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <Ambulance className="w-5 h-5 text-purple-600" />
              {!isCollapsed && "Ambulance Details"}
            </button>
          </div>
        </div>
      </nav>

      {/* Modals */}
      {activeModal === "settings" && (
        <Modal onClose={() => setActiveModal(null)}>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" /> Hospital Settings
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Hospital Name</p>
              <input
                className="text-2xl font-bold text-blue-600 w-full bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
                defaultValue="City Hospital"
              />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Contact Number</p>
              <input
                className="text-2xl font-bold text-blue-600 w-full bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
                defaultValue="(555) 123-4567"
              />
            </div>
          </div>
        </Modal>
      )}

      {activeModal === "beds" && (
        <Modal onClose={() => setActiveModal(null)}>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bed className="w-5 h-5 text-blue-600" /> Bed Management
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(bedData).map(([type, count]) => (
              <div key={type} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">{type} Beds</p>
                <input
                  type="number"
                  value={count}
                  placeholder=".."
                  onChange={(e) =>
                    setBedData({
                      ...bedData,
                      [type]: parseInt(e.target.value) || 0,
                    })
                  }
                  className="text-2xl font-bold text-blue-600 w-full bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        </Modal>
      )}

      {activeModal === "blood" && (
        <Modal onClose={() => setActiveModal(null)}>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Droplet className="w-5 h-5 text-red-600" /> Blood Inventory
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(bloodData).map(([type, units]) => (
              <div key={type} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">
                  Type {type.replace("_", "+")}
                </p>
                <input
                  type="number"
                  value={units}
                  placeholder=".."
                  onChange={(e) =>
                    setBloodData({
                      ...bloodData,
                      [type]: parseInt(e.target.value) || 0,
                    })
                  }
                  className="text-2xl font-bold text-red-600 w-full bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-red-500"
                />
              </div>
            ))}
          </div>
        </Modal>
      )}

      {activeModal === "oxygen" && (
        <Modal onClose={() => setActiveModal(null)}>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-green-600" /> Oxygen Supply
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(oxygenData).map(([type, quantity]) => (
              <div key={type} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">{type}</p>
                <input
                  type="number"
                  value={quantity}
                  placeholder=".."
                  onChange={(e) =>
                    setOxygenData({
                      ...oxygenData,
                      [type]: parseInt(e.target.value) || 0,
                    })
                  }
                  className="text-2xl font-bold text-green-600 w-full bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-green-500"
                />
              </div>
            ))}
          </div>
        </Modal>
      )}

      {activeModal === "ambulance" && (
        <Modal onClose={() => setActiveModal(null)}>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Ambulance className="w-5 h-5 text-purple-600" /> Ambulance Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(ambulanceData).map(([detail, value]) => (
              <div key={detail} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">{detail}</p>
                <input
                  type="number"
                  value={value}
                  placeholder=".."

                  onChange={(e) =>
                    setAmbulanceData({
                      ...ambulanceData,
                      [detail]: parseInt(e.target.value) || 0,
                    })
                  }
                  className="text-2xl font-bold text-purple-600 w-full bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default function HospitalDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [bedData, setBedData] = useState<BedData>({
    ICU: 12,
    General: 45,
    Emergency: 8,
    Maternity: 15,
    Pediatric: 10,
  });
  const [bloodData, setBloodData] = useState<BloodData>({
    A_Positive: 25,
    B_Positive: 18,
    O_Positive: 32,
    AB_Positive: 9,
  });
  const [oxygenData, setOxygenData] = useState<OxygenData>({
    "Oxygen Cylinders": 20,
    "Liquid Oxygen": 15,
  });
  const [ambulanceData, setAmbulanceData] = useState<AmbulanceData>({
    Total: 5,
    "In Operation": 4,
    "Under Maintenance": 1,
  });

  const [doctors] = useState([
    { id: 1, name: "Dr. Emily Johnson", specialization: "Cardiology", shift: "08:00 - 16:00" },
    { id: 2, name: "Dr. Michael Chen", specialization: "Orthopedics", shift: "12:00 - 20:00" },
    { id: 3, name: "Dr. Sarah Williams", specialization: "Pediatrics", shift: "16:00 - 00:00" },
  ]);

  const [stats] = useState({
    satisfaction: 92,
    recoveryRate: 85,
    emergencyResponse: 76,
  });

  const [emergencyAlerts] = useState([
    { id: 1, type: "Code Blue", location: "ER Room 3", time: "2 mins ago" },
    { id: 2, type: "Equipment Alert", location: "MRI Machine #2", time: "15 mins ago" },
  ]);

  const [announcements] = useState([
    {
      id: 1,
      title: "New COVID-19 Protocols",
      message:
        "All staff must wear masks at all times and follow social distancing guidelines.",
      date: "Today",
    },
    {
      id: 2,
      title: "Upcoming Maintenance",
      message: "The MRI machine will be undergoing maintenance tomorrow.",
      date: "Tomorrow",
    },
  ]);

  const [appointments] = useState([
    { id: 1, patient: "Michael Brown", time: "09:30 AM", department: "Cardiology" },
    { id: 2, patient: "Emma Wilson", time: "02:15 PM", department: "Pediatrics" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
        bedData={bedData}
        setBedData={setBedData}
        bloodData={bloodData}
        setBloodData={setBloodData}
        oxygenData={oxygenData}
        setOxygenData={setOxygenData}
        ambulanceData={ambulanceData}
        setAmbulanceData={setAmbulanceData}
      />

      <main
        className={`transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        } pt-20 p-8`}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Hospital Command Center
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl shadow-sm border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Bed className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Available Beds</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {Object.values(bedData).reduce((a, b) => a + b, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-2xl shadow-sm border border-red-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Droplet className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Blood Units</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {Object.values(bloodData).reduce((a, b) => a + b, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl shadow-sm border border-green-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Doctors</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {doctors.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-2xl shadow-sm border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Ambulance className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ambulances</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {ambulanceData.Total}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-5">
                <Bell className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-semibold">Emergency Alerts</h2>
              </div>
              <div className="space-y-4">
                {emergencyAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 bg-red-50 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-red-700">
                        {alert.type}
                      </span>
                      <span className="text-xs text-red-500">
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-sm text-red-600">{alert.location}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-5">
                <CalendarClock className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
              </div>
              <div className="space-y-4">
                {appointments.map((appt) => (
                  <div key={appt.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{appt.patient}</span>
                      <span className="text-xs text-gray-500">
                        {appt.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{appt.department}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-5">
                <Bell className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold">Hospital Announcements</h2>
              </div>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-4 bg-gray-50 rounded-xl"
                  >
                    <h3 className="text-md font-bold text-gray-800">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {announcement.message}
                    </p>
                    <p className="text-xs text-gray-400">
                      {announcement.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-amber-600" />
                <h2 className="text-xl font-semibold">Performance Metrics</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RadialProgress
                  percent={stats.satisfaction}
                  label="Patient Satisfaction"
                  color="text-amber-500"
                />
                <RadialProgress
                  percent={stats.recoveryRate}
                  label="Recovery Rate"
                  color="text-green-500"
                />
                <RadialProgress
                  percent={stats.emergencyResponse}
                  label="Emergency Response"
                  color="text-red-500"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-5">
                <Stethoscope className="w-6 h-6 text-teal-600" />
                <h2 className="text-xl font-semibold">Medical Team</h2>
              </div>
              <div className="space-y-4">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-medium">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">
                      {doctor.specialization}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {doctor.shift}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}