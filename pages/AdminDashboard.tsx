
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
    <div className="min-h-screen bg-navy-luxury text-white">
      {/* 1. ADMIN HERO - COMMAND CENTER */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-luxury/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
          <div className="space-y-4">
            <span className="text-gold-luxury font-black tracking-[0.5em] text-[10px] uppercase block">
              {t('admin_mode')} — Dr. Enrique Acosta
            </span>
            <h1 className="text-5xl md:text-7xl luxury-font font-bold tracking-tighter leading-none italic">
              {t('admin_title')}
            </h1>
            <p className="text-white/40 text-sm font-light tracking-widest uppercase">Chihuahua Medical Headquarters</p>
          </div>

          <div className="flex bg-white/5 backdrop-blur-xl border border-white/10 p-1.5 rounded-sm shadow-2xl overflow-x-auto gap-1">
            {(['citas', 'servicios', 'galeria', 'cms'] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap ${activeTab === tab ? 'bg-gold-luxury text-navy-luxury shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                {t(`admin_tab_${tab}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {activeTab === 'citas' && (
            <motion.div 
              key="citas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-10 rounded-sm group hover:border-gold-luxury/40 transition-all">
                  <p className="text-gold-luxury text-[10px] font-black tracking-widest uppercase mb-4">Agenda Total</p>
                  <p className="text-5xl font-bold luxury-font italic">{appointments.length}</p>
                  <p className="text-[10px] text-white/20 mt-4 uppercase tracking-widest font-black">Pacientes Programados</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-10 rounded-sm group hover:border-gold-luxury/40 transition-all">
                  <p className="text-gold-luxury text-[10px] font-black tracking-widest uppercase mb-4">Conversión</p>
                  <p className="text-5xl font-bold luxury-font italic">10x</p>
                  <p className="text-[10px] text-white/20 mt-4 uppercase tracking-widest font-black">Optimización LPA</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-10 rounded-sm group hover:border-gold-luxury/40 transition-all">
                  <p className="text-gold-luxury text-[10px] font-black tracking-widest uppercase mb-4">Estatus Sistema</p>
                  <p className="text-2xl font-bold luxury-font italic text-green-500 uppercase tracking-tighter">Encriptado</p>
                  <p className="text-[10px] text-white/20 mt-4 uppercase tracking-widest font-black">AES-256 Protocol</p>
                </div>
              </div>

              {/* Registro Rápido */}
              <div className="bg-white/5 border border-gold-luxury/20 p-12 rounded-sm shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-luxury/5 blur-3xl rounded-full"></div>
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gold-luxury mb-10 border-b border-white/5 pb-4">Nueva Cita — Registro Rápido</h3>
                <div className="grid md:grid-cols-6 gap-8 items-end">
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t('admin_patient')}</label>
                    <input value={newAppointment.patientName} onChange={e => setNewAppointment({...newAppointment, patientName: e.target.value})} className="w-full bg-navy-luxury border border-white/10 p-5 text-sm focus:border-gold-luxury transition-all text-white outline-none" placeholder="Nombre completo..." />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t('admin_date')}</label>
                    <input type="date" value={newAppointment.date} onChange={e => setNewAppointment({...newAppointment, date: e.target.value})} className="w-full bg-navy-luxury border border-white/10 p-5 text-sm focus:border-gold-luxury transition-all text-white outline-none" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t('admin_time')}</label>
                    <input type="time" value={newAppointment.time} onChange={e => setNewAppointment({...newAppointment, time: e.target.value})} className="w-full bg-navy-luxury border border-white/10 p-5 text-sm focus:border-gold-luxury transition-all text-white outline-none" />
                  </div>
                  <button onClick={handleAddAppointment} className="md:col-span-2 bg-gold-luxury text-navy-luxury py-5 font-black text-[11px] uppercase tracking-[0.4em] hover:bg-white transition-all shadow-xl active:scale-95 duration-500">
                    {t('admin_register')}
                  </button>
                </div>
              </div>

              {/* Agenda Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {weekDays.map((dayData) => (
                  <div key={dayData.key} className="bg-white/5 border border-white/5 rounded-sm flex flex-col min-h-[500px] hover:border-gold-luxury/20 transition-all">
                    <div className="bg-white/10 p-6 border-b border-white/5 text-center">
                      <p className="text-[10px] font-black text-gold-luxury uppercase tracking-[0.3em]">{t(dayData.key)}</p>
                    </div>
                    <div className="p-4 space-y-4 overflow-y-auto flex-grow max-h-[450px]">
                      {appointments
                        .filter(a => new Date(a.date).getDay() === dayData.dayIdx % 7)
                        .map(app => (
                          <div key={app.id} className="p-5 bg-navy-luxury border border-white/10 hover:border-gold-luxury/40 transition-all group relative shadow-lg">
                            <p className="font-bold text-white text-[12px] truncate uppercase tracking-[0.1em]">{app.patientName}</p>
                            <p className="text-[10px] text-gold-luxury/60 font-black mt-2">{app.time}</p>
                            <button onClick={() => removeAppointment(app.id)} className="absolute top-2 right-2 text-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
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
            <motion.div 
              key="cms"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto"
            >
              <form onSubmit={handleSaveCMS} className="bg-white/5 border border-white/10 p-16 rounded-sm shadow-2xl space-y-16">
                <div className="flex justify-between items-center border-b border-white/10 pb-10">
                  <h3 className="text-4xl font-bold luxury-font italic text-gold-luxury">{t('admin_edit_content')}</h3>
                  <div className="w-20 h-[1px] bg-gold-luxury/30"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-20">
                  {/* Hero Section */}
                  <div className="space-y-10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 border-l-2 border-gold-luxury pl-4">{t('admin_hero_section')}</h4>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">{t('admin_hero_title')}</label>
                      <input name="heroTitle" defaultValue={siteContent.heroTitle} className="w-full bg-navy-luxury border border-white/10 p-5 text-white font-bold outline-none focus:border-gold-luxury transition-all text-lg" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">{t('admin_hero_subtitle')}</label>
                      <textarea name="heroSubtitle" defaultValue={siteContent.heroSubtitle} rows={5} className="w-full bg-navy-luxury border border-white/10 p-5 text-white font-light outline-none focus:border-gold-luxury transition-all text-sm leading-relaxed" />
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="space-y-10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 border-l-2 border-gold-luxury pl-4">{t('admin_contact_section')}</h4>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">{t('admin_contact_title')}</label>
                      <input name="contactTitle" defaultValue={siteContent.contactTitle} className="w-full bg-navy-luxury border border-white/10 p-5 text-white font-bold outline-none focus:border-gold-luxury transition-all text-lg" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">{t('admin_contact_subtitle')}</label>
                      <textarea name="contactSubtitle" defaultValue={siteContent.contactSubtitle} rows={5} className="w-full bg-navy-luxury border border-white/10 p-5 text-white font-light outline-none focus:border-gold-luxury transition-all text-sm leading-relaxed" />
                    </div>
                    <div className="pt-6 space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gold-luxury">{t('admin_smiles_count')}</label>
                      <div className="relative">
                        <input type="number" name="smilesCount" defaultValue={siteContent.smilesCount} className="w-full bg-gold-luxury/10 border border-gold-luxury/40 p-8 text-gold-luxury font-black text-5xl outline-none" />
                        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-gold-luxury/20 text-5xl font-black">✨</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-12">
                  <button type="submit" className="w-full bg-gold-luxury text-navy-luxury py-7 font-black uppercase tracking-[0.5em] text-[12px] shadow-[0_20px_50px_rgba(197,160,89,0.3)] hover:bg-white transition-all active:scale-95 duration-1000">
                    {t('admin_save_changes')}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER BAR FOR ADMIN */}
      <footer className="fixed bottom-0 left-0 w-full bg-navy-luxury/95 backdrop-blur-3xl border-t border-white/5 py-8 px-12 flex justify-between items-center z-[100] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase mb-1">Clinic Operating System</span>
            <span className="text-[11px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span> Secure Connection: Active
            </span>
          </div>
        </div>
        <Link to="/" className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-gold-luxury transition-all hover:scale-105">
          {t('admin_view_site')}
        </Link>
      </footer>
    </div>
  );
};

export default AdminDashboard;
