
import React from 'react';
import { motion } from 'framer-motion';
import { WHATSAPP_NUMBER } from '../constants';

const Hero: React.FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Dr. César Acosta, me gustaría agendar una cita de valoración.")}`;

  // Variantes para el contenedor de texto (Staggered Children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    },
  };

  /**
   * Estilo de "Contorno" (Outline) solicitado con el azul acua de la imagen.
   * Se utiliza una combinación de múltiples sombras para crear un borde definido
   * y un sutil resplandor que hace resaltar el blanco.
   */
  const aquaContourStyle = {
    color: '#ffffff',
    textShadow: `
      -1px -1px 0 #00b4d8,  
       1px -1px 0 #00b4d8,
      -1px  1px 0 #00b4d8,
       1px  1px 0 #00b4d8,
       0 0 15px rgba(0, 180, 216, 0.5)
    `
  };

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden bg-navy-luxury">
      {/* Fondo Cinemático: Paneo ascendente + Fade-in + Zoom sutil */}
      <motion.div 
        initial={{ scale: 1.1, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy-luxury/80 via-navy-luxury/30 to-navy-luxury/90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=90&w=2400" 
          alt="Consultorio de Lujo" 
          className="w-full h-full object-cover transform"
        />
      </motion.div>

      {/* Contenido Principal Sincronizado y Balanceado */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-6 max-w-4xl"
      >
        <motion.span 
          variants={itemVariants}
          className="text-gold-luxury uppercase tracking-[0.5em] text-[9px] md:text-[11px] mb-6 block font-bold opacity-100 drop-shadow-lg"
        >
          Exclusividad y Tecnología en Chihuahua
        </motion.span>
        
        <motion.h1 
          variants={itemVariants}
          style={aquaContourStyle}
          className="text-4xl md:text-6xl lg:text-7xl mb-8 leading-[1.1] luxury-font tracking-tight"
        >
          Tu Sonrisa de <span className="italic font-light text-gold-luxury" style={{ textShadow: 'none' }}>Élite</span> <br className="hidden md:block" /> es Nuestra Obra Maestra
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          style={aquaContourStyle}
          className="text-white/90 text-base md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-wide drop-shadow-md"
        >
          Revolucionamos la estética dental con tecnología digital de vanguardia y un enfoque de <span className="text-gold-luxury font-medium" style={{ textShadow: 'none' }}>hospitalidad boutique</span> único en el norte de México.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-gold-luxury text-navy-luxury px-10 py-4 rounded-sm font-bold tracking-[0.25em] uppercase text-[10px] transition-all duration-500 overflow-hidden shadow-[0_20px_50px_-15px_rgba(197,160,89,0.4)]"
          >
            <span className="relative z-10">Agenda por WhatsApp</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          </a>
          <a 
            href="#servicios"
            className="group relative border border-white/30 text-white px-10 py-4 rounded-sm font-bold tracking-[0.25em] uppercase text-[10px] transition-all duration-500 hover:border-gold-luxury hover:text-gold-luxury backdrop-blur-md bg-white/5"
          >
            Nuestros Servicios
          </a>
        </motion.div>
      </motion.div>

      {/* Indicador de Scroll Cinemático */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-white/20 uppercase tracking-[0.4em] text-[8px] font-bold">Descubrir</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold-luxury/40 to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ 
              y: [-80, 80],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-transparent via-white to-transparent"
          />
        </div>
      </motion.div>

      {/* Efectos de Luz de Fondo (Bloom) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-gold-luxury/5 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] bg-cyan-400/5 blur-[150px] rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
