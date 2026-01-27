
import React, { useEffect } from 'react';
import { CLINIC_LOCATION, WHATSAPP_NUMBER } from '../constants';

interface SEOProps {
  title?: string;
  description?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title = "Dr. Enrique Acosta | Diseño de Sonrisa y Odontología de Élite en Chihuahua",
  description = "Especialista en Diseño de Sonrisa Digital, Implantes Dentales y Ortodoncia Invisible en Chihuahua. Tecnología de vanguardia y atención boutique para resultados estéticos superiores."
}) => {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // JSON-LD para LocalBusiness y Dentist
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      "name": "Dr. Enrique Acosta - Sonrisas de Élite",
      "image": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
      "@id": "https://drcesaracosta.com",
      "url": "https://drcesaracosta.com",
      "telephone": WHATSAPP_NUMBER,
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. San Felipe 123, Col. San Felipe",
        "addressLocality": "Chihuahua",
        "addressRegion": "CHIH",
        "postalCode": "31203",
        "addressCountry": "MX"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.6343,
        "longitude": -106.0691
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "14:00"
        }
      ],
      "sameAs": [
        "https://www.tiktok.com/@enrique15388",
        `https://wa.me/${WHATSAPP_NUMBER}`
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [title, description]);

  return null;
};

export default SEO;
