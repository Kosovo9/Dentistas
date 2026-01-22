
import React from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { WHATSAPP_NUMBER } from '../constants';

const Pricing: React.FC = () => {
  const { services } = useClinic();

  const handleConsult = (serviceName?: string) => {
    const text = serviceName 
      ? `Hola Dr. Acosta, me interesa el servicio de ${serviceName} y me gustaría conocer los planes de pago.`
      : "Hola Dr. Acosta, me interesa conocer más sobre los planes de financiamiento y la valoración inicial.";
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="precios" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-gold-luxury font-medium tracking-widest uppercase text-xs">Transparencia</span>
          <h2 className="text-4xl text-navy-luxury luxury-font">Inversión en tu Salud</h2>
          <p className="text-slate-500 font-light italic text-sm">Precios base en MXN. Haga clic en cualquier servicio para consultar detalles.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-100 rounded-sm overflow-hidden shadow-2xl"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy-luxury text-white">
                <th className="p-8 uppercase tracking-widest text-[10px] font-bold">Servicio Principal</th>
                <th className="p-8 uppercase tracking-widest text-[10px] font-bold text-right">Inversión Base</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, idx) => (
                <tr 
                  key={service.id} 
                  onClick={() => handleConsult(service.name)}
                  className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-gold-luxury/10 transition-all group cursor-pointer`}
                >
                  <td className="p-8 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="block text-navy-luxury font-bold text-lg mb-1 group-hover:text-gold-luxury transition-colors">{service.name}</span>
                      <svg className="w-4 h-4 text-gold-luxury opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.455 1.083 3.44l-1.037 3.803 3.967-1.037a5.747 5.747 0 0 0 2.754.701c3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.39 8.161c-.146.411-.852.753-1.183.8-.331.047-.753.116-2.126-.457-1.745-.733-2.871-2.515-2.958-2.631-.087-.116-.713-.948-.713-1.815 0-.867.457-1.295.62-1.468.163-.174.354-.216.471-.216.116 0 .231 0 .331.006.107.006.246-.04.385.293.146.353.5.122.569.261s.116.273.058.388c-.058.116-.116.19-.174.261-.058.071-.122.146-.071.231.052.087.231.382.494.618.341.306.63.402.723.446.092.043.146.037.202-.023.058-.06.246-.286.312-.382.067-.097.133-.081.225-.047s.583.275.684.326c.101.051.168.076.19.116.022.04.022.231-.073.442z"/></svg>
                    </div>
                    <span className="text-xs text-slate-400 line-clamp-1">{service.description}</span>
                  </td>
                  <td className="p-8 border-b border-slate-100 text-right">
                    <span className="text-gold-luxury font-bold text-xl tracking-tight group-hover:scale-110 inline-block transition-transform">${service.price.toLocaleString('es-MX')} MXN</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-10 bg-navy-luxury text-center">
            <p className="text-white font-light mb-6 tracking-wide text-sm">¿Buscas un plan de pagos personalizado? Agenda tu valoración inicial por solo <span className="text-gold-luxury font-bold">$500 MXN</span> (aplicables a tu tratamiento).</p>
            <button 
              onClick={() => handleConsult()}
              className="inline-block bg-gold-luxury text-navy-luxury px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-xl"
            >
              Consultar Financiamiento
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
