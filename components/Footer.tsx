
import React from 'react';
import { Link } from 'react-router-dom';
import { ADMIN_PATH, TIKTOK_URL } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const devWhatsappUrl = "https://wa.me/5216143277218?text=" + encodeURIComponent("¡Hola! Me encantó la App/Landing que hiciste para el Dr. Enrique Acosta. Me gustaría preguntar por una para mi proyecto con entrega inmediata y pago contra entrega.");

  return (
    <footer className="bg-navy-luxury text-white/50 py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-luxury/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2 space-y-8">
            <h3 className="text-white text-3xl luxury-font font-bold tracking-tight">DR. ENRIQUE <span className="text-gold-luxury">ACOSTA</span></h3>
            <p className="max-w-md text-sm leading-relaxed font-light tracking-wide text-white/60">
              Odontología de alta gama en Chihuahua. Transformamos vidas a través de la excelencia clínica y la tecnología digital más avanzada de México.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-white uppercase tracking-[0.3em] text-[10px] font-black">Navegación</h4>
            <ul className="space-y-4 text-xs font-bold tracking-widest">
              <li><a href="#inicio" className="hover:text-gold-luxury transition-all duration-300">INICIO</a></li>
              <li><a href="#servicios" className="hover:text-gold-luxury transition-all duration-300">SERVICIOS</a></li>
              <li><a href="#resultados" className="hover:text-gold-luxury transition-all duration-300">RESULTADOS</a></li>
              <li><a href="#contacto" className="hover:text-gold-luxury transition-all duration-300">CONTACTO</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-white uppercase tracking-[0.3em] text-[10px] font-black">Legal & Redes</h4>
            <ul className="space-y-4 text-xs font-bold tracking-widest">
              <li><a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold-luxury transition-all duration-300 flex items-center gap-2">TIKTOK</a></li>
              <li><a href="#" className="hover:text-gold-luxury transition-all duration-300">PRIVACIDAD</a></li>
              <li><Link to={ADMIN_PATH} className="text-white/20 hover:text-gold-luxury transition-all duration-300">SISTEMA ADMIN</Link></li>
            </ul>
          </div>
        </div>

        {/* CTA DEL DESARROLLADOR - ALTA CONVERSIÓN CON HOOKS DE ENTREGA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 p-px bg-gradient-to-r from-gold-luxury/40 via-white/10 to-gold-luxury/40 rounded-sm"
        >
          <div className="bg-navy-luxury/90 backdrop-blur-3xl p-10 md:p-16 rounded-sm text-center group">
            <div className="inline-block mb-6 px-4 py-1 bg-gold-luxury/10 border border-gold-luxury/20 text-gold-luxury text-[9px] font-black uppercase tracking-[0.3em]">
              OFERTA DISPONIBLE: 3 CUPOS HOY
            </div>
            <h4 className="text-white luxury-font text-3xl md:text-4xl mb-10 font-light italic leading-tight max-w-3xl mx-auto">
              {t('footer_dev_cta')}
            </h4>
            <a 
              href={devWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-6 bg-gold-luxury text-navy-luxury px-14 py-6 rounded-sm font-black uppercase tracking-[0.3em] text-[10px] shadow-[0_20px_40px_rgba(197,160,89,0.3)] hover:bg-white transition-all duration-500 active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.455 1.083 3.44l-1.037 3.803 3.967-1.037a5.747 5.747 0 0 0 2.754.701c3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.39 8.161c-.146.411-.852.753-1.183.8-.331.047-.753.116-2.126-.457-1.745-.733-2.871-2.515-2.958-2.631-.087-.116-.713-.948-.713-1.815 0-.867.457-1.295.62-1.468.163-.174.354-.216.471-.216.116 0 .231 0 .331.006.107.006.246-.04.385.293.146.353.5.122.569.261s.116.273.058.388c-.058.116-.116.19-.174.261-.058.071-.122.146-.071.231.052.087.231.382.494.618.341.306.63.402.723.446.092.043.146.037.202-.023.058-.06.246-.286.312-.382.067-.097.133-.081.225-.047s.583.275.684.326c.101.051.168.076.19.116.022.04.022.231-.073.442z"/>
              </svg>
              {t('footer_dev_btn')}
            </a>
            <p className="mt-8 text-[9px] text-white/20 uppercase tracking-[0.4em] font-black">Entrega en 24h Garantizada • 100% Mobile Ready</p>
          </div>
        </motion.div>
        
        <div className="mb-12 text-center max-w-4xl mx-auto pt-10 border-t border-white/5">
          <p className="text-[10px] leading-relaxed italic opacity-40 font-light tracking-widest uppercase">
            {t('footer_disclaimer')}
          </p>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.4em] font-bold text-white/30">
          <p>© 2024 DR. ENRIQUE ACOSTA — CHIHUAHUA, MÉXICO.</p>
          <div className="flex items-center gap-3">
            <span>PLATAFORMA PREMIUM</span>
            <span className="text-gold-luxury text-lg leading-none mt-[-4px]">✦</span>
            <span>HIGH CONVERSION APP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
