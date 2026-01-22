
import { Service, GalleryItem, Appointment } from './types';

export const WHATSAPP_NUMBER = "+526145115220";
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

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    beforeUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    afterUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    description: 'Transformación completa de estética frontal.'
  },
  {
    id: 'g2',
    beforeUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    afterUrl: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800',
    description: 'Rehabilitación mediante implantes y carillas.'
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
