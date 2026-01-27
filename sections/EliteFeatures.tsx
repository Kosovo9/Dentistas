
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const EliteFeatures: React.FC = () => {
  const { t } = useLanguage();

  const features = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <section className="py-32 bg-navy-luxury relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-luxury/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold-luxury font-black tracking-[0.6em] text-[10px] uppercase"
          >
            NEXORA ARCHITECTURE
          </motion.span>
          <h2 className="text-5xl md:text-7xl luxury-font text-white italic tracking-tighter">
            {t('feat_title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((num) => (
            <motion.div 
              key={num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: num * 0.05 }}
              className="p-8 bg-white/5 border border-white/5 hover:border-gold-luxury/30 transition-all duration-500 group rounded-sm"
            >
              <span className="text-gold-luxury/20 text-4xl font-black mb-6 block group-hover:text-gold-luxury transition-colors">
                {num.toString().padStart(2, '0')}
              </span>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
                {t(`feat_${num}_title`)}
              </h4>
              <p className="text-white/40 text-[10px] leading-relaxed font-light uppercase tracking-tighter">
                {t(`feat_${num}_desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EliteFeatures;
