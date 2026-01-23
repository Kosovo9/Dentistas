
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import WhatsAppButton from './components/WhatsAppButton';
import MusicPlayer from './components/MusicPlayer';
import { ADMIN_PATH } from './constants';
import { ClinicProvider } from './context/ClinicContext';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('acosta_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  return (
    <ClinicProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen selection:bg-gold-luxury selection:text-navy-luxury">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route 
                  path={ADMIN_PATH} 
                  element={isAuthenticated ? <AdminDashboard /> : <AdminLogin onLogin={() => setIsAuthenticated(true)} />} 
                />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <WhatsAppButton />
          <MusicPlayer />
        </div>
      </HashRouter>
    </ClinicProvider>
  );
};

export default App;
