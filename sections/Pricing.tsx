
import React from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { useCurrency } from '../context/CurrencyContext';
import { WHATSAPP_NUMBER } from '../constants';

const Pricing: React.FC = () => {
  const { services } = useClinic();
  const { formatPrice, currency } = useCurrency();

  const handleConsult = (serviceName?: string) => {
    const text = serviceName 
      ? `Hola Dr. Enrique Acosta, me interesa el servicio de "${serviceName}" que vi en su sitio web. Me gustaría conocer la disponibilidad de citas.`
      : "Hola Dr. Enrique Acosta, me interesa conocer más sobre los planes de financiamiento y la valoración inicial en su consultorio.";
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="precios" className="py-24 md:py-32 bg-[#0d172b]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20 space-y-4"
        >
          <span className="text-gold-luxury font-black tracking-[0.6em] text-[10px] uppercase block">Transparencia</span>
          <h2 className="text-4xl md:text-7xl text-white luxury-font tracking-tighter">Inversión en su <span className="italic font-light text-gold-luxury">Imagen</span></h2>
          <p className="text-white/30 font-black uppercase tracking-[0.3em] text-[8px]">Precios base en {currency} • Valoración previa requerida</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-navy-luxury border border-white/10 rounded-sm overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]"
        >
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-white">
                  <th className="p-10 uppercase tracking-[0.5em] text-[10px] font-black border-b border-white/5">Tratamiento de Élite</th>
                  <th className="p-10 uppercase tracking-[0.5em] text-[10px] font-black text-right border-b border-white/5">Inversión</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, idx) => (
                  <tr 
                    key={service.id} 
                    onClick={() => handleConsult(service.name)}
                    className={`${idx % 2 === 0 ? 'bg-transparent' : 'bg-white/5'} hover:bg-gold-luxury/10 transition-all group cursor-pointer active:bg-gold-luxury/20`}
                  >
                    <td className="p-10 border-b border-white/5">
                      <div className="flex items-center gap-6">
                        <div className="w-2 h-2 rounded-full bg-gold-luxury opacity-40 group-hover:opacity-100 transition-all group-hover:scale-125"></div>
                        <div>
                          <span className="block text-white font-bold text-xl tracking-tight group-hover:text-gold-luxury transition-colors uppercase">{service.name}</span>
                          <span className="text-[10px] text-white/30 font-black tracking-widest mt-2 block uppercase group-hover:text-white/50 transition-colors">{service.description}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-10 border-b border-white/5 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-gold-luxury font-black text-2xl tracking-tighter transition-all group-hover:scale-110 duration-500 drop-shadow-lg">
                          {formatPrice(service.price)}
                        </span>
                        <span className="text-[8px] uppercase font-black tracking-[0.3em] text-white/20 opacity-0 group-hover:opacity-100 transition-all mt-3">Click para agendar</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-white/5">
            {services.map((service) => (
              <div 
                key={service.id} 
                onClick={() => handleConsult(service.name)}
                className="p-8 space-y-4 active:bg-white/5 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <span className="text-white font-bold text-lg uppercase tracking-tight leading-tight">{service.name}</span>
                  <span className="text-gold-luxury font-black text-xl tracking-tighter">{formatPrice(service.price)}</span>
                </div>
                <p className="text-[10px] text-white/30 font-black tracking-widest uppercase leading-relaxed">
                  {service.description}
                </p>
                <div className="pt-2">
                   <span className="text-[8px] uppercase font-black tracking-[0.3em] text-gold-luxury/60">Tap para agendar protocolo</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-8 md:p-16 bg-white/5 text-center border-t border-white/5">
            <p className="text-white/50 font-light mb-8 md:mb-12 tracking-widest text-base md:text-lg max-w-2xl mx-auto italic leading-relaxed">
              "La excelencia dental es la mejor inversión para su futuro. Diseñamos planes de pago a la medida de sus expectativas."
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8">
              <button 
                onClick={() => handleConsult()}
                className="bg-gold-luxury text-navy-luxury px-8 md:px-14 py-5 md:py-6 rounded-sm font-black uppercase tracking-[0.4em] text-[10px] hover:bg-white transition-all shadow-[0_20px_40px_rgba(197,160,89,0.3)] active:scale-95"
              >
                Solicitar Financiamiento
              </button>
              <button 
                onClick={() => handleConsult("Valoración Inicial Digital")}
                className="border border-white/20 text-white px-8 md:px-14 py-5 md:py-6 rounded-sm font-black uppercase tracking-[0.4em] text-[10px] hover:bg-white hover:text-navy-luxury transition-all active:scale-95"
              >
                Cita Valoración {formatPrice(500)}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
