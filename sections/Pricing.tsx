
import React from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';

const Pricing: React.FC = () => {
  const { services } = useClinic();

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
          <p className="text-slate-500 font-light italic">Todos los precios expresados en MXN. Contamos con opciones de financiamiento.</p>
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
                <tr key={service.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-gold-luxury/5 transition-colors group`}>
                  <td className="p-8 border-b border-slate-100">
                    <span className="block text-navy-luxury font-bold text-lg mb-1">{service.name}</span>
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
            <p className="text-white font-light mb-6 tracking-wide">¿Buscas un plan de pagos personalizado? Agenda tu valoración inicial por solo <span className="text-gold-luxury font-bold">$500 MXN</span> (aplicables a tu tratamiento).</p>
            <a href="https://wa.me/526145115220" target="_blank" rel="noopener noreferrer" className="inline-block bg-gold-luxury text-navy-luxury px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl">Consultar Financiamiento</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
