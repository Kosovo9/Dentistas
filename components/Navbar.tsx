
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_PATH } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname === ADMIN_PATH;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  if (isAdminPage) {
    return (
      <nav className="bg-navy-luxury text-white py-4 px-6 sticky top-0 z-50 shadow-xl border-b border-gold-luxury/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl luxury-font font-bold tracking-tighter">
            DR. CÉSAR <span className="text-gold-luxury">ACOSTA</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gold-luxury/60 font-bold">Admin Mode</span>
            <Link to="/" className="text-[10px] uppercase tracking-widest border border-gold-luxury/40 px-6 py-2 rounded-sm hover:bg-gold-luxury hover:text-navy-luxury transition-all font-bold">Ver Sitio</Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-navy-luxury/95 backdrop-blur-xl shadow-2xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#inicio" className="text-2xl luxury-font font-bold transition-transform hover:scale-105 duration-500 tracking-tighter">
          <span className="text-white">DR. CÉSAR</span> <span className="text-gold-luxury">ACOSTA</span>
        </a>
        
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/70 hover:text-gold-luxury transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-luxury transition-all duration-500 group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="#contacto" 
            className="bg-gold-luxury text-navy-luxury px-6 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg"
          >
            Reservar
          </a>
        </div>

        <div className="md:hidden">
            <button className="text-white p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
                </svg>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
