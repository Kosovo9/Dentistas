
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
      <nav className="bg-navy-luxury text-white py-4 px-6 sticky top-0 z-50 shadow-xl border-b border-gold-luxury/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl luxury-font font-bold tracking-tighter">
            DR. ENRIQUE <span className="text-gold-luxury">ACOSTA</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-[10px] uppercase tracking-widest text-gold-luxury/60 font-bold">Admin Mode</span>
            <Link to="/" className="text-[10px] uppercase tracking-widest border border-gold-luxury/40 px-6 py-2 rounded-sm hover:bg-gold-luxury hover:text-navy-luxury transition-all font-bold">Ver Sitio</Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'bg-navy-luxury/98 backdrop-blur-2xl shadow-2xl py-3 border-b border-white/5' : 'bg-gradient-to-b from-black/60 to-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#inicio" onClick={closeMobileMenu} className="text-xl md:text-2xl luxury-font font-bold tracking-tighter">
            <span className="text-white drop-shadow-md">DR. ENRIQUE</span> <span className="text-gold-luxury drop-shadow-md">ACOSTA</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            {/* Global Switchers Group */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 border border-white/20 p-1 rounded-sm bg-black/40">
                {['es', 'en'].map((lang) => (
                  <button 
                    key={lang}
                    onClick={() => setLanguage(lang as any)}
                    className={`text-[8px] font-black px-2 py-1 rounded-sm transition-all ${language === lang ? 'bg-gold-luxury text-navy-luxury' : 'text-white/40 hover:text-white'}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Currency Switcher */}
              <div className="flex items-center gap-1 border border-white/20 p-1 rounded-sm bg-black/40">
                {['MXN', 'USD'].map((curr) => (
                  <button 
                    key={curr}
                    onClick={() => setCurrency(curr as any)}
                    className={`text-[8px] font-black px-2 py-1 rounded-sm transition-all ${currency === curr ? 'bg-gold-luxury text-navy-luxury' : 'text-white/40 hover:text-white'}`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[9px] uppercase tracking-[0.3em] font-black text-white/90 hover:text-gold-luxury transition-all relative group drop-shadow-sm"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contacto" 
              className="bg-gold-luxury text-navy-luxury px-8 py-3 rounded-sm text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl active:scale-95"
            >
              {t('nav_reservar')}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-navy-luxury flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col items-center space-y-8">
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-4 border border-white/10 p-2">
                  <button onClick={() => setLanguage('es')} className={`text-xs font-bold ${language === 'es' ? 'text-gold-luxury' : 'text-white/40'}`}>ESPAÑOL</button>
                  <button onClick={() => setLanguage('en')} className={`text-xs font-bold ${language === 'en' ? 'text-gold-luxury' : 'text-white/40'}`}>ENGLISH</button>
                </div>
                <div className="flex gap-4 border border-white/10 p-2">
                  <button onClick={() => setCurrency('MXN')} className={`text-xs font-bold ${currency === 'MXN' ? 'text-gold-luxury' : 'text-white/40'}`}>MXN</button>
                  <button onClick={() => setCurrency('USD')} className={`text-xs font-bold ${currency === 'USD' ? 'text-gold-luxury' : 'text-white/40'}`}>USD</button>
                </div>
              </div>
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={closeMobileMenu} className="text-2xl uppercase tracking-[0.4em] font-light text-white">
                  {link.name}
                </a>
              ))}
              <a href="#contacto" onClick={closeMobileMenu} className="bg-gold-luxury text-navy-luxury px-12 py-4 rounded-sm text-xs font-bold uppercase tracking-[0.3em]">
                {t('nav_reservar')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
