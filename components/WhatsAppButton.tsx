
import React from 'react';
import { motion } from 'framer-motion';
import { WHATSAPP_NUMBER, CLINIC_EMAIL, TIKTOK_URL } from '../constants';

const WhatsAppButton: React.FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Dr. Acosta, me gustaría agendar una cita de valoración en Chihuahua.")}`;
  const mailtoUrl = `mailto:${CLINIC_EMAIL}?subject=Consulta%20Dental%20-%20Dr.%20Acosta&body=Hola%20Dr.%20César%20Acosta,%0D%0A%0D%0AMe%20gustaría%20solicitar%20información%20sobre...`;

  const socialActions = [
    {
      id: 'tiktok',
      href: TIKTOK_URL,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
        </svg>
      ),
      color: 'bg-black text-white',
      label: 'TIKTOK'
    },
    {
      id: 'email',
      href: mailtoUrl,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-navy-luxury text-white',
      label: 'EMAIL'
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex items-center gap-4">
      {/* Botones Secundarios: TikTok y Email */}
      <div className="flex items-center gap-3">
        {socialActions.map((action, idx) => (
          <motion.a
            key={action.id}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
            className={`group relative ${action.color} p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center`}
          >
            {action.icon}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-navy-luxury text-white text-[9px] font-bold px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity tracking-widest pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
              {action.label}
            </span>
          </motion.a>
        ))}
      </div>

      {/* Botón Principal: WhatsApp (Sustituye al +) */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="bg-gold-luxury text-navy-luxury p-5 rounded-full shadow-[0_20px_50px_rgba(197,160,89,0.5)] hover:scale-110 active:scale-95 transition-all duration-500 flex items-center justify-center relative group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.455 1.083 3.44l-1.037 3.803 3.967-1.037a5.747 5.747 0 0 0 2.754.701c3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.39 8.161c-.146.411-.852.753-1.183.8-.331.047-.753.116-2.126-.457-1.745-.733-2.871-2.515-2.958-2.631-.087-.116-.713-.948-.713-1.815 0-.867.457-1.295.62-1.468.163-.174.354-.216.471-.216.116 0 .231 0 .331.006.107.006.246-.04.385.293.146.353.5.122.569.261s.116.273.058.388c-.058.116-.116.19-.174.261-.058.071-.122.146-.071.231.052.087.231.382.494.618.341.306.63.402.723.446.092.043.146.037.202-.023.058-.06.246-.286.312-.382.067-.097.133-.081.225-.047s.583.275.684.326c.101.051.168.076.19.116.022.04.022.231-.073.442z"/>
        </svg>
        <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gold-luxury text-navy-luxury text-[10px] font-black px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity tracking-[0.2em] pointer-events-none whitespace-nowrap shadow-2xl">
          WHATSAPP
        </span>
        
        {/* Efecto de pulso para atención visual */}
        <span className="absolute inset-0 rounded-full bg-gold-luxury animate-ping opacity-20 pointer-events-none"></span>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
