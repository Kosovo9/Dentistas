
import React from 'react';
import { Link } from 'react-router-dom';
import { ADMIN_PATH, TIKTOK_URL } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { getDevWA } from '../utils/conversion';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const devWhatsappUrl = getDevWA("Acosta_Footer_Elite");

  return (
    <footer className="bg-navy-luxury text-white/50 py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold-luxury/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-20 mb-32">
          <div className="md:col-span-2 space-y-10">
            <h3 className="text-white text-4xl luxury-font font-bold tracking-tight italic">DR. ENRIQUE <span className="text-gold-luxury">ACOSTA</span></h3>
            <p className="max-w-md text-sm leading-relaxed font-light tracking-wide text-white/40 uppercase">
              Ingeniería dental de alta gama en Chihuahua. Transformamos vidas a través de la excelencia clínica y tecnología digital disruptiva.
            </p>
          </div>
          <div className="space-y-8">
            <h4 className="text-white uppercase tracking-[0.4em] text-[10px] font-black">Navegación</h4>
            <ul className="space-y-4 text-xs font-bold tracking-[0.2em] text-white/30">
              <li><a href="#inicio" className="hover:text-gold-luxury transition-all">ESTRATEGIA</a></li>
              <li><a href="#servicios" className="hover:text-gold-luxury transition-all">INGENIERÍA</a></li>
              <li><a href="#resultados" className="hover:text-gold-luxury transition-all">TRANSFORMACIONES</a></li>
              <li><a href="#contacto" className="hover:text-gold-luxury transition-all">CONEXIÓN</a></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-white uppercase tracking-[0.4em] text-[10px] font-black">Protocolos</h4>
            <ul className="space-y-4 text-xs font-bold tracking-[0.2em] text-white/30">
              <li><a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold-luxury transition-all">TIKTOK HQ</a></li>
              <li><Link to={ADMIN_PATH} className="text-white/10 hover:text-gold-luxury transition-all">SECURE LOGIN</Link></li>
            </ul>
          </div>
        </div>

        {/* CTA DEL DESARROLLADOR - NEXORA ELITE 10X */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 p-[1px] bg-gradient-to-r from-gold-luxury/30 via-white/5 to-gold-luxury/30 rounded-sm"
        >
          <div className="bg-navy-luxury/80 backdrop-blur-3xl p-16 md:p-24 rounded-sm text-center">
            <div className="inline-block mb-10 px-6 py-2 bg-gold-luxury/10 border border-gold-luxury/20 text-gold-luxury text-[10px] font-black uppercase tracking-[0.5em]">
              DISPONIBILIDAD: 3 SISTEMAS HOY
            </div>
            <h4 className="text-white luxury-font text-4xl md:text-6xl mb-12 font-light italic leading-tight max-w-5xl mx-auto">
              {t('footer_dev_cta')}
            </h4>
            <div className="flex flex-col items-center gap-8">
              <a 
                href={devWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-8 bg-gold-luxury text-navy-luxury px-16 py-7 rounded-sm font-black uppercase tracking-[0.5em] text-[11px] shadow-[0_30px_70px_rgba(197,160,89,0.3)] hover:bg-white transition-all duration-700 active:scale-95"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.455 1.083 3.44l-1.037 3.803 3.967-1.037a5.747 5.747 0 0 0 2.754.701c3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.39 8.161c-.146.411-.852.753-1.183.8-.331.047-.753.116-2.126-.457-1.745-.733-2.871-2.515-2.958-2.631-.087-.116-.713-.948-.713-1.815 0-.867.457-1.295.62-1.468.163-.174.354-.216.471-.216.116 0 .231 0 .331.006.107.006.246-.04.385.293.146.353.5.122.569.261s.116.273.058.388c-.058.116-.116.19-.174.261-.058.071-.122.146-.071.231.052.087.231.382.494.618.341.306.63.402.723.446.092.043.146.037.202-.023.058-.06.246-.286.312-.382.067-.097.133-.081.225-.047s.583.275.684.326c.101.051.168.076.19.116.022.04.022.231-.073.442z"/>
                </svg>
                {t('footer_dev_btn')}
              </a>
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 opacity-20 text-[9px] font-black uppercase tracking-[0.4em]">
                <span>Pure Code Engine</span>
                <span>•</span>
                <span>Responsive Any-Device</span>
                <span>•</span>
                <span>Pay on Delivery</span>
                <span>•</span>
                <span>Hand-Written Architecture</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.5em] font-black text-white/20">
          <p>© 2024 DR. ENRIQUE ACOSTA — CHIHUAHUA HQ.</p>
          <div className="flex items-center gap-4">
            <span className="text-gold-luxury">NEXORA BUILD</span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span>HIGH CONVERSION SYSTEM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
