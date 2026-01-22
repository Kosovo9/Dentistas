
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_PATH } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    { name: 'INICIO', href: '#inicio' },
    { name: 'SERVICIOS', href: '#servicios' },
    { name: 'RESULTADOS', href: '#resultados' },
    { name: 'PRECIOS', href: '#precios' },
    { name: 'CONTACTO', href: '#contacto' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (isAdminPage) {
    return (
      <nav className="bg-navy-luxury text-white py-4 px-6 sticky top-0 z-50 shadow-xl border-b border-gold-luxury/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl luxury-font font-bold tracking-tighter">
            DR. CÉSAR <span className="text-gold-luxury">ACOSTA</span>
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
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'bg-navy-luxury/95 backdrop-blur-xl shadow-2xl py-3 border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#inicio" onClick={closeMobileMenu} className="text-xl md:text-2xl luxury-font font-bold tracking-tighter">
            <span className="text-white">DR. CÉSAR</span> <span className="text-gold-luxury">ACOSTA</span>
          </a>
          
          {/* Desktop Links - Sincronizados con Screenshot */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/90 hover:text-gold-luxury transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gold-luxury transition-all duration-500 group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="#contacto" 
              className="bg-gold-luxury text-navy-luxury px-10 py-3 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all shadow-[0_10px_20px_rgba(197,160,89,0.3)] active:scale-95"
            >
              RESERVAR
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 focus:outline-none"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-navy-luxury flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col items-center space-y-12">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={closeMobileMenu}
                  className="text-3xl uppercase tracking-[0.4em] font-light text-white hover:text-gold-luxury transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contacto" 
                onClick={closeMobileMenu}
                className="bg-gold-luxury text-navy-luxury px-16 py-5 rounded-sm text-xs font-bold uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-transform"
              >
                AGENDAR CITA
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
