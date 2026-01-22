
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER, CLINIC_EMAIL } from '../constants';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Dr. Acosta, me gustaría agendar una cita de valoración en Chihuahua.")}`;
  const mailtoUrl = `mailto:${CLINIC_EMAIL}?subject=Consulta%20Dental%20-%20Dr.%20Acosta&body=Hola%20Dr.%20César%20Acosta,%0D%0A%0D%0AMe%20gustaría%20solicitar%20información%20sobre...`;

  const actions = [
    {
      id: 'email',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Enviar Correo',
      color: 'bg-navy-luxury',
      href: mailtoUrl
    },
    {
      id: 'whatsapp',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.455 1.083 3.44l-1.037 3.803 3.967-1.037a5.747 5.747 0 0 0 2.754.701c3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.39 8.161c-.146.411-.852.753-1.183.8-.331.047-.753.116-2.126-.457-1.745-.733-2.871-2.515-2.958-2.631-.087-.116-.713-.948-.713-1.815 0-.867.457-1.295.62-1.468.163-.174.354-.216.471-.216.116 0 .231 0 .331.006.107.006.246-.04.385.293.146.353.5.122.569.261s.116.273.058.388c-.058.116-.116.19-.174.261-.058.071-.122.146-.071.231.052.087.231.382.494.618.341.306.63.402.723.446.092.043.146.037.202-.023.058-.06.246-.286.312-.382.067-.097.133-.081.225-.047s.583.275.684.326c.101.051.168.076.19.116.022.04.022.231-.073.442z"/>
        </svg>
      ),
      label: 'WhatsApp Directo',
      color: 'bg-green-500',
      href: whatsappUrl
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col items-end gap-4 mb-2"
          >
            {actions.map((action, idx) => (
              <motion.a
                key={action.id}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex items-center gap-3"
              >
                <span className="bg-white text-navy-luxury px-4 py-2 rounded-sm shadow-xl text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100">
                  {action.label}
                </span>
                <div className={`${action.color} text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300`}>
                  {action.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-5 rounded-full shadow-[0_20px_50px_rgba(197,160,89,0.3)] transition-all duration-500 hover:scale-110 active:scale-95 ${isOpen ? 'bg-navy-luxury text-white rotate-45' : 'bg-gold-luxury text-navy-luxury'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppButton;
