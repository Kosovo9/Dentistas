
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
    beforeUrl: 'https://picsum.photos/seed/dental1/800/600',
    afterUrl: 'https://picsum.photos/seed/dental2/800/600',
    description: 'Transformación completa de estética frontal.'
  },
  {
    id: 'g2',
    beforeUrl: 'https://picsum.photos/seed/dental3/800/600',
    afterUrl: 'https://picsum.photos/seed/dental4/800/600',
    description: 'Rehabilitación mediante implantes y carillas.'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    patientName: 'Juan Pérez',
    date: '2024-05-20',
    time: '10:00',
    service: 'Limpieza Profunda',
    status: 'confirmed'
  }
];
