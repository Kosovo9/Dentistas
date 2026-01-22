
import React from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';

const Services: React.FC = () => {
  const { services } = useClinic();

  // Sort services to show featured ones first
  const sortedServices = [...services].sort((a, b) => {
    if (a.featured === b.featured) return 0;
    return a.featured ? -1 : 1;
  });

  return (
    <section id="servicios" className="py-32 bg-[#fcfcfc] relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 space-y-6"
        >
          <span className="text-gold-luxury font-bold tracking-[0.5em] uppercase text-[10px] block opacity-80">Especialidades</span>
          <h2 className="text-5xl md:text-7xl text-navy-luxury luxury-font tracking-tight">Experiencia <span className="italic font-light">Especializada</span></h2>
          <div className="w-16 h-[2px] bg-gold-luxury mx-auto mt-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sortedServices.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`group relative bg-white p-12 h-full flex flex-col border ${service.featured ? 'border-gold-luxury/40 ring-1 ring-gold-luxury/5' : 'border-slate-100'} hover:border-gold-luxury/30 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(197,160,89,0.1)] overflow-hidden`}
            >
              {/* Featured Badge for Public Site */}
              {service.featured && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gold-luxury text-navy-luxury text-[8px] font-bold uppercase tracking-widest px-4 py-1.5 shadow-md">Popular</div>
                </div>
              )}

              {/* Decorative Index */}
              <span className="absolute top-8 left-10 text-6xl font-bold text-slate-50 select-none group-hover:text-gold-luxury/10 transition-colors duration-700">0{index + 1}</span>

              <div className="relative z-10">
                <div className="mb-12 text-gold-luxury w-16 h-16 flex items-center justify-center border border-gold-luxury/10 group-hover:bg-gold-luxury group-hover:text-white transition-all duration-500 rounded-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                
                <h3 className="text-3xl text-navy-luxury mb-6 luxury-font leading-tight group-hover:translate-x-2 transition-transform duration-500">
                  {service.name}
                </h3>
                
                <p className="text-slate-400 font-light leading-relaxed mb-10 text-base tracking-wide flex-grow">
                  {service.description}
                </p>
                
                <div className="pt-8 border-t border-slate-50 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Inversión desde</span>
                    <span className="text-navy-luxury font-bold text-xl tracking-tighter">${service.price.toLocaleString()} MXN</span>
                  </div>
                  
                  <button className="group/btn relative w-full py-4 text-center border border-navy-luxury/5 overflow-hidden transition-all duration-500">
                    <span className="relative z-10 text-navy-luxury group-hover/btn:text-white font-bold uppercase tracking-[0.3em] text-[9px] transition-colors duration-500">Consultar Tratamiento</span>
                    <div className="absolute inset-0 bg-navy-luxury translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out"></div>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
