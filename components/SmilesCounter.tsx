
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
    <div className="bg-white py-16 border-y border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 text-center">
          <div className="space-y-1">
            <motion.div className="text-5xl md:text-7xl font-bold text-navy-luxury luxury-font flex items-center justify-center gap-2">
              <motion.span>{rounded}</motion.span>
              <span className="text-gold-luxury">+</span>
            </motion.div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">Sonrisas Transformadas</p>
          </div>
          
          <div className="hidden md:block h-12 w-px bg-slate-100"></div>

          <div className="space-y-1">
            <div className="text-5xl md:text-7xl font-bold text-navy-luxury luxury-font">
              99<span className="text-gold-luxury">%</span>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">Satisfacción Clínica</p>
          </div>

          <div className="hidden md:block h-12 w-px bg-slate-100"></div>

          <div className="space-y-1">
            <div className="text-5xl md:text-7xl font-bold text-navy-luxury luxury-font">
              12<span className="text-gold-luxury">+</span>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">Años de Excelencia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmilesCounter;
