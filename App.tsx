
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import WhatsAppButton from './components/WhatsAppButton';
import BookingModal from './components/BookingModal';
import { ADMIN_PATH } from './constants';
import { ClinicProvider } from './context/ClinicContext';
import { AnimatePresence } from 'framer-motion';
import { Service } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; service: Service | null }>({
    isOpen: false,
    service: null
  });

  useEffect(() => {
    const auth = sessionStorage.getItem('acosta_auth');
    if (auth === 'true') setIsAuthenticated(true);

    // Global event listener for booking triggers
    const handleOpenBooking = (e: any) => {
      setBookingModal({ isOpen: true, service: e.detail || null });
    };
    window.addEventListener('openBooking', handleOpenBooking);
    return () => window.removeEventListener('openBooking', handleOpenBooking);
  }, []);

  const closeBooking = () => setBookingModal(prev => ({ ...prev, isOpen: false }));

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
          
          <AnimatePresence>
            {bookingModal.isOpen && (
              <BookingModal 
                isOpen={bookingModal.isOpen} 
                onClose={closeBooking} 
                initialService={bookingModal.service} 
              />
            )}
          </AnimatePresence>
        </div>
      </HashRouter>
    </ClinicProvider>
  );
};

export default App;
