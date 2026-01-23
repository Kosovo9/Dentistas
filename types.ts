
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

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  philosophyTitle: string;
  philosophyText: string;
  contactTitle: string;
  contactSubtitle: string;
  smilesCount: number;
}

export type Language = 'es' | 'en';

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}
