
import { Service, GalleryItem, Appointment } from './types';

export const WHATSAPP_NUMBER = "5216143277218";
export const CLINIC_EMAIL = "eamodonto@gmail.com";
export const TIKTOK_URL = "https://www.tiktok.com/@enrique15388";
export const ADMIN_PATH = "/admin-acosta-secure";
export const CLINIC_LOCATION = "Chihuahua, Chihuahua, México";

export const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Diseño de Sonrisa Digital (DSD)',
    description: 'Planificación personalizada de tu sonrisa utilizando tecnología de vanguardia para resultados predecibles y naturales.',
    price: 15000,
    featured: true
  },
  {
    id: '2',
    name: 'Implantes Dentales Premium',
    description: 'Restauración permanente de piezas perdidas con materiales biocompatibles de la más alta calidad.',
    price: 18000,
    featured: true
  },
  {
    id: '3',
    name: 'Ortodoncia Invisible',
    description: 'Alineación dental discreta y cómoda sin la necesidad de brackets metálicos tradicionales.',
    price: 35000,
    featured: true
  }
];

// Added missing category properties to satisfy GalleryItem interface
// Expanded to satisfy P0 requirement: Individual 3–4, Couple 2, Family 2
export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    beforeUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    afterUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    description: 'Transformación completa de estética frontal.',
    category: 'Individual'
  },
  {
    id: 'g2',
    beforeUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    afterUrl: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800',
    description: 'Rehabilitación mediante implantes y carillas.',
    category: 'Pareja'
  },
  {
    id: 'g3',
    beforeUrl: 'https://images.unsplash.com/photo-1590108323831-2c24f5c58ad0?auto=format&fit=crop&q=80&w=800',
    afterUrl: 'https://images.unsplash.com/photo-1597764650030-90ca1e47b71c?auto=format&fit=crop&q=80&w=800',
    description: 'Alineación dental con ortodoncia invisible.',
    category: 'Individual'
  },
  {
    id: 'g4',
    beforeUrl: 'https://images.unsplash.com/photo-1621421248439-e30275bebb20?auto=format&fit=crop&q=80&w=800',
    afterUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800',
    description: 'Blanqueamiento y estética gingival.',
    category: 'Individual'
  },
  {
    id: 'g5',
    beforeUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800',
    afterUrl: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800',
    description: 'Restauración estética para pareja.',
    category: 'Pareja'
  },
  {
    id: 'g6',
    beforeUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    afterUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    description: 'Tratamiento integral de sonrisa familiar.',
    category: 'Familia'
  },
  {
    id: 'g7',
    beforeUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    afterUrl: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800',
    description: 'Prevención y estética para toda la familia.',
    category: 'Familia'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    patientName: 'Juan Pérez',
    patientPhone: '6141234567',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    service: 'Diseño de Sonrisa',
    status: 'confirmed'
  },
  {
    id: 'a2',
    patientName: 'María García',
    patientPhone: '6149876543',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '12:30',
    service: 'Limpieza Premium',
    status: 'pending'
  }
];
