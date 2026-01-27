
import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: any = {
  // Navigation
  nav_inicio: { es: 'INICIO', en: 'HOME' },
  nav_servicios: { es: 'SERVICIOS', en: 'SERVICES' },
  nav_resultados: { es: 'RESULTADOS', en: 'RESULTS' },
  nav_precios: { es: 'PRECIOS', en: 'PRICING' },
  nav_contacto: { es: 'CONTACTO', en: 'CONTACT' },
  nav_reservar: { es: 'RESERVAR CITA', en: 'BOOK APPOINTMENT' },

  // Hero Section
  hero_tag: { es: 'EXCLUSIVIDAD Y TECNOLOGÍA EN CHIHUAHUA', en: 'EXCLUSIVITY & TECHNOLOGY IN CHIHUAHUA' },
  hero_urgency: { es: 'ENTREGA HOY MISMO — PAGO AL RECIBIR', en: 'SAME DAY DELIVERY — PAY UPON RECEIPT' },
  hero_cta: { es: 'AGENDA POR WHATSAPP AHORA', en: 'BOOK VIA WHATSAPP NOW' },

  // Elite Features (New 10)
  feat_title: { es: 'Ingeniería de Élite', en: 'Elite Engineering' },
  feat_1_title: { es: 'Velocidad React/Vite', en: 'React/Vite Performance' },
  feat_1_desc: { es: 'Carga instantánea (100/100 Google Speed) para evitar rebotes.', en: 'Instant load speeds (100/100 Google Speed) to eliminate bounce rates.' },
  feat_2_title: { es: 'Hospitality-UX', en: 'Hospitality-UX Design' },
  feat_2_desc: { es: 'Diseño psicológico que reduce la ansiedad y genera confianza.', en: 'Psychological layout designed to reduce anxiety and build trust.' },
  feat_3_title: { es: 'Panel Maestro Privado', en: 'Private Command Center' },
  feat_3_desc: { es: 'Gestión total de citas y contenidos sin depender de terceros.', en: 'Full control over appointments and content, no 3rd party needed.' },
  feat_4_title: { es: 'SEO Quirúrgico', en: 'Surgical SEO' },
  feat_4_desc: { es: 'Estructura JSON-LD nativa para dominar Google Maps.', en: 'Native JSON-LD injection for Google Maps local dominance.' },
  feat_5_title: { es: 'Smart-WhatsApp Sync', en: 'Smart-WhatsApp Sync' },
  feat_5_desc: { es: 'Leads con contexto exacto del tratamiento de interés.', en: 'Leads arrive with exact context of the desired treatment.' },
  feat_6_title: { es: 'Seguridad AES-256', en: 'AES-256 Security' },
  feat_6_desc: { es: 'Encriptación grado bancario para tus datos clínicos.', en: 'Bank-grade encryption for your clinical data.' },
  feat_7_title: { es: 'Omnicanalidad Total', en: 'Universal Device Support' },
  feat_7_desc: { es: 'Visualización perfecta en móviles, tablets y pantallas 4K.', en: 'Flawless display on mobile, tablets, and 4K screens.' },
  feat_8_title: { es: 'Galería HD Morphing', en: 'HD Morphing Gallery' },
  feat_8_desc: { es: 'Sistemas de Antes/Después optimizados para alto impacto.', en: 'High-impact Before/After systems for maximum visual conversion.' },
  feat_9_title: { es: 'Escalabilidad Infinita', en: 'Infinite Scalability' },
  feat_9_desc: { es: 'Arquitectura lista para pagos y portales de paciente.', en: 'Future-proof architecture for payments and patient portals.' },
  feat_10_title: { es: 'Cero Plantillas', en: 'Zero Templates' },
  feat_10_desc: { es: 'Código escrito a mano para una exclusividad total.', en: 'Hand-written code for absolute brand exclusivity.' },

  // Developer CTAs
  footer_dev_cta: { 
    es: '¿Te gusta esta App 10x? Entrega hoy mismo (3 cupos) y paga al recibir. ¡Código puro a la medida!', 
    en: 'Love this 10x App? Same-day delivery (3 spots) & pay on delivery. Pure bespoke code!' 
  },
  footer_dev_btn: { es: 'Cotizar mi App de Élite', en: 'Get my Elite App' },

  // Admin
  admin_title: { es: 'Panel Maestro', en: 'Master Panel' },
  admin_mode: { es: 'Modo Admin', en: 'Admin Mode' },
  admin_save_changes: { es: 'Guardar en la Web', en: 'Save to Web' },
  admin_success: { es: '¡Plataforma actualizada!', en: 'Platform updated!' },
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

  const t = (key: string) => translations[key]?.[language] || key;

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
