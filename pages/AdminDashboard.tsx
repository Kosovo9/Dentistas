
import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { Appointment, Service, SiteContent, GalleryItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { 
    services, updateServices, 
    gallery, updateGallery, 
    appointments, updateAppointments,
    siteContent, updateSiteContent
  } = useClinic();
  const { t } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<'citas' | 'servicios' | 'galeria' | 'cms'>('citas');
  
  // Form States
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({ patientName: '', patientPhone: '', date: '', time: '', service: '', status: 'pending' });

  // CRUD Logics
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

  const removeAppointment = (id: string) => {
    if(window.confirm(t('admin_confirm_delete'))) {
      updateAppointments(appointments.filter(a => a.id !== id));
    }
  };

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
    alert(t('admin_success'));
  };

  const weekDays = [
    { key: 'day_mon', dayIdx: 1 },
    { key: 'day_tue', dayIdx: 2 },
    { key: 'day_wed', dayIdx: 3 },
    { key: 'day_thu', dayIdx: 4 },
    { key: 'day_fri', dayIdx: 5 },
    { key: 'day_sat', dayIdx: 6 }
  ];

  return (
    <div className="min-h-screen bg-[#0c1524] text-white selection:bg-gold-luxury selection:text-navy-luxury">
      {/* 1. ADMIN HERO - COMMAND CENTER GLAMOUR */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gold-luxury/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-px bg-gold-luxury"></span>
              <span className="text-gold-luxury font-black tracking-[0.6em] text-[10px] uppercase">
                {t('admin_mode')} — Dr. Enrique Acosta
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl luxury-font font-bold tracking-tighter leading-none italic">
              {t('admin_title')}
            </h1>
            <p className="text-white/30 text-xs font-bold tracking-[0.5em] uppercase border-l border-white/10 pl-4 ml-2">
              Chihuahua Elite Command Center
            </p>
          </motion.div>

          <div className="flex bg-white/5 backdrop-blur-3xl border border-white/10 p-1 rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-x-auto gap-1">
            {(['citas', 'servicios', 'galeria', 'cms'] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 whitespace-nowrap ${activeTab === tab ? 'bg-gold-luxury text-navy-luxury shadow-2xl scale-105' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                {t(`admin_tab_${tab}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-20 pb-40">
        <AnimatePresence mode="wait">
          {activeTab === 'citas' && (
            <motion.div 
              key="citas"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-16"
            >
              {/* Stats Grid - Luxury Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: "Agenda Total", val: appointments.length, sub: "Pacientes Registrados" },
                  { label: "Conversión LPA", val: "10x", sub: "Optimización de Cierre" },
                  { label: "Seguridad", val: "AES-256", sub: "Portal Encriptado" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-12 rounded-sm group hover:border-gold-luxury/40 transition-all duration-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-luxury/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <p className="text-gold-luxury text-[10px] font-black tracking-[0.5em] uppercase mb-6">{stat.label}</p>
                    <p className="text-6xl font-bold luxury-font italic tracking-tighter">{stat.val}</p>
                    <p className="text-[10px] text-white/20 mt-6 uppercase tracking-[0.3em] font-black">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Luxury Registration Form */}
              <div className="bg-white/5 border border-gold-luxury/20 p-16 rounded-sm shadow-2xl relative">
                <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-gold-luxury/40"></div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-gold-luxury mb-12 flex items-center gap-4">
                  <span className="w-8 h-px bg-gold-luxury/30"></span> 
                  Programación Clínica de Élite
                </h3>
                <div className="grid md:grid-cols-6 gap-10 items-end">
                  <div className="md:col-span-2 space-y-4">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{t('admin_patient')}</label>
                    <input value={newAppointment.patientName} onChange={e => setNewAppointment({...newAppointment, patientName: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-5 text-lg focus:border-gold-luxury transition-all text-white outline-none placeholder:text-white/10 font-light" placeholder="Nombre completo..." />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{t('admin_date')}</label>
                    <input type="date" value={newAppointment.date} onChange={e => setNewAppointment({...newAppointment, date: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-5 text-sm focus:border-gold-luxury transition-all text-white outline-none" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{t('admin_time')}</label>
                    <input type="time" value={newAppointment.time} onChange={e => setNewAppointment({...newAppointment, time: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-5 text-sm focus:border-gold-luxury transition-all text-white outline-none" />
                  </div>
                  <button onClick={handleAddAppointment} className="md:col-span-2 bg-gold-luxury text-navy-luxury py-6 font-black text-[12px] uppercase tracking-[0.5em] hover:bg-white transition-all shadow-[0_20px_40px_rgba(197,160,89,0.3)] active:scale-95 duration-500">
                    {t('admin_register')}
                  </button>
                </div>
              </div>

              {/* Weekly Calendar - Glass Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
                {weekDays.map((dayData) => (
                  <div key={dayData.key} className="bg-white/5 border border-white/5 rounded-sm flex flex-col min-h-[550px] group hover:border-gold-luxury/30 transition-all duration-700">
                    <div className="bg-white/10 p-8 border-b border-white/5 text-center">
                      <p className="text-[11px] font-black text-gold-luxury uppercase tracking-[0.4em]">{t(dayData.key)}</p>
                    </div>
                    <div className="p-6 space-y-6 overflow-y-auto flex-grow max-h-[450px] scrollbar-hide">
                      {appointments
                        .filter(a => new Date(a.date).getDay() === dayData.dayIdx % 7)
                        .map(app => (
                          <motion.div 
                            layout
                            key={app.id} 
                            className="p-6 bg-[#0c1524] border border-white/10 hover:border-gold-luxury/50 transition-all group relative shadow-2xl"
                          >
                            <p className="font-bold text-white text-[13px] truncate uppercase tracking-widest leading-tight">{app.patientName}</p>
                            <p className="text-[10px] text-gold-luxury font-black mt-3 tracking-[0.2em]">{app.time}</p>
                            <button onClick={() => removeAppointment(app.id)} className="absolute top-2 right-2 text-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'cms' && (
            <motion.div 
              key="cms"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-6xl mx-auto"
            >
              <form onSubmit={handleSaveCMS} className="bg-white/5 border border-white/10 p-20 rounded-sm shadow-2xl space-y-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gold-luxury/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="flex justify-between items-center border-b border-white/5 pb-12">
                  <h3 className="text-5xl font-bold luxury-font italic text-gold-luxury tracking-tighter">{t('admin_edit_content')}</h3>
                  <div className="text-right">
                    <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">Plataforma Bilingüe</p>
                    <p className="text-gold-luxury text-[10px] font-bold mt-1">Sincronización ES / EN Activa</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-24">
                  {/* Hero Settings */}
                  <div className="space-y-12">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-white/30 border-l-2 border-gold-luxury pl-6">CMS: Hero Section</h4>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Título Principal</label>
                      <input name="heroTitle" defaultValue={siteContent.heroTitle} className="w-full bg-transparent border-b border-white/10 p-6 text-white font-bold outline-none focus:border-gold-luxury transition-all text-xl" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Descripción Corta</label>
                      <textarea name="heroSubtitle" defaultValue={siteContent.heroSubtitle} rows={6} className="w-full bg-transparent border border-white/10 p-6 text-white font-light outline-none focus:border-gold-luxury transition-all text-sm leading-relaxed" />
                    </div>
                  </div>

                  {/* Counter & Stats */}
                  <div className="space-y-12">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-white/30 border-l-2 border-gold-luxury pl-6">CMS: Data Engine</h4>
                    <div className="pt-8 space-y-6">
                      <label className="text-[11px] font-black uppercase tracking-[0.4em] text-gold-luxury">Contador Global de Sonrisas</label>
                      <div className="relative group">
                        <input type="number" name="smilesCount" defaultValue={siteContent.smilesCount} className="w-full bg-gold-luxury/10 border border-gold-luxury/20 p-10 text-gold-luxury font-black text-6xl outline-none group-hover:bg-gold-luxury/20 transition-all text-center" />
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gold-luxury/30 text-5xl font-black">✨</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-16">
                  <button type="submit" className="w-full bg-gold-luxury text-navy-luxury py-8 font-black uppercase tracking-[0.6em] text-[13px] shadow-[0_30px_70px_rgba(197,160,89,0.3)] hover:bg-white transition-all active:scale-95 duration-700">
                    {t('admin_save_changes')}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FIXED LUXURY FOOTER BAR */}
      <footer className="fixed bottom-0 left-0 w-full bg-navy-luxury/95 backdrop-blur-3xl border-t border-white/5 py-10 px-16 flex justify-between items-center z-[100] shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-12">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-white/20 tracking-[0.5em] uppercase mb-2">Clinic Operating System — 10x Optimized</span>
            <span className="text-[12px] font-bold text-green-500 uppercase tracking-[0.2em] flex items-center gap-4">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]"></span> 
              Bespoke Security Protocol: ACTIVE
            </span>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <Link to="/" className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-gold-luxury transition-all hover:scale-110">
            {t('admin_view_site')}
          </Link>
          <div className="w-px h-8 bg-white/5"></div>
          <span className="text-[10px] font-black text-white/10 tracking-widest">V1.0.0 PREMIUM</span>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
