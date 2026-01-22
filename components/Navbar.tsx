
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
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Precios', href: '#precios' },
    { name: 'Contacto', href: '#contacto' },
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
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'bg-navy-luxury/95 backdrop-blur-xl shadow-2xl py-3 border-b border-white/5' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#inicio" onClick={closeMobileMenu} className="text-xl md:text-2xl luxury-font font-bold tracking-tighter">
            <span className="text-white">DR. CÉSAR</span> <span className="text-gold-luxury">ACOSTA</span>
          </a>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/80 hover:text-gold-luxury transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-luxury transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="#contacto" 
              className="bg-gold-luxury text-navy-luxury px-5 py-2 rounded-sm text-[9px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg"
            >
              Reservar
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 focus:outline-none"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-navy-luxury flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col items-center space-y-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={closeMobileMenu}
                  className="text-2xl uppercase tracking-[0.3em] font-light text-white hover:text-gold-luxury transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contacto" 
                onClick={closeMobileMenu}
                className="bg-gold-luxury text-navy-luxury px-12 py-4 rounded-sm text-xs font-bold uppercase tracking-widest shadow-2xl"
              >
                Agendar Cita
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
