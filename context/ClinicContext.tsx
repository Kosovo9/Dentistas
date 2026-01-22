
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service, GalleryItem, Appointment } from '../types';
import { INITIAL_SERVICES, INITIAL_GALLERY, INITIAL_APPOINTMENTS } from '../constants';

interface ClinicContextType {
  services: Service[];
  gallery: GalleryItem[];
  appointments: Appointment[];
  updateServices: (services: Service[]) => void;
  updateGallery: (gallery: GalleryItem[]) => void;
  updateAppointments: (appointments: Appointment[]) => void;
  addAppointment: (app: Appointment) => void;
}

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

  useEffect(() => {
    localStorage.setItem('acosta_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('acosta_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('acosta_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const updateServices = (newServices: Service[]) => setServices(newServices);
  const updateGallery = (newGallery: GalleryItem[]) => setGallery(newGallery);
  const updateAppointments = (newAppointments: Appointment[]) => setAppointments(newAppointments);
  const addAppointment = (app: Appointment) => setAppointments(prev => [app, ...prev]);

  return (
    <ClinicContext.Provider value={{ 
      services, 
      gallery, 
      appointments, 
      updateServices, 
      updateGallery, 
      updateAppointments,
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
