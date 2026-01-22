
import React from 'react';
import { motion } from 'framer-motion';
import { WHATSAPP_NUMBER } from '../constants';

const Hero: React.FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Dr. César Acosta, me gustaría agendar una cita de valoración.")}`;

  // Estilo para el contorno azul de las letras (Blue Margin/Outline) 
  // Usando el azul navy de la marca para máxima definición
  const textOutlineStyle = {
    textShadow: `
      -2px -2px 0 #0c1524,  
       2px -2px 0 #0c1524,
      -2px  2px 0 #0c1524,
       2px  2px 0 #0c1524,
       0px 4px 15px rgba(0,0,0,0.4)
    `
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0c1524]">
      {/* Fondo: Imagen nítida del consultorio - Sin Blur Global */}
      <div className="absolute inset-0 z-0">
        {/* Gradiente sutil para legibilidad de texto sin ocultar la foto */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-luxury/40 via-transparent to-navy-luxury/60 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=90&w=2400" 
          alt="Consultorio Dr. Acosta" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenedor de Texto: Sin recuadro, centrado y responsivo */}
      <div className="relative z-20 w-full max-w-7xl px-6 py-20 flex items-center justify-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-5xl text-center"
        >
          {/* Insignia con contorno azul */}
          <motion.div variants={itemVariants} className="inline-block mb-6 md:mb-10">
            <span 
              style={textOutlineStyle}
              className="text-gold-luxury uppercase tracking-[0.4em] text-[10px] sm:text-xs md:text-sm font-bold border-b-2 border-gold-luxury/40 pb-2"
            >
              EXCLUSIVIDAD Y TECNOLOGÍA EN CHIHUAHUA
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            style={textOutlineStyle}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 md:mb-10 leading-[1.1] md:leading-[1.05] luxury-font text-white font-bold"
          >
            Tu Sonrisa de <span className="italic font-light text-gold-luxury">Élite</span> <br /> es Nuestra Obra Maestra
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            style={textOutlineStyle}
            className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-10 md:mb-16 max-w-3xl mx-auto font-medium leading-relaxed tracking-wide px-4"
          >
            Revolucionamos la estética dental con tecnología digital y un enfoque de <span className="text-gold-luxury underline decoration-gold-luxury/50 underline-offset-8">hospitalidad boutique</span> único en Chihuahua.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-10 px-8 sm:px-0"
          >
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gold-luxury text-navy-luxury px-10 md:px-14 py-5 md:py-6 rounded-sm font-bold tracking-[0.2em] uppercase text-[11px] md:text-xs transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
            >
              Agenda por WhatsApp Ahora
            </a>
            <a 
              href="#servicios"
              className="w-full sm:w-auto border-2 border-white/60 text-white px-10 md:px-14 py-5 md:py-6 rounded-sm font-bold tracking-[0.2em] uppercase text-[11px] md:text-xs transition-all hover:bg-white/10 active:scale-95 backdrop-blur-sm"
            >
              Ver Especialidades
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de Scroll sutil */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-gold-luxury via-gold-luxury/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
