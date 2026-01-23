
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: any = {
  nav_inicio: { es: 'INICIO', en: 'HOME' },
  nav_servicios: { es: 'SERVICIOS', en: 'SERVICES' },
  nav_resultados: { es: 'RESULTADOS', en: 'RESULTS' },
  nav_precios: { es: 'PRECIOS', en: 'PRICING' },
  nav_contacto: { es: 'CONTACTO', en: 'CONTACT' },
  nav_reservar: { es: 'RESERVAR', en: 'BOOK NOW' },
  hero_elite: { es: 'Élite', en: 'Elite' },
  hero_tag: { es: 'EXCLUSIVIDAD Y TECNOLOGÍA EN CHIHUAHUA', en: 'EXCLUSIVITY & TECHNOLOGY IN CHIHUAHUA' },
  hero_p: { es: 'Dentista en Chihuahua: Revolucionamos la estética dental con tecnología digital.', en: 'Dentist in Chihuahua: Revolutionizing dental aesthetics with digital technology.' },
  btn_whatsapp: { es: 'Agenda por WhatsApp Ahora', en: 'Book via WhatsApp Now' },
  btn_specialties: { es: 'Ver Especialidades', en: 'View Specialties' },
  philo_tag: { es: 'Nuestra Filosofía', en: 'Our Philosophy' },
  philo_title: { es: 'Hospitalidad y Ciencia en Armonía', en: 'Hospitality & Science in Harmony' },
  philo_p: { es: 'Entendemos que el lujo reside en la tranquilidad.', en: 'We understand that luxury lies in tranquility.' },
  pricing_tag: { es: 'Transparencia', en: 'Transparency' },
  pricing_title: { es: 'Inversión en su Imagen', en: 'Investment in your Image' },
  faq_tag: { es: 'Preguntas Frecuentes', en: 'FAQ' },
  faq_title: { es: 'Resolvemos tus Dudas', en: 'Solving your Doubts' },
  footer_disclaimer: { 
    es: 'Aviso Legal: Los resultados de los tratamientos pueden variar según cada paciente. La información en este sitio es meramente informativa y no sustituye el diagnóstico de un profesional colegiado.', 
    en: 'Legal Notice: Treatment results may vary by patient. The information on this site is for informational purposes only and does not substitute a professional diagnosis.' 
  },
  footer_dev_cta: { 
    es: '¿Te gustó esta página/app? ¡Pregunta por la tuya sin compromiso!', 
    en: 'Did you like this page/app? Ask for yours without any obligation!' 
  },
  footer_dev_btn: { 
    es: 'Cotizar mi App/Web', 
    en: 'Get my App/Web' 
  },
  // Admin Panel Translations
  admin_title: { es: 'Panel Maestro', en: 'Master Panel' },
  admin_mode: { es: 'Modo Admin', en: 'Admin Mode' },
  admin_view_site: { es: 'Ver Sitio', en: 'View Site' },
  admin_tab_citas: { es: 'Citas', en: 'Appointments' },
  admin_tab_servicios: { es: 'Servicios', en: 'Services' },
  admin_tab_galeria: { es: 'Galería', en: 'Gallery' },
  admin_tab_cms: { es: 'CMS', en: 'CMS' },
  admin_patient: { es: 'Paciente', en: 'Patient' },
  admin_date: { es: 'Fecha', en: 'Date' },
  admin_time: { es: 'Hora', en: 'Time' },
  admin_register: { es: 'Registrar en Agenda', en: 'Register in Schedule' },
  admin_save_changes: { es: 'Guardar Cambios en la Web', en: 'Save Changes to Web' },
  admin_hero_section: { es: 'Sección Hero', en: 'Hero Section' },
  admin_contact_section: { es: 'Sección Contacto', en: 'Contact Section' },
  admin_smiles_count: { es: 'Contador de Sonrisas', en: 'Smiles Counter' },
  admin_hero_title: { es: 'Título Principal Hero', en: 'Hero Main Title' },
  admin_hero_subtitle: { es: 'Descripción Hero', en: 'Hero Description' },
  admin_hero_cta: { es: 'Texto Botón', en: 'Button Text' },
  admin_contact_title: { es: 'Título de Contacto', en: 'Contact Title' },
  admin_contact_subtitle: { es: 'Subtítulo de Contacto', en: 'Contact Subtitle' },
  admin_clinic_name: { es: 'Consultorio Dr. Enrique Acosta — Chihuahua', en: 'Dr. Enrique Acosta Clinic — Chihuahua' },
  admin_edit_content: { es: 'Edición de Contenido', en: 'Content Editing' },
  admin_confirm_delete: { es: '¿Seguro que desea eliminar esta cita?', en: 'Are you sure you want to delete this appointment?' },
  admin_success: { es: '¡Plataforma actualizada!', en: 'Platform updated!' },
  // Days of the week
  day_mon: { es: 'Lunes', en: 'Monday' },
  day_tue: { es: 'Martes', en: 'Tuesday' },
  day_wed: { es: 'Miércoles', en: 'Wednesday' },
  day_thu: { es: 'Jueves', en: 'Thursday' },
  day_fri: { es: 'Viernes', en: 'Friday' },
  day_sat: { es: 'Sábado', en: 'Saturday' },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('acosta_lang');
    return (saved as Language) || 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('acosta_lang', lang);
  };

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
