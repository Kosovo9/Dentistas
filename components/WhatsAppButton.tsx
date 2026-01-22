
import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';

const WhatsAppButton: React.FC = () => {
  const message = encodeURIComponent("Hola Dr. Acosta, me gustaría agendar una cita de valoración en Chihuahua.");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center"
    >
      <div className="bg-white text-navy-luxury px-4 py-2 rounded-full shadow-xl mr-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 font-medium text-sm">
        Agenda por WhatsApp
      </div>
      <div className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.455 1.083 3.44l-1.037 3.803 3.967-1.037a5.747 5.747 0 0 0 2.754.701c3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.39 8.161c-.146.411-.852.753-1.183.8-.331.047-.753.116-2.126-.457-1.745-.733-2.871-2.515-2.958-2.631-.087-.116-.713-.948-.713-1.815 0-.867.457-1.295.62-1.468.163-.174.354-.216.471-.216.116 0 .231 0 .331.006.107.006.246-.04.385.293.146.353.5.122.569.261s.116.273.058.388c-.058.116-.116.19-.174.261-.058.071-.122.146-.071.231.052.087.231.382.494.618.341.306.63.402.723.446.092.043.146.037.202-.023.058-.06.246-.286.312-.382.067-.097.133-.081.225-.047s.583.275.684.326c.101.051.168.076.19.116.022.04.022.231-.073.442z"/>
        </svg>
      </div>
    </a>
  );
};

export default WhatsAppButton;
