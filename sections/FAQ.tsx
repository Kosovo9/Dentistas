
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "¿Qué es el Diseño de Sonrisa Digital (DSD)?",
    a: "Es una herramienta tecnológica que nos permite planificar y visualizar el resultado final de tu tratamiento antes de empezar, garantizando que tu nueva sonrisa armonice perfectamente con tus rasgos faciales."
  },
  {
    q: "¿Cuánto cuestan los implantes dentales en Chihuahua?",
    a: "Contamos con planes desde $18,000 MXN. Utilizamos materiales premium biocompatibles y tecnología de vanguardia para asegurar la durabilidad y estética de tu rehabilitación dental."
  },
  {
    q: "¿Ofrecen planes de financiamiento?",
    a: "Sí, entendemos que tu salud es una inversión. Contamos con diversas opciones de pago diferido y planes de financiamiento personalizados para todos nuestros tratamientos de alta gama."
  },
  {
    q: "¿Duele el tratamiento de carillas dentales?",
    a: "Nuestra filosofía 'Hospitality-Inspired' prioriza tu comodidad. Utilizamos técnicas mínimamente invasivas y sedación consciente si es necesario para asegurar una experiencia totalmente libre de ansiedad con el Dr. Enrique Acosta."
  }
];

const FAQItem: React.FC<{ faq: typeof faqs[0], index: number }> = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-slate-100 last:border-0"
      itemScope itemType="https://schema.org/Question"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-center text-left group focus:outline-none"
      >
        <h3 className="text-xl md:text-2xl font-bold text-navy-luxury luxury-font group-hover:text-gold-luxury transition-colors" itemProp="name">
          {faq.q}
        </h3>
        <span className={`text-gold-luxury transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
            itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer"
          >
            <p className="text-slate-500 font-light leading-relaxed pb-8 pr-12 text-lg" itemProp="text">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-gold-luxury font-bold tracking-[0.6em] uppercase text-[10px] block mb-4">Preguntas Frecuentes</span>
          <h2 className="text-5xl md:text-7xl text-navy-luxury luxury-font">Resolvemos tus <span className="italic font-light">Dudas</span></h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} faq={faq} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
