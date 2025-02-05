import { Hospital } from "@/types/hospital";

export const hospitals: Hospital[] = [
  {
    id: 1,
    name: "Manipal Hospital",
    location: "Whitefield, Bangalore",
    consultationFee: "₹900",
    rating: "100%",
    experience: "15 years",
    waitTime: "10 mins",
    specialities: ["Cardiology", "Neurology"],
    nextAvailable: "Today",
    verified: true,
    about: "Award-winning multi-specialty hospital with state-of-the-art facilities...",
    amenities: ["Free WiFi", "Parking", "Cafeteria", "Pharmacy"],
    doctors: [
      { name: "Dr. Anjali Rao", specialty: "Cardiologist", experience: "12 years" },
      { name: "Dr. Ravi Verma", specialty: "Neurologist", experience: "15 years" }
    ]
  },
  {
    id: 2,
    name: "Medicare Hospital",
    location: "Sec 12, Chandigarh",
    consultationFee: "₹900",
    rating: "100%",
    experience: "15 years",
    waitTime: "10 mins",
    specialities: ["Cardiology", "Neurology"],
    nextAvailable: "Today",
    verified: true,
    about: "Award-winning multi-specialty hospital with state-of-the-art facilities...",
    amenities: ["Free WiFi", "Parking", "Cafeteria", "Pharmacy"],
    doctors: [
      { name: "Dr. Anjali Rao", specialty: "Cardiologist", experience: "12 years" },
      { name: "Dr. Ravi Verma", specialty: "Neurologist", experience: "15 years" }
    ]
  }
];