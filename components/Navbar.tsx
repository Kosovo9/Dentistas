
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_PATH } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const location = useLocation();
  const isAdminPage = location.pathname === ADMIN_PATH;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav_inicio'), href: '#inicio' },
    { name: t('nav_servicios'), href: '#servicios' },
    { name: t('nav_resultados'), href: '#resultados' },
    { name: t('nav_precios'), href: '#precios' },
    { name: t('nav_contacto'), href: '#contacto' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (isAdminPage) {
    return (
      <nav className="bg-navy-luxury text-white py-4 px-6 border-b border-gold-luxury/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-lg luxury-font font-bold">DR. ENRIQUE <span className="text-gold-luxury">ACOSTA</span></Link>
          <Link to="/" className="text-[10px] uppercase tracking-widest border border-gold-luxury/40 px-4 py-2 rounded-sm hover:bg-gold-luxury hover:text-navy-luxury transition-all font-bold">Ver Sitio</Link>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'bg-navy-luxury shadow-2xl py-2' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <a href="#inicio" onClick={closeMobileMenu} className="text-lg md:text-2xl luxury-font font-bold tracking-tighter">
            <span className="text-white">DR. ENRIQUE</span> <span className="text-gold-luxury">ACOSTA</span>
          </a>
          
          {/* Desktop Menu - Visible only on large screens */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <div className="flex gap-2">
              <div className="flex bg-black/40 p-1 rounded-sm border border-white/10">
                {['es', 'en'].map(l => (
                  <button key={l} onClick={() => setLanguage(l as any)} className={`text-[8px] font-black px-2 py-1 rounded-sm ${language === l ? 'bg-gold-luxury text-navy-luxury' : 'text-white/40'}`}>{l.toUpperCase()}</button>
                ))}
              </div>
              <div className="flex bg-black/40 p-1 rounded-sm border border-white/10">
                {['MXN', 'USD'].map(c => (
                  <button key={c} onClick={() => setCurrency(c as any)} className={`text-[8px] font-black px-2 py-1 rounded-sm ${currency === c ? 'bg-gold-luxury text-navy-luxury' : 'text-white/40'}`}>{c}</button>
                ))}
              </div>
            </div>

            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-[9px] uppercase tracking-[0.2em] font-black text-white/80 hover:text-gold-luxury transition-all">{link.name}</a>
            ))}
            
            <a href="#contacto" className="bg-gold-luxury text-navy-luxury px-6 py-3 rounded-sm text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg">{t('nav_reservar')}</a>
          </div>

          {/* Mobile Toggle - Visible on anything smaller than large desktops */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-navy-luxury flex flex-col justify-center items-center lg:hidden"
          >
            <div className="flex flex-col items-center space-y-8 px-6 text-center">
              <div className="flex gap-4">
                <div className="flex border border-white/10 p-2 gap-4">
                  <button onClick={() => {setLanguage('es'); closeMobileMenu();}} className={`text-xs font-bold ${language === 'es' ? 'text-gold-luxury' : 'text-white/40'}`}>ES</button>
                  <button onClick={() => {setLanguage('en'); closeMobileMenu();}} className={`text-xs font-bold ${language === 'en' ? 'text-gold-luxury' : 'text-white/40'}`}>EN</button>
                </div>
              </div>
              
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={closeMobileMenu} className="text-2xl uppercase tracking-[0.4em] font-light text-white">{link.name}</a>
              ))}
              
              <a href="#contacto" onClick={closeMobileMenu} className="bg-gold-luxury text-navy-luxury px-12 py-4 rounded-sm text-xs font-bold uppercase tracking-[0.3em]">{t('nav_reservar')}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
