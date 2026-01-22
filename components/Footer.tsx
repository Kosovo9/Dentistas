
import React from 'react';
import { Link } from 'react-router-dom';
import { ADMIN_PATH } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-luxury text-white/50 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-white text-2xl luxury-font font-bold">DR. CÉSAR <span className="text-gold-luxury">ACOSTA</span></h3>
            <p className="max-w-xs text-sm leading-relaxed">
              Odontología de alta gama en Chihuahua. Creando sonrisas que reflejan tu mejor versión a través de la ciencia y el arte.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white uppercase tracking-widest text-xs font-bold">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#inicio" className="hover:text-gold-luxury transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-gold-luxury transition-colors">Servicios</a></li>
              <li><a href="#resultados" className="hover:text-gold-luxury transition-colors">Resultados</a></li>
              <li><a href="#contacto" className="hover:text-gold-luxury transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white uppercase tracking-widest text-xs font-bold">Privacidad</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gold-luxury transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="hover:text-gold-luxury transition-colors">Términos de Uso</a></li>
              <li><Link to={ADMIN_PATH} className="text-white/10 hover:text-white transition-colors">Administración</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest">
          <p>© 2024 Dr. César Acosta. Todos los derechos reservados.</p>
          <p>Desarrollado con <span className="text-gold-luxury">❤</span> en México</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
