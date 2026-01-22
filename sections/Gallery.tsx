
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { WHATSAPP_NUMBER } from '../constants';

const Gallery: React.FC = () => {
  const { gallery } = useClinic();

  const handleMoreInfo = () => {
    const message = encodeURIComponent("Hola Dr. Acosta, vi su galería de casos de éxito y me gustaría saber si mi caso puede ser tratado con su tecnología.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  const imageTransition = {
    duration: 1.5,
    ease: [0.22, 1, 0.36, 1]
  };

  return (
    <section id="resultados" className="py-32 bg-navy-luxury text-white overflow-hidden relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-luxury/30 to-transparent"></div>
      <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-gold-luxury/5 blur-[150px] rounded-full pointer-events-none"></div>

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
            Un cambio que va más allá de la estética: devolvemos la seguridad en cada sonrisa.
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
              className="group cursor-pointer relative"
              onClick={handleMoreInfo}
            >
              {/* Contenedor de Imagen con Efectos Avanzados */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-black shadow-2xl">
                
                {/* Capa ANTES (Base) */}
                <motion.div 
                  className="absolute inset-0 z-0"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  transition={imageTransition}
                >
                  <img 
                    src={item.beforeUrl} 
                    alt="Antes" 
                    className="w-full h-full object-cover grayscale-[30%] brightness-75"
                  />
                  <div className="absolute inset-0 bg-navy-luxury/20 group-hover:bg-transparent transition-colors duration-1000"></div>
                </motion.div>

                {/* Capa DESPUÉS (Overlay Cross-fade) */}
                <motion.div 
                  className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  transition={imageTransition}
                >
                  <img 
                    src={item.afterUrl} 
                    alt="Después" 
                    className="w-full h-full object-cover shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"
                  />
                  {/* Destello de color oro sutil en el borde al entrar */}
                  <div className="absolute inset-0 border-2 border-gold-luxury/0 group-hover:border-gold-luxury/20 transition-all duration-1000"></div>
                </motion.div>

                {/* Etiquetas Flotantes Dinámicas */}
                <div className="absolute top-6 left-6 z-20 transition-all duration-700 group-hover:opacity-0 group-hover:-translate-x-4">
                  <span className="bg-navy-luxury/80 backdrop-blur-md border border-white/10 text-white text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-2">Antes</span>
                </div>
                
                <div className="absolute top-6 right-6 z-20 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4">
                  <span className="bg-gold-luxury text-navy-luxury text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-2 shadow-xl">Después</span>
                </div>

                {/* Overlay de Interacción Final */}
                <div className="absolute inset-0 z-30 bg-gradient-to-t from-navy-luxury/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-10">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-px bg-gold-luxury"></div>
                    <p className="text-white text-xs font-bold tracking-[0.3em] uppercase">Click para detalles del caso</p>
                  </motion.div>
                </div>
              </div>

              {/* Título del Caso con Animación de subrayado */}
              <div className="mt-8 text-center space-y-3">
                <h3 className="text-xl md:text-2xl text-white luxury-font italic font-light group-hover:text-gold-luxury transition-colors duration-500">
                  {item.description}
                </h3>
                <div className="relative h-px w-12 bg-gold-luxury/30 mx-auto overflow-hidden">
                  <div className="absolute inset-0 bg-gold-luxury translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-1000 ease-[0.22, 1, 0.36, 1]"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Final con Efecto de Elevación */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-32 text-center"
        >
          <button 
            onClick={handleMoreInfo}
            className="group relative px-16 py-6 border border-gold-luxury/30 text-gold-luxury overflow-hidden transition-all duration-700 hover:border-gold-luxury shadow-lg hover:shadow-gold-luxury/10"
          >
            <span className="relative z-10 font-bold uppercase tracking-[0.4em] text-[10px] group-hover:text-navy-luxury transition-colors duration-500">Agendar mi propia transformación</span>
            <div className="absolute inset-0 bg-gold-luxury translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
