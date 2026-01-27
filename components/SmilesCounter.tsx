
import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { useClinic } from '../context/ClinicContext';

const SmilesCounter: React.FC = () => {
  const { siteContent } = useClinic();
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, siteContent.smilesCount, { duration: 2, ease: "easeOut" });
    return animation.stop;
  }, [siteContent.smilesCount]);

  return (
    <div className="bg-[#0c1524] py-20 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gold-luxury/5 opacity-30"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 text-center">
          <div className="space-y-1">
            <motion.div className="text-5xl md:text-8xl font-bold text-white luxury-font flex items-center justify-center gap-2 italic tracking-tighter">
              <motion.span>{rounded}</motion.span>
              <span className="text-gold-luxury">✦</span>
            </motion.div>
            <p className="text-white/40 font-black uppercase tracking-[0.5em] text-[10px]">Sonrisas Transformadas</p>
          </div>
          
          <div className="hidden md:block h-16 w-[1px] bg-white/10"></div>

          <div className="space-y-1">
            <div className="text-5xl md:text-8xl font-bold text-white luxury-font italic tracking-tighter">
              99<span className="text-gold-luxury">%</span>
            </div>
            <p className="text-white/40 font-black uppercase tracking-[0.5em] text-[10px]">Satisfacción Clínica</p>
          </div>

          <div className="hidden md:block h-16 w-[1px] bg-white/10"></div>

          <div className="space-y-1">
            <div className="text-5xl md:text-8xl font-bold text-white luxury-font italic tracking-tighter">
              12<span className="text-gold-luxury">+</span>
            </div>
            <p className="text-white/40 font-black uppercase tracking-[0.5em] text-[10px]">Años de Excelencia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmilesCounter;
