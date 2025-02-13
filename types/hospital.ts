// types/hospital.ts
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
  contact: string;
  ambulances: number;
  blood: number;
  oxygen: number;
  icu: number;
  latitude: number;
  longitude: number;
  specialities: string[];
  about?: string;
  nextAvailable?: string;
  verified?: boolean;
  amenities?: string[];
  doctors: Doctor[];
}

export interface BookingData {
  date: string;
  time: string;
  name: string;
  phone: string;
  reason: string;
}