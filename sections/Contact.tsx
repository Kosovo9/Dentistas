
import React from 'react';
import { motion } from 'framer-motion';
import { WHATSAPP_NUMBER, CLINIC_LOCATION, CLINIC_EMAIL, TIKTOK_URL } from '../constants';

const Contact: React.FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Dr. Acosta, quiero agendar mi valoración digital en su consultorio de Chihuahua.")}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Odontólogo Dr. César Acosta " + CLINIC_LOCATION)}`;
  const mailtoUrl = `mailto:${CLINIC_EMAIL}`;

  return (
    <section id="contacto" className="py-32 bg-white relative overflow-hidden border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-16"
          >
            <div className="space-y-6">
              <span className="text-gold-luxury font-bold tracking-[0.5em] uppercase text-[10px] block">Contacto Directo</span>
              <h2 className="text-5xl md:text-7xl text-navy-luxury luxury-font leading-none tracking-tight">
                El Comienzo de su <span className="italic font-light">Nueva Imagen</span>
              </h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed max-w-md">
                Ubicados en el epicentro médico de Chihuahua, nuestro consultorio es un santuario de tecnología y diseño.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-12 pt-4">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="space-y-3 group block">
                <h4 className="text-navy-luxury font-bold uppercase text-[10px] tracking-[0.3em] group-hover:text-gold-luxury transition-colors">Ubicación</h4>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-navy-luxury transition-colors">
                  Av. San Felipe 123, <br />
                  Col. San Felipe, CP 31203, <br />
                  Chihuahua, Chih.
                </p>
              </a>
              <div className="space-y-3">
                <h4 className="text-navy-luxury font-bold uppercase text-[10px] tracking-[0.3em]">Horarios</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Lunes — Viernes<br />
                  09:00 AM — 07:00 PM<br />
                  Sábados 10:00 AM — 02:00 PM
                </p>
              </div>
              <a href={`tel:${WHATSAPP_NUMBER}`} className="space-y-3 group block">
                <h4 className="text-navy-luxury font-bold uppercase text-[10px] tracking-[0.3em] group-hover:text-gold-luxury transition-colors">Teléfono</h4>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-navy-luxury transition-colors">
                  {WHATSAPP_NUMBER}
                </p>
              </a>
              <a href={mailtoUrl} className="space-y-3 group block">
                <h4 className="text-navy-luxury font-bold uppercase text-[10px] tracking-[0.3em] group-hover:text-gold-luxury transition-colors">Email</h4>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-navy-luxury transition-colors">
                  {CLINIC_EMAIL}
                </p>
              </a>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="space-y-3 group block">
                <h4 className="text-navy-luxury font-bold uppercase text-[10px] tracking-[0.3em] group-hover:text-gold-luxury transition-colors">TikTok</h4>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-navy-luxury transition-colors">
                  @enrique15388
                </p>
              </a>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-6">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center bg-navy-luxury text-white px-10 py-6 rounded-sm overflow-hidden transition-all duration-500 shadow-2xl"
              >
                <span className="relative z-10 font-bold uppercase tracking-[0.3em] text-[10px]">Agendar por WhatsApp</span>
                <div className="absolute inset-0 bg-gold-luxury translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <svg className="relative z-10 ml-4 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
              
              <a 
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center border border-navy-luxury text-navy-luxury px-10 py-6 rounded-sm overflow-hidden transition-all duration-500"
              >
                <span className="relative z-10 font-bold uppercase tracking-[0.3em] text-[10px]">Ver en TikTok</span>
                <div className="absolute inset-0 bg-navy-luxury translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative z-10 group-hover:text-white transition-colors ml-4 text-xs font-bold">TikTok</span>
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative h-[650px] group"
          >
            <div className="absolute inset-0 rounded-sm overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116634.30154817454!2d-106.16616423985799!3d28.634351368945625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea439498e8339d%3A0x2f641a942a17627!2sChihuahua!5e0!3m2!1sen!2smx!4v1715690000000!5m2!1sen!2smx" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) contrast(1.2) brightness(0.9) invert(0.05)' }} 
                allowFullScreen={true} 
                loading="lazy"
                className="grayscale transition-all duration-700 group-hover:grayscale-0"
              ></iframe>

              <div className="absolute inset-0 pointer-events-none border-[20px] border-white/80 transition-all duration-700 group-hover:border-white/20"></div>
              
              <div className="absolute bottom-12 left-12 right-12 bg-navy-luxury/90 backdrop-blur-xl p-10 border-l-4 border-gold-luxury shadow-2xl transition-all duration-700 translate-y-4 group-hover:translate-y-0 opacity-100 group-hover:opacity-90">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pointer-events-auto">
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="text-gold-luxury font-bold uppercase tracking-[0.4em] text-[10px]">Ubicación</h4>
                    <p className="text-white text-sm font-light">San Felipe, CP 31203, Chihuahua, Chih.</p>
                  </div>
                  <a 
                    href={mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-navy-luxury px-8 py-3 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-gold-luxury hover:text-white transition-all shadow-xl"
                  >
                    Abrir en Google Maps
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
