
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { WHATSAPP_NUMBER } from '../constants';
import { GalleryCategory } from '../types';

const Gallery: React.FC = () => {
  const { gallery } = useClinic();
  const [filter, setFilter] = useState<GalleryCategory | 'Todos'>('Todos');

  // Use actual item categories from INITIAL_GALLERY data
  const displayItems = gallery.filter(item => filter === 'Todos' || item.category === filter);

  const categories: (GalleryCategory | 'Todos')[] = ['Todos', 'Individual', 'Pareja', 'Familia'];

  const handleMoreInfo = () => {
    const message = encodeURIComponent("Hola Dr. Enrique Acosta, vi su galería de casos de éxito y me gustaría saber si mi caso puede ser tratado con su tecnología.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section id="resultados" className="py-32 bg-navy-luxury text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-luxury/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div className="text-center mb-20 space-y-6">
          <span className="text-gold-luxury font-semibold uppercase text-[10px] tracking-[0.5em] block">Casos de Éxito</span>
          <h2 className="text-5xl md:text-7xl luxury-font tracking-tight">Transformaciones <span className="italic font-light">Reales</span></h2>
        </motion.div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-sm text-[9px] font-black uppercase tracking-[0.3em] transition-all border ${filter === cat ? 'bg-gold-luxury text-navy-luxury border-gold-luxury' : 'text-white/40 border-white/5 hover:border-gold-luxury/30'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayItems.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer relative"
                onClick={handleMoreInfo}
              >
                <div className="relative aspect-square overflow-hidden rounded-sm bg-black border border-white/5">
                  <motion.div className="absolute inset-0 z-0">
                    <img src={item.beforeUrl} alt="Antes" className="w-full h-full object-cover grayscale brightness-50" />
                  </motion.div>
                  
                  <motion.div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <img src={item.afterUrl} alt="Después" className="w-full h-full object-cover" />
                  </motion.div>

                  <div className="absolute top-4 left-4 z-20 transition-all duration-500 group-hover:opacity-0">
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 text-[8px] font-black uppercase tracking-widest">Antes</span>
                  </div>
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="bg-gold-luxury text-navy-luxury px-3 py-1 text-[8px] font-black uppercase tracking-widest">Después</span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-gold-luxury text-[8px] font-black uppercase tracking-[0.2em]">{item.category}</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-sm font-light italic text-white/60 group-hover:text-white transition-colors uppercase tracking-widest">{item.description}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-24 text-center">
          <button 
            onClick={handleMoreInfo}
            className="group relative px-12 py-5 border border-gold-luxury/30 text-gold-luxury overflow-hidden transition-all hover:border-gold-luxury"
          >
            <span className="relative z-10 font-bold uppercase tracking-[0.4em] text-[10px]">Ver Protocolos Completos</span>
            <div className="absolute inset-0 bg-gold-luxury translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
