
import React from 'react';
import { motion } from 'framer-motion';
import { WHATSAPP_NUMBER } from '../constants';

const Hero: React.FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Dr. César Acosta, me gustaría agendar una cita de valoración.")}`;

  // Estilo para el contorno azul de las letras (Blue Margin/Outline) - Optimizado para legibilidad sobre foto directa
  const textOutlineStyle = {
    textShadow: `
      -2px -2px 0 #0c1524,  
       2px -2px 0 #0c1524,
      -2px  2px 0 #0c1524,
       2px  2px 0 #0c1524,
       0px  4px 10px rgba(0,0,0,0.8)
    `
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8,
        ease: "easeOut"
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0c1524]">
      {/* Fondo: Fotografía completa y nítida del consultorio */}
      <div className="absolute inset-0 z-0">
        {/* Overlay muy sutil para contraste de texto blanco, sin ocultar la foto */}
        <div className="absolute inset-0 bg-navy-luxury/10 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=90&w=2400" 
          alt="Consultorio Dr. Acosta" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenedor Principal: Texto directamente sobre la foto */}
      <div className="relative z-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[95%] md:max-w-4xl text-center"
        >
          {/* Insignia de Ubicación con margen azul */}
          <motion.div variants={itemVariants} className="inline-block mb-8">
            <span 
              style={textOutlineStyle}
              className="text-gold-luxury uppercase tracking-[0.5em] text-[11px] md:text-sm font-bold border-b-2 border-gold-luxury/40 pb-2"
            >
              EXCLUSIVIDAD Y TECNOLOGÍA EN CHIHUAHUA
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            style={textOutlineStyle}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-10 leading-[1.05] luxury-font text-white font-bold"
          >
            Tu Sonrisa de <span className="italic font-light text-gold-luxury">Élite</span> <br /> es Nuestra Obra Maestra
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            style={textOutlineStyle}
            className="text-white text-base sm:text-lg md:text-2xl mb-14 max-w-3xl mx-auto font-medium leading-relaxed tracking-wide px-4"
          >
            Revolucionamos la estética dental con tecnología digital y un enfoque de <span className="text-gold-luxury underline decoration-gold-luxury/50 underline-offset-8">hospitalidad boutique</span> único en Chihuahua.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10"
          >
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gold-luxury text-navy-luxury px-10 md:px-14 py-5 md:py-6 rounded-sm font-bold tracking-[0.2em] uppercase text-[11px] md:text-xs transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(197,160,89,0.3)]"
            >
              Agenda por WhatsApp Ahora
            </a>
            <a 
              href="#servicios"
              className="w-full sm:w-auto border-2 border-white/60 text-white px-10 md:px-14 py-5 md:py-6 rounded-sm font-bold tracking-[0.2em] uppercase text-[11px] md:text-xs transition-all hover:bg-white hover:text-navy-luxury active:scale-95 backdrop-blur-sm"
            >
              Ver Especialidades
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de Scroll Decorativo */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <div className="w-[2px] h-20 bg-gradient-to-b from-gold-luxury via-gold-luxury/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
