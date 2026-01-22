
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  beforeUrl: string;
  afterUrl: string;
  description: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  date: string;
  time: string;
  service: string;
  status: 'pending' | 'confirmed' | 'completed';
}

export interface ClinicData {
  phone: string;
  address: string;
  email: string;
  hours: string;
  mapUrl: string;
}
