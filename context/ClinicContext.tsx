
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service, GalleryItem, Appointment, SiteContent } from '../types';
import { INITIAL_SERVICES, INITIAL_GALLERY, INITIAL_APPOINTMENTS } from '../constants';

interface ClinicContextType {
  services: Service[];
  gallery: GalleryItem[];
  appointments: Appointment[];
  siteContent: SiteContent;
  updateServices: (services: Service[]) => void;
  updateGallery: (gallery: GalleryItem[]) => void;
  updateAppointments: (appointments: Appointment[]) => void;
  updateSiteContent: (content: SiteContent) => void;
  addAppointment: (app: Appointment) => void;
}

const DEFAULT_CONTENT: SiteContent = {
  heroTitle: "Tu Sonrisa de Élite es Nuestra Obra Maestra",
  heroSubtitle: "Revolucionamos la estética dental con tecnología digital y un enfoque de hospitalidad boutique único en México.",
  heroCta: "Agenda tu Cita por WhatsApp Ahora",
  philosophyTitle: "Hospitalidad y Ciencia en Armonía",
  philosophyText: "Entendemos que el lujo reside en la tranquilidad. Hemos diseñado cada aspecto de su visita para eliminar la fricción dental.",
  contactTitle: "El Comienzo de su Nueva Imagen",
  contactSubtitle: "Ubicados en el epicentro médico de Chihuahua, nuestro consultorio es un santuario de tecnología y diseño.",
  smilesCount: 1540
};

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('acosta_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('acosta_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('acosta_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('acosta_content');
    return saved ? JSON.parse(saved) : DEFAULT_CONTENT;
  });

  useEffect(() => {
    localStorage.setItem('acosta_services', JSON.stringify(services));
    localStorage.setItem('acosta_gallery', JSON.stringify(gallery));
    localStorage.setItem('acosta_appointments', JSON.stringify(appointments));
    localStorage.setItem('acosta_content', JSON.stringify(siteContent));
  }, [services, gallery, appointments, siteContent]);

  const updateServices = (newServices: Service[]) => setServices(newServices);
  const updateGallery = (newGallery: GalleryItem[]) => setGallery(newGallery);
  const updateAppointments = (newAppointments: Appointment[]) => setAppointments(newAppointments);
  const updateSiteContent = (newContent: SiteContent) => setSiteContent(newContent);
  const addAppointment = (app: Appointment) => setAppointments(prev => [app, ...prev]);

  return (
    <ClinicContext.Provider value={{ 
      services, 
      gallery, 
      appointments, 
      siteContent,
      updateServices, 
      updateGallery, 
      updateAppointments,
      updateSiteContent,
      addAppointment
    }}>
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) throw new Error('useClinic must be used within a ClinicProvider');
  return context;
};
