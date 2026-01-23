
import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { Appointment, Service, SiteContent, GalleryItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const { 
    services, updateServices, 
    gallery, updateGallery, 
    appointments, updateAppointments,
    siteContent, updateSiteContent
  } = useClinic();
  
  const [activeTab, setActiveTab] = useState<'citas' | 'servicios' | 'galeria' | 'cms'>('citas');
  
  // Estados para formularios
  const [newService, setNewService] = useState<Partial<Service>>({ name: '', description: '', price: 0, featured: false });
  const [newGalleryItem, setNewGalleryItem] = useState<Partial<GalleryItem>>({ beforeUrl: '', afterUrl: '', description: '' });
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({ patientName: '', patientPhone: '', date: '', time: '', service: '', status: 'pending' });

  // --- CRUD Citas ---
  const handleAddAppointment = () => {
    if (newAppointment.patientName && newAppointment.date) {
      const app: Appointment = {
        id: Date.now().toString(),
        patientName: newAppointment.patientName as string,
        patientPhone: newAppointment.patientPhone || '',
        date: newAppointment.date as string,
        time: newAppointment.time || '00:00',
        service: newAppointment.service || 'General',
        status: (newAppointment.status as any) || 'pending'
      };
      updateAppointments([app, ...appointments]);
      setNewAppointment({ patientName: '', patientPhone: '', date: '', time: '', service: '', status: 'pending' });
    }
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    updateAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
  };

  const removeAppointment = (id: string) => {
    if(window.confirm("¿Seguro que desea eliminar esta cita?")) {
      updateAppointments(appointments.filter(a => a.id !== id));
    }
  };

  // --- CRUD Servicios ---
  const handleAddService = () => {
    if (newService.name && newService.price) {
      updateServices([...services, { ...newService, id: Date.now().toString() } as Service]);
      setNewService({ name: '', description: '', price: 0, featured: false });
    }
  };

  // --- CMS ---
  const handleSaveCMS = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateSiteContent({
      ...siteContent,
      heroTitle: formData.get('heroTitle') as string,
      heroSubtitle: formData.get('heroSubtitle') as string,
      heroCta: formData.get('heroCta') as string,
      contactTitle: formData.get('contactTitle') as string,
      contactSubtitle: formData.get('contactSubtitle') as string,
      smilesCount: Number(formData.get('smilesCount'))
    });
    alert("¡Plataforma actualizada!");
  };

  // Vista de Agenda Semanal (Simplificada)
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 lg:p-12 pb-32">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div>
            <h1 className="text-4xl font-bold text-navy-luxury luxury-font tracking-tight mb-2 italic">Panel Maestro</h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Consultorio Dr. Enrique Acosta — Chihuahua</p>
          </div>
          
          <div className="flex bg-white rounded-2xl shadow-sm border border-slate-200 p-1 w-full lg:w-auto overflow-x-auto gap-1">
            {(['citas', 'servicios', 'galeria', 'cms'] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === tab ? 'bg-navy-luxury text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'citas' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              {/* Nueva Cita Quick-Form */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm grid md:grid-cols-6 gap-4 items-end">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Paciente</label>
                  <input value={newAppointment.patientName} onChange={e => setNewAppointment({...newAppointment, patientName: e.target.value})} className="w-full bg-slate-50 p-3 rounded-xl border-none text-sm" placeholder="Nombre completo" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Fecha</label>
                  <input type="date" value={newAppointment.date} onChange={e => setNewAppointment({...newAppointment, date: e.target.value})} className="w-full bg-slate-50 p-3 rounded-xl border-none text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Hora</label>
                  <input type="time" value={newAppointment.time} onChange={e => setNewAppointment({...newAppointment, time: e.target.value})} className="w-full bg-slate-50 p-3 rounded-xl border-none text-sm" />
                </div>
                <button onClick={handleAddAppointment} className="md:col-span-2 bg-gold-luxury text-navy-luxury py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-navy-luxury hover:text-white transition-all">Registrar en Agenda</button>
              </div>

              {/* Grid de Agenda (Visualización Calendarizada) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {daysOfWeek.map((day, idx) => (
                  <div key={day} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col h-[500px]">
                    <div className="bg-slate-50 p-4 border-b border-slate-100 text-center">
                      <p className="text-[10px] font-black text-navy-luxury uppercase tracking-widest">{day}</p>
                    </div>
                    <div className="p-2 space-y-2 overflow-y-auto flex-grow">
                      {appointments
                        .filter(a => {
                          const date = new Date(a.date);
                          return (date.getDay() === (idx + 1) % 7);
                        })
                        .map(app => (
                          <div key={app.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl relative group">
                            <p className="font-bold text-navy-luxury text-[11px] truncate">{app.patientName}</p>
                            <p className="text-[9px] text-slate-400 font-bold">{app.time} — {app.service}</p>
                            <button onClick={() => removeAppointment(app.id)} className="absolute top-1 right-1 text-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'cms' && (
            <motion.form key="cms" onSubmit={handleSaveCMS} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm space-y-8 max-w-4xl">
              <h3 className="text-2xl font-black luxury-font text-navy-luxury italic border-b pb-4">Edición de Contenido</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-navy-luxury/40 border-b pb-2">Sección Hero</h4>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Título Principal Hero</label>
                      <input name="heroTitle" defaultValue={siteContent.heroTitle} className="w-full bg-slate-50 p-4 rounded-xl text-navy-luxury font-bold border-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Descripción Hero</label>
                      <textarea name="heroSubtitle" defaultValue={siteContent.heroSubtitle} rows={3} className="w-full bg-slate-50 p-4 rounded-xl text-navy-luxury border-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Texto Botón</label>
                      <input name="heroCta" defaultValue={siteContent.heroCta} className="w-full bg-slate-50 p-4 rounded-xl text-navy-luxury border-none" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-navy-luxury/40 border-b pb-2">Sección Contacto</h4>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Título de Contacto</label>
                      <input name="contactTitle" defaultValue={siteContent.contactTitle} className="w-full bg-slate-50 p-4 rounded-xl text-navy-luxury font-bold border-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subtítulo de Contacto</label>
                      <textarea name="contactSubtitle" defaultValue={siteContent.contactSubtitle} rows={3} className="w-full bg-slate-50 p-4 rounded-xl text-navy-luxury border-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gold-luxury">Contador de Sonrisas</label>
                      <input type="number" name="smilesCount" defaultValue={siteContent.smilesCount} className="w-full bg-gold-luxury/10 p-4 rounded-xl text-navy-luxury font-black text-2xl border-none" />
                    </div>
                  </div>
                </div>
                
                <button type="submit" className="w-full bg-navy-luxury text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-gold-luxury hover:text-navy-luxury transition-all">Guardar Cambios en la Web</button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
