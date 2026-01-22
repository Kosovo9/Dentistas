
import React from 'react';
import { motion } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';

const Gallery: React.FC = () => {
  const { gallery } = useClinic();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section id="resultados" className="py-32 bg-navy-luxury text-white overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-luxury/30 to-transparent"></div>
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-gold-luxury/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 space-y-6"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.5 }}
            className="text-gold-luxury font-semibold uppercase text-[10px] md:text-xs block"
          >
            Casos de Éxito
          </motion.span>
          <h2 className="text-5xl md:text-7xl luxury-font tracking-tight leading-none">
            Transformaciones <span className="italic font-light">Reales</span>
          </h2>
          <p className="text-white/40 font-light max-w-xl mx-auto italic text-lg tracking-wide">
            Historias de confianza recuperada a través de nuestra técnica artística y digital.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-12 lg:gap-20"
        >
          {gallery.map((item) => (
            <motion.div 
              key={item.id}
              variants={cardVariants}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-black shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                {/* Image Comparison Container */}
                <div className="flex h-full w-full gap-1">
                  <div className="relative w-1/2 overflow-hidden h-full">
                    <motion.img 
                      src={item.beforeUrl} 
                      alt="Antes" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-navy-luxury/40 group-hover:bg-transparent transition-colors duration-700"></div>
                    <div className="absolute top-6 left-6 z-20">
                      <span className="bg-navy-luxury/80 backdrop-blur-md border border-white/10 text-white text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-2">Antes</span>
                    </div>
                  </div>
                  
                  <div className="relative w-1/2 overflow-hidden h-full">
                    <motion.img 
                      src={item.afterUrl} 
                      alt="Después" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    />
                    <motion.div 
                      initial={{ opacity: 0.6 }}
                      whileInView={{ opacity: 0 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="absolute inset-0 bg-gold-luxury/20"
                    />
                    <div className="absolute top-6 right-6 z-20">
                      <span className="bg-gold-luxury text-navy-luxury text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-2 shadow-xl">Después</span>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-luxury via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white text-sm font-medium tracking-widest uppercase">Ver Detalle del Caso</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center space-y-3">
                <h3 className="text-xl md:text-2xl text-gold-luxury luxury-font italic font-light group-hover:tracking-wider transition-all duration-500">
                  {item.description}
                </h3>
                <div className="w-8 h-px bg-gold-luxury/40 mx-auto transition-all duration-500 group-hover:w-24 group-hover:bg-gold-luxury"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-32 text-center"
        >
          <button className="group relative px-16 py-6 border border-gold-luxury/30 text-gold-luxury overflow-hidden transition-all duration-500 hover:border-gold-luxury">
            <span className="relative z-10 font-bold uppercase tracking-[0.4em] text-[10px]">Galería de Excelencia</span>
            <div className="absolute inset-0 bg-gold-luxury translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]"></div>
            <style>{`.group:hover span { color: #0c1524; }`}</style>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
