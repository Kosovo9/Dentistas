
import React from 'react';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Mariana Rojas",
      text: "La experiencia superó mis expectativas. El Dr. Acosta es un artista y el trato de todo el equipo te hace sentir en un spa más que en un dentista.",
      rating: 5
    },
    {
      name: "Carlos Méndez",
      text: "Excelente tecnología. Gracias al Diseño Digital pude ver cómo quedaría mi sonrisa antes de empezar. El resultado es idéntico.",
      rating: 5
    },
    {
      name: "Elena Villarreal",
      text: "Buscaba un implante dental de calidad en Chihuahua y encontré al mejor. Muy profesional y humano.",
      rating: 5
    }
  ];

  return (
    <section className="py-32 bg-[#fafafa] border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
                <span className="text-gold-luxury font-bold tracking-[0.5em] uppercase text-[10px] block opacity-80">Prueba Social</span>
                <h2 className="text-5xl md:text-6xl text-navy-luxury luxury-font tracking-tight">Lo que dicen <span className="italic font-light">nuestros pacientes</span></h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-6 bg-white px-10 py-6 rounded-sm shadow-2xl border border-slate-100"
            >
                <div className="text-center border-r border-slate-100 pr-6">
                  <span className="text-navy-luxury font-bold text-3xl block">4.9/5</span>
                  <span className="text-slate-400 text-[9px] uppercase tracking-widest font-bold">Rating Global</span>
                </div>
                <div>
                  <div className="flex text-gold-luxury mb-1">
                      {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                  </div>
                  <span className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-medium">+250 Reseñas Reales</span>
                </div>
            </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-12 rounded-sm shadow-sm hover:shadow-2xl transition-all duration-700 relative group border border-slate-50"
            >
                <div className="absolute top-10 right-10 opacity-[0.05] group-hover:opacity-10 transition-opacity duration-700">
                  <svg className="w-16 h-16 fill-current text-gold-luxury" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H14.017V10H19.017V12H21.017V6H19.017V8H14.017V6C14.017 4.89543 14.9124 4 16.017 4H19.017V2H16.017C13.8079 2 12.017 3.79086 12.017 6V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017V14H5.017V10H10.017V12H12.017V6H10.017V8H5.017V6C5.017 4.89543 5.91243 4 7.017 4H10.017V2H7.017C4.80786 2 3.017 3.79086 3.017 6V21H5.017Z" />
                  </svg>
                </div>
                
                <p className="mb-10 relative z-10 text-slate-500 font-light italic text-lg leading-relaxed">
                  "{t.text}"
                </p>
                
                <div className="flex items-center justify-between border-t border-slate-50 pt-8 not-italic">
                    <div>
                      <span className="font-bold text-navy-luxury text-sm block uppercase tracking-widest">{t.name}</span>
                      <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest mt-1 block">Paciente Verificado</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gold-luxury/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gold-luxury" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
                    </div>
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
