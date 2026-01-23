
import React from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { WHATSAPP_NUMBER } from '../constants';

const Pricing: React.FC = () => {
  const { services } = useClinic();

  const handleConsult = (serviceName?: string) => {
    const text = serviceName 
      ? `Hola Dr. Enrique Acosta, me interesa el servicio de "${serviceName}" que vi en su sitio web. Me gustaría conocer la disponibilidad de citas.`
      : "Hola Dr. Enrique Acosta, me interesa conocer más sobre los planes de financiamiento y la valoración inicial en su consultorio.";
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="precios" className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <span className="text-gold-luxury font-bold tracking-[0.6em] uppercase text-[10px] block">Transparencia</span>
          <h2 className="text-5xl md:text-6xl text-navy-luxury luxury-font">Inversión en su <span className="italic font-light">Imagen</span></h2>
          <p className="text-slate-400 font-light italic text-sm tracking-wide">Precios base en MXN. Seleccione un servicio para agendar valoración.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-100 rounded-sm overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy-luxury text-white">
                <th className="p-10 uppercase tracking-[0.4em] text-[10px] font-bold">Tratamiento Premium</th>
                <th className="p-10 uppercase tracking-[0.4em] text-[10px] font-bold text-right">Inversión</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, idx) => (
                <tr 
                  key={service.id} 
                  onClick={() => handleConsult(service.name)}
                  className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'} hover:bg-gold-luxury/5 transition-all group cursor-pointer active:bg-gold-luxury/10`}
                >
                  <td className="p-10 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-luxury/30 group-hover:bg-gold-luxury transition-colors"></div>
                      <span className="block text-navy-luxury font-bold text-xl tracking-tight group-hover:text-gold-luxury transition-colors">{service.name}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-light mt-1 block pl-6 opacity-60 group-hover:opacity-100 transition-opacity">{service.description}</span>
                  </td>
                  <td className="p-10 border-b border-slate-100 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-gold-luxury font-bold text-2xl tracking-tighter transition-transform group-hover:scale-110 duration-500">
                        ${service.price.toLocaleString('es-MX')} <span className="text-[10px] uppercase font-bold tracking-widest text-slate-300 ml-1">MXN</span>
                      </span>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-gold-luxury/40 opacity-0 group-hover:opacity-100 transition-opacity mt-2">Consultar Cita</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="p-16 bg-[#fcfcfc] text-center border-t border-slate-50">
            <p className="text-slate-500 font-light mb-10 tracking-wide text-lg max-w-2xl mx-auto italic">
              "La excelencia dental es una inversión para toda la vida. Contamos con planes de financiamiento diseñados para su comodidad."
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button 
                onClick={() => handleConsult()}
                className="inline-block bg-navy-luxury text-white px-14 py-6 rounded-sm font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-gold-luxury transition-all shadow-2xl active:scale-95"
              >
                Planes de Pago
              </button>
              <button 
                onClick={() => handleConsult("Valoración Inicial Digital")}
                className="inline-block border border-navy-luxury text-navy-luxury px-14 py-6 rounded-sm font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-navy-luxury hover:text-white transition-all active:scale-95"
              >
                Valoración Inicial $500
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;