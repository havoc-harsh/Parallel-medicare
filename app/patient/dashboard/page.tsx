"use client";
import { useState } from "react";
import Link from "next/link";
import {
  SignOutButton,
  useUser,
  UserProfile,
} from "@clerk/nextjs";
import {
  User,
  Home,
  Settings,
  Hospital,
  AlertTriangle,
  Ambulance,
  Shield,
  Bed,
  Droplet,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  LogOut,
  Clock,
  Pill,
  AlertCircle,
  HeartPulse,
  ClipboardList,
  Star,
  Stethoscope,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  onProfileClick: () => void;
}

const Sidebar = ({ isCollapsed, toggleSidebar, onProfileClick }: SidebarProps) => {
  const [isServicesOpen, setIsServicesOpen] = useState(true);

  return (
    <div
      className={`bg-gray-100 border-r border-gray-300 h-screen fixed left-0 top-0 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo & Name */}
      <div className="p-4 border-b border-gray-300 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full" />
        {!isCollapsed && (
          <span className="text-xl font-bold text-gray-900">MediCare+</span>
        )}
      </div>

      <nav className="p-4">
        <div className="space-y-2">
          {/* Instead of linking to a separate route, clicking on the Profile button will open the modal */}
          <button
            onClick={onProfileClick}
            className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-400/20 rounded-lg transition ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <User className="w-5 h-5 text-blue-600" />
            {!isCollapsed && "Profile"}
          </button>

          <Link href={`/patient/dashboard`}>
            <button
              className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-400/20 rounded-lg transition ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <Home className="w-5 h-5 text-blue-600" />
              {!isCollapsed && "Home"}
            </button>
          </Link>

          <button
            className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-400/20 rounded-lg transition ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Settings className="w-5 h-5 text-blue-600" />
            {!isCollapsed && "Settings"}
          </button>

          <Link href={'/hospital'}
            className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-400/20 rounded-lg transition ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Hospital className="w-5 h-5 text-blue-600" />
            {!isCollapsed && "Hospitals"}
          </Link>

          {/* Services Section */}
          <div className="border-t border-gray-300 mt-3 pt-3">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-400/20 rounded-lg transition ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <Shield className="w-5 h-5 text-blue-600" />
              {!isCollapsed && "Services"}
              {!isCollapsed &&
                (isServicesOpen ? (
                  <ChevronUp className="ml-auto w-4 h-4" />
                ) : (
                  <ChevronDown className="ml-auto w-4 h-4" />
                ))}
            </button>

            {isServicesOpen && (
              <div className="space-y-1 pl-6">
                {[
                  { icon: AlertTriangle, label: "Emergency" },
                  { icon: Ambulance, label: "Ambulances" },
                  { icon: Shield, label: "Oxygen Cylinder" },
                  { icon: Bed, label: "Available Beds" },
                  { icon: Droplet, label: "Blood Bank" },
                  { icon: BrainCircuit, label: "AI Assistance" },
                ].map(({ icon: Icon, label }, idx) => (
                  <button
                    key={idx}
                    className={`w-full flex items-center gap-3 p-2 text-gray-700 hover:bg-blue-400/20 rounded-lg transition ${
                      isCollapsed ? "justify-center" : ""
                    }`}
                  >
                    <Icon className="w-4 h-4 text-blue-600" />
                    {!isCollapsed && label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-400/20 rounded-lg transition ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="w-5 h-5 text-red-600" />
          {!isCollapsed && <SignOutButton />}
        </div>
      </nav>
    </div>
  );
};

interface MedicalProfile {
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  vaccinations: string[];
  lastCheckup: string;
  favoriteDoctors: { name: string; specialty: string }[];
}

export default function PatientDashboard() {
  const [medicalProfile] = useState<MedicalProfile>({
    bloodType: "O+",
    allergies: ["Penicillin", "Pollen", "Shellfish"],
    medications: ["Metformin 500mg", "Lisinopril 10mg", "Aspirin 81mg"],
    conditions: ["Type 2 Diabetes", "Hypertension"],
    vaccinations: ["Flu Vaccine 2023", "COVID-19 Booster", "Tetanus"],
    lastCheckup: "March 15, 2024",
    favoriteDoctors: [

      { name: "Dr. Amar Sharma", specialty: "Cardiologist" },
      { name: "Dr. Birendra Singh", specialty: "Dermatologist" },
      { name: "Dr. Aastha Singla", specialty: "Endocrinologist" }
    ],
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const user = useUser();

  // Function to close the modal when clicking outside the modal content
  const handleModalClick = () => {
    setIsProfileModalOpen(false);
  };

  // Prevent modal content click from closing the modal
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2f7] to-[#d0d8e5] text-gray-900">
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
        onProfileClick={() => setIsProfileModalOpen(true)}
      />

      <main
        className={`transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        } pt-20 p-8`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-6 mb-8 ">
            
              <img className="w-[4rem] h-[4rem] text-blue-600 rounded-full" src={user.user?.imageUrl} />
            
            <div>

              <h1 className="text-3xl font-bold">
                Welcome, {user.user?.fullName}
              </h1>
              <p className="text-gray-600">Your Personal Health Dashboard</p>
            </div>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Next Appointment",
                value: "March 25, 2024",
                icon: Clock,
                hoverBg: "hover:bg-blue-100",
                borderColor: "border-blue-500",
              },
              {
                title: "Active Medications",
                value: medicalProfile.medications.length,
                icon: Pill,
                hoverBg: "hover:bg-cyan-100",
                borderColor: "border-cyan-500",
              },
              {
                title: "Allergies",
                value: medicalProfile.allergies.length,
                icon: AlertCircle,
                hoverBg: "hover:bg-teal-100",
                borderColor: "border-teal-500",
              },
              {
                title: "Medical Conditions",
                value: medicalProfile.conditions.length,
                icon: HeartPulse,
                hoverBg: "hover:bg-pink-100",
                borderColor: "border-pink-500",
              },
              {
                title: "Blood Type",
                value: medicalProfile.bloodType,
                icon: User,
                hoverBg: "hover:bg-indigo-100",
                borderColor: "border-indigo-500",
              },
              {
                title: "Last Checkup",
                value: medicalProfile.lastCheckup,
                icon: ClipboardList,
                hoverBg: "hover:bg-green-100",
                borderColor: "border-green-500",
              },
              {
                title: "Current Medications",
                value: medicalProfile.medications.length,
                icon: Pill,
                hoverBg: "hover:bg-yellow-100",
                borderColor: "border-yellow-500",
              },
              {
                title: "Vaccinations",
                value: medicalProfile.vaccinations.length,
                icon: ClipboardList,
                hoverBg: "hover:bg-orange-100",
                borderColor: "border-orange-500",
              },
            ].map(({ title, value, icon: Icon, hoverBg, borderColor }, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-xl shadow-lg border-2 transition-all duration-300 ${hoverBg} ${borderColor} hover:shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  <Icon className="w-6 h-6 text-gray-700" />
                  <div>
                    <p className="text-gray-700">{title}</p>
                    <p className="text-lg font-semibold">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Favorite Doctors Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-yellow-500 transition-all duration-300 hover:bg-yellow-100 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" /> Favorite Doctors
            </h2>
            <ul className="space-y-2">
              {medicalProfile.favoriteDoctors.map((doctor, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg"
                >
                  <Stethoscope className="w-5 h-5 text-gray-700" />
                  <div>
                    <p className="font-semibold">{doctor.name}</p>
                    <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Modal for User Profile */}
      {isProfileModalOpen && (
        <div
          className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 backdrop-blur-sm  z-50 py-8"
          onClick={handleModalClick}
        >
          <div
            className="bg-white rounded-lg  max-w-lg w-full shadow-xl py-8 flex justify-center items-center"
            onClick={handleModalContentClick}
          >
            <UserProfile 
            routing="hash"/>
          </div>
        </div>
      )}
    </div>
  );
}
