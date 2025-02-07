export interface Doctor {
  name: string;
  specialty: string;
  experience: string;
}

export interface Hospital {
  id: number;
  name: string;
  location: string;
  consultationFee: string;
  rating: string;
  experience?: string;
  waitTime: string;
  
  latitude: number;
  longitude: number;
  specialities: string[];
  about?: string;
  nextAvailable?: string;
  verified?: boolean;
  amenities?: string[];
  doctors: Doctor[]; // Updated to use the Doctor interface
}
export interface BookingData {
  date: string;
  time: string;
  name: string;
  phone: string;
  reason: string;
}