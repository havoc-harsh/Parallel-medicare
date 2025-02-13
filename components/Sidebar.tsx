import Link from "next/link";
import React ,{useState} from "react";
import { 
  User, Home, Settings, Hospital, AlertTriangle, Ambulance, 
  Shield, Bed, Droplet, BrainCircuit, ChevronDown, ChevronUp,ChevronRight,ChevronLeft ,Clock, Pill, AlertCircle, HeartPulse, ClipboardList, Star, Stethoscope
} from "lucide-react";
import Navbar from "@/components/Navbar";

const Sidebar = ({ isCollapsed, toggleSidebar }: { isCollapsed: boolean; toggleSidebar: () => void }) => {
    const [isServicesOpen, setIsServicesOpen] = useState(true);
  
    return (
      <div className={`bg-gray-100 border-r border-gray-300 h-screen fixed left-0 top-0 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
        {/* Logo & Toggle Button */}
        <div className="p-4 border-b border-gray-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full" />
            {!isCollapsed && <span className="text-xl font-bold text-gray-900">medicare</span>}
          </div>
          <button onClick={toggleSidebar} className="text-gray-700">
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
  
        <nav className="p-4">
          <div className="space-y-2">
            <Link href={`/patient/profile`}>
            <button className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-400/20 rounded-lg transition ${isCollapsed ? "justify-center" : ""}`}>
              <User className="w-5 h-5 text-blue-600" />
              {!isCollapsed && <span>Profile</span>}
            </button>
            </Link>
  
            <Link href={`/patient/dashboard`}>
              <button className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-400/20 rounded-lg transition ${isCollapsed ? "justify-center" : ""}`}>
                <Home className="w-5 h-5 text-blue-600" />
                {!isCollapsed && <span>Home</span>}
              </button>
            </Link>
  
            <button className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-400/20 rounded-lg transition ${isCollapsed ? "justify-center" : ""}`}>
              <Settings className="w-5 h-5 text-blue-600" />
              {!isCollapsed && <span>Settings</span>}
            </button>
  
            <button className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-400/20 rounded-lg transition ${isCollapsed ? "justify-center" : ""}`}>
              <Hospital className="w-5 h-5 text-blue-600" />
              {!isCollapsed && <span>Hospitals</span>}
            </button>
  
            {/* Services Section */}
            <div className="border-t border-gray-300 mt-3 pt-3">
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)} 
                className={`w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-400/20 rounded-lg transition ${isCollapsed ? "justify-center" : ""}`}
              >
                <Shield className="w-5 h-5 text-blue-600" />
                {!isCollapsed && <span>Services</span>}
                {!isCollapsed && (isServicesOpen ? <ChevronUp className="ml-auto w-4 h-4" /> : <ChevronDown className="ml-auto w-4 h-4" />)}
              </button>
  
              {isServicesOpen && !isCollapsed && (
                <div className="space-y-1 pl-6">
                  {[
                    { icon: AlertTriangle, label: "Emergency" },
                    { icon: Ambulance, label: "Ambulances" },
                    { icon: Shield, label: "Oxygen" },
                    { icon: Bed, label: "Beds" },
                    { icon: Droplet, label: "Blood Bank" },
                    { icon: BrainCircuit, label: "AI Assistance" },
                  ].map(({ icon: Icon, label }, idx) => (
                    <Link key={idx} href={`/patient/${label.toLowerCase().replace(" ", "-")}`}>
                    <button className="w-full flex items-center gap-3 p-2 text-gray-700 hover:bg-blue-400/20 rounded-lg transition">
                      <Icon className="w-4 h-4 text-blue-600" />
                      {!isCollapsed && <span>{label}</span>}
                    </button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  };
  
export default Sidebar;