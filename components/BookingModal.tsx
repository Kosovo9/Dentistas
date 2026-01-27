
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClinic } from '../context/ClinicContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { Service } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: Service | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialService }) => {
  const { services, addAppointment } = useClinic();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(initialService || null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: ''
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService) {
      addAppointment({
        id: Date.now().toString(),
        patientName: formData.name,
        patientPhone: formData.phone,
        date: formData.date,
        time: formData.time,
        service: selectedService.name,
        status: 'pending'
      });
      setStep(4); // Success step
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-navy-luxury/90 backdrop-blur-xl"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row my-auto max-h-[90vh]"
      >
        {/* Sidebar Info */}
        <div className="md:w-1/3 bg-gold-luxury p-6 md:p-8 flex flex-col justify-between text-navy-luxury shrink-0">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Pasos</span>
            <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 border-navy-luxury flex items-center justify-center text-[10px] font-bold ${step >= i ? 'bg-navy-luxury text-white' : 'opacity-30'}`}>{i}</div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${step === i ? 'opacity-100' : 'opacity-30'}`}>
                    {i === 1 ? 'Servicio' : i === 2 ? 'Horario' : 'Confirmación'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {selectedService && (
            <div className="pt-6 md:pt-8 border-t border-navy-luxury/10 mt-4">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Seleccionado</span>
              <p className="luxury-font text-lg md:text-xl font-bold mt-1 leading-tight">{selectedService.name}</p>
              <p className="text-lg md:text-xl font-black mt-1">{formatPrice(selectedService.price)}</p>
            </div>
          )}
        </div>

        {/* Form Content */}
        <div className="flex-grow p-8 md:p-14 relative bg-white overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 text-navy-luxury/20 hover:text-navy-luxury transition-colors z-20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-8">
                <h3 className="text-2xl md:text-3xl luxury-font text-navy-luxury font-bold italic tracking-tight">Elija su tratamiento</h3>
                <div className="grid gap-2 md:gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {services.map(s => (
                    <button 
                      key={s.id} 
                      onClick={() => { setSelectedService(s); handleNext(); }}
                      className={`p-4 md:p-6 text-left border rounded-sm transition-all flex justify-between items-center group ${selectedService?.id === s.id ? 'border-gold-luxury bg-gold-luxury/5' : 'border-slate-100 hover:border-gold-luxury/30'}`}
                    >
                      <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-navy-luxury">{s.name}</span>
                      <svg className="w-4 h-4 text-gold-luxury opacity-0 group-hover:opacity-100 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-8">
                <h3 className="text-2xl md:text-3xl luxury-font text-navy-luxury font-bold italic tracking-tight">Fecha y Contacto</h3>
                <div className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <input type="date" required className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 text-xs outline-none focus:border-gold-luxury" onChange={e => setFormData({...formData, date: e.target.value})} />
                    <input type="time" required className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 text-xs outline-none focus:border-gold-luxury" onChange={e => setFormData({...formData, time: e.target.value})} />
                  </div>
                  <input type="text" placeholder="Nombre completo" className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 text-xs outline-none focus:border-gold-luxury" onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input type="tel" placeholder="Teléfono" className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 text-xs outline-none focus:border-gold-luxury" onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="flex gap-3 md:gap-4 pt-4">
                  <button onClick={handleBack} className="flex-1 py-3 md:py-4 border border-slate-100 text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Atrás</button>
                  <button onClick={handleNext} className="flex-[2] py-3 md:py-4 bg-navy-luxury text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-gold-luxury transition-all">Continuar</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-8">
                <h3 className="text-2xl md:text-3xl luxury-font text-navy-luxury font-bold italic tracking-tight">Resumen de Reserva</h3>
                <div className="bg-slate-50 p-4 md:p-6 rounded-sm space-y-3 md:space-y-4 border border-slate-100">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-[8px] md:text-[9px] font-black uppercase text-slate-400">Servicio</span>
                    <span className="text-[9px] md:text-[10px] font-bold text-navy-luxury">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-[8px] md:text-[9px] font-black uppercase text-slate-400">Fecha</span>
                    <span className="text-[9px] md:text-[10px] font-bold text-navy-luxury">{formData.date} — {formData.time}</span>
                  </div>
                  <div className="flex justify-between pt-2 md:pt-4">
                    <span className="text-[9px] md:text-[10px] font-black uppercase text-navy-luxury">Total Estimado</span>
                    <span className="text-lg md:text-xl font-black text-gold-luxury">{formatPrice(selectedService?.price || 0)}</span>
                  </div>
                </div>
                <button onClick={handleSubmit} className="w-full py-5 md:py-6 bg-gold-luxury text-navy-luxury text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-navy-luxury hover:text-white transition-all duration-700">
                  Confirmar y Reservar
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6 md:py-10 space-y-6 md:space-y-8">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white shadow-2xl">
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl md:text-4xl luxury-font text-navy-luxury font-bold">¡Cita Solicitada!</h3>
                <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed max-w-sm mx-auto uppercase tracking-widest">Su protocolo ha sido registrado. En breve el Dr. Acosta confirmará su espacio.</p>
                <button onClick={onClose} className="px-8 md:px-10 py-3 md:py-4 border border-navy-luxury text-navy-luxury text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-navy-luxury hover:text-white transition-all">Cerrar</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;
