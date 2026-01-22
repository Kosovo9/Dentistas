
import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { Appointment, Service } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const { 
    services, updateServices, 
    gallery, updateGallery, 
    appointments, updateAppointments 
  } = useClinic();
  
  const [activeTab, setActiveTab] = useState<'citas' | 'servicios' | 'galeria'>('citas');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [editingService, setEditingService] = useState<Service | null>(null);
  
  // Estado para el formulario de citas
  const [isAddingApp, setIsAddingApp] = useState(false);
  const [newApp, setNewApp] = useState<Partial<Appointment>>({
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    status: 'pending'
  });

  // Calendario Helpers
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApp.patientName || !newApp.patientPhone || !newApp.date || !newApp.time || !newApp.service) return;
    
    const appointment: Appointment = {
      id: Date.now().toString(),
      patientName: newApp.patientName,
      patientPhone: newApp.patientPhone,
      date: newApp.date,
      time: newApp.time,
      service: newApp.service,
      status: newApp.status as any || 'pending'
    };
    
    updateAppointments([appointment, ...appointments]);
    setIsAddingApp(false);
    setNewApp({
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      status: 'pending'
    });
  };

  const deleteAppointment = (id: string) => {
    if (confirm("¿Seguro que desea eliminar esta cita?")) {
      updateAppointments(appointments.filter(a => a.id !== id));
    }
  };

  const updateAppointmentStatus = (id: string, status: 'pending' | 'confirmed' | 'completed') => {
    updateAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
  };

  const getAppointmentsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return appointments.filter(a => a.date === dateStr);
  };

  const upcomingAppointments = [...appointments]
    .filter(a => new Date(a.date) >= new Date(new Date().setHours(0,0,0,0)))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 8);

  // Handlers para Servicios y Galería
  const handleSaveService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const price = Number(formData.get('price'));
    const description = formData.get('description') as string;
    const featured = formData.get('featured') === 'on';

    if (editingService) {
      updateServices(services.map(s => s.id === editingService.id ? { ...s, name, price, description, featured } : s));
      setEditingService(null);
    } else {
      const newS: Service = { id: Date.now().toString(), name, price, description, featured };
      updateServices([...services, newS]);
    }
    e.currentTarget.reset();
  };

  const toggleFeaturedService = (id: string) => {
    updateServices(services.map(s => s.id === id ? { ...s, featured: !s.featured } : s));
  };

  const deleteService = (id: string) => {
    if (confirm("¿Seguro que desea eliminar este servicio?")) {
      updateServices(services.filter(s => s.id !== id));
      if (editingService?.id === id) setEditingService(null);
    }
  };

  const addGalleryItem = () => {
    const beforeUrl = prompt("URL de imagen 'Antes':");
    if (!beforeUrl) return;
    const afterUrl = prompt("URL de imagen 'Después':");
    if (!afterUrl) return;
    const description = prompt("Descripción del caso:");
    if (!description) return;
    updateGallery([{ id: Date.now().toString(), beforeUrl, afterUrl, description }, ...gallery]);
  };

  const deleteGalleryItem = (id: string) => {
    if (confirm("¿Seguro que desea eliminar este caso?")) {
      updateGallery(gallery.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 lg:p-12">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-2.5 h-10 bg-gold-luxury rounded-full shadow-lg shadow-gold-luxury/20"></div>
              <h1 className="text-4xl font-bold text-navy-luxury luxury-font tracking-tight">Centro de Gestión</h1>
            </div>
            <p className="text-slate-400 font-bold ml-6 uppercase tracking-[0.3em] text-[10px] opacity-70">Dr. César Acosta — Dashboard Ejecutivo</p>
          </motion.div>
          
          <div className="flex bg-white rounded-2xl shadow-sm border border-slate-200 p-2 w-full lg:w-auto overflow-x-auto gap-1">
            {(['citas', 'servicios', 'galeria'] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => { setActiveTab(tab); setEditingService(null); setIsAddingApp(false); }}
                className={`flex-1 lg:flex-none px-12 py-3.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${activeTab === tab ? 'bg-navy-luxury text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:text-navy-luxury hover:bg-slate-50'}`}
              >
                {tab === 'citas' ? 'Agenda' : tab === 'servicios' ? 'Servicios' : 'Galería'}
              </button>
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'citas' && (
            <motion.div 
              key="citas" 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 xl:grid-cols-12 gap-10"
            >
              {/* Columna Principal: Calendario/Lista */}
              <div className="xl:col-span-8 space-y-10">
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-8 mb-10">
                    <div className="flex items-center gap-6">
                      <button onClick={prevMonth} className="p-3 hover:bg-slate-100 rounded-full transition-all active:scale-90 border border-slate-100 shadow-sm">
                        <svg className="w-5 h-5 text-navy-luxury" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                      </button>
                      <h2 className="text-2xl font-bold text-navy-luxury luxury-font min-w-[200px] text-center tracking-tight">
                        {monthNames[currentMonth]} <span className="text-gold-luxury opacity-60 font-light">{currentYear}</span>
                      </h2>
                      <button onClick={nextMonth} className="p-3 hover:bg-slate-100 rounded-full transition-all active:scale-90 border border-slate-100 shadow-sm">
                        <svg className="w-5 h-5 text-navy-luxury" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    </div>

                    <div className="flex bg-slate-100/80 rounded-xl p-1.5 border border-slate-200">
                      <button 
                        onClick={() => setViewMode('calendar')}
                        className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-white text-navy-luxury shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Vista Mes
                      </button>
                      <button 
                        onClick={() => setViewMode('list')}
                        className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-navy-luxury shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Lista Total
                      </button>
                    </div>
                  </div>

                  {viewMode === 'calendar' ? (
                    <div className="grid grid-cols-7 gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                      {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
                        <div key={d} className="py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-navy-luxury/30">{d}</div>
                      ))}
                      {Array.from({ length: firstDayOfMonth(currentMonth, currentYear) }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-32 rounded-xl bg-transparent"></div>
                      ))}
                      {Array.from({ length: daysInMonth(currentMonth, currentYear) }).map((_, i) => {
                        const day = i + 1;
                        const dayApps = getAppointmentsForDay(day);
                        const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                        
                        return (
                          <div 
                            key={day} 
                            onClick={() => {
                              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                              setNewApp(prev => ({ ...prev, date: dateStr }));
                              setIsAddingApp(true);
                            }}
                            className={`h-36 p-3 rounded-xl border border-slate-100 bg-white transition-all hover:border-gold-luxury/40 group relative overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:translate-y-[-4px] ${isToday ? 'ring-2 ring-gold-luxury ring-offset-2' : ''}`}
                          >
                            <span className={`text-sm font-black transition-colors ${isToday ? 'text-gold-luxury' : 'text-navy-luxury/40 group-hover:text-gold-luxury'}`}>{day}</span>
                            
                            <div className="mt-2 space-y-1.5 overflow-hidden">
                              {dayApps.slice(0, 3).map(app => (
                                <div key={app.id} className={`text-[8px] p-1.5 rounded-lg border-l-2 truncate font-bold uppercase tracking-widest ${app.status === 'confirmed' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-slate-50 border-gold-luxury text-navy-luxury/60'}`}>
                                  {app.time} · {app.patientName}
                                </div>
                              ))}
                              {dayApps.length > 3 && (
                                <div className="text-[7px] text-center font-black text-slate-300 uppercase mt-1">+{dayApps.length - 3} más</div>
                              )}
                            </div>
                            
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gold-luxury scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {appointments.length === 0 ? (
                        <div className="text-center py-32 space-y-6">
                          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                          </div>
                          <p className="text-slate-300 font-bold uppercase tracking-[0.3em] text-xs italic">No hay registros históricos de citas.</p>
                        </div>
                      ) : (
                        appointments.map(app => (
                          <motion.div 
                            layout
                            key={app.id} 
                            className="flex flex-col md:flex-row items-center justify-between p-8 bg-white rounded-3xl border border-slate-100 hover:shadow-2xl transition-all group gap-8"
                          >
                            <div className="flex items-center gap-8 w-full">
                              <div className="bg-navy-luxury/5 w-16 h-16 rounded-2xl shadow-inner flex flex-col items-center justify-center border border-navy-luxury/5 shrink-0">
                                <span className="text-[10px] font-black text-gold-luxury uppercase tracking-tighter leading-none">{monthNames[parseInt(app.date.split('-')[1]) - 1].slice(0, 3)}</span>
                                <span className="text-2xl font-black text-navy-luxury tracking-tighter leading-none mt-1">{app.date.split('-')[2]}</span>
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-black text-navy-luxury text-xl tracking-tight leading-none mb-2">{app.patientName}</h4>
                                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black flex items-center gap-2">
                                  <span className="text-gold-luxury">{app.time}</span>
                                  <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                  <span>{app.service}</span>
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                               <a 
                                  href={`https://wa.me/52${app.patientPhone}`} 
                                  target="_blank" 
                                  className="p-3.5 text-green-600 bg-green-50 border border-green-100 rounded-xl transition-all hover:scale-110 active:scale-90 shadow-sm"
                                  title="Contactar WhatsApp"
                               >
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.455 1.083 3.44l-1.037 3.803 3.967-1.037a5.747 5.747 0 0 0 2.754.701c3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.39 8.161c-.146.411-.852.753-1.183.8-.331.047-.753.116-2.126-.457-1.745-.733-2.871-2.515-2.958-2.631-.087-.116-.713-.948-.713-1.815 0-.867.457-1.295.62-1.468.163-.174.354-.216.471-.216.116 0 .231 0 .331.006.107.006.246-.04.385.293.146.353.5.122.569.261s.116.273.058.388c-.058.116-.116.19-.174.261-.058.071-.122.146-.071.231.052.087.231.382.494.618.341.306.63.402.723.446.092.043.146.037.202-.023.058-.06.246-.286.312-.382.067-.097.133-.081.225-.047s.583.275.684.326c.101.051.168.076.19.116.022.04.022.231-.073.442z"/></svg>
                               </a>
                               <select 
                                  value={app.status}
                                  onChange={(e) => updateAppointmentStatus(app.id, e.target.value as any)}
                                  className={`text-[10px] px-6 py-3 rounded-xl font-black uppercase tracking-widest border-none cursor-pointer transition-all shadow-sm ${
                                    app.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                                    app.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                  }`}
                                >
                                  <option value="pending">Pendiente</option>
                                  <option value="confirmed">Confirmado</option>
                                  <option value="completed">Finalizada</option>
                                </select>
                                <button onClick={() => deleteAppointment(app.id)} className="text-slate-300 hover:text-red-500 transition-all p-3 hover:bg-red-50 rounded-xl active:scale-90">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Columna Lateral: Nueva Cita y Próximas */}
              <div className="xl:col-span-4 space-y-10">
                <AnimatePresence>
                  {isAddingApp ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white p-10 rounded-3xl shadow-2xl border-t-4 border-gold-luxury"
                    >
                      <h3 className="text-2xl font-black luxury-font text-navy-luxury mb-8">Nueva <span className="text-gold-luxury">Cita</span></h3>
                      <form onSubmit={handleSaveAppointment} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nombre del Paciente</label>
                          <input 
                            required 
                            type="text" 
                            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl focus:border-gold-luxury outline-none transition-all font-bold text-navy-luxury"
                            value={newApp.patientName || ''}
                            onChange={e => setNewApp(prev => ({ ...prev, patientName: e.target.value }))}
                            placeholder="Ej. Juan Pérez"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Teléfono (10 dígitos)</label>
                          <input 
                            required 
                            type="tel" 
                            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl focus:border-gold-luxury outline-none transition-all font-bold text-navy-luxury"
                            value={newApp.patientPhone || ''}
                            onChange={e => setNewApp(prev => ({ ...prev, patientPhone: e.target.value }))}
                            placeholder="6141234567"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fecha</label>
                            <input 
                              required 
                              type="date" 
                              className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl focus:border-gold-luxury outline-none transition-all font-bold text-navy-luxury"
                              value={newApp.date || ''}
                              onChange={e => setNewApp(prev => ({ ...prev, date: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hora</label>
                            <input 
                              required 
                              type="time" 
                              className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl focus:border-gold-luxury outline-none transition-all font-bold text-navy-luxury"
                              value={newApp.time || ''}
                              onChange={e => setNewApp(prev => ({ ...prev, time: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tratamiento</label>
                          <select 
                            required 
                            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl focus:border-gold-luxury outline-none transition-all font-bold text-navy-luxury appearance-none"
                            value={newApp.service || ''}
                            onChange={e => setNewApp(prev => ({ ...prev, service: e.target.value }))}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="Consulta de Valoración">Consulta de Valoración</option>
                            {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                          </select>
                        </div>
                        <div className="flex gap-4 pt-4">
                          <button 
                            type="submit" 
                            className="flex-grow bg-navy-luxury text-white py-5 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-xl hover:bg-gold-luxury transition-all active:scale-95"
                          >
                            Agendar Cita
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setIsAddingApp(false)}
                            className="px-6 border border-slate-200 text-slate-400 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50"
                          >
                            ×
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-navy-luxury p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden group border-b-8 border-gold-luxury"
                    >
                      {/* Efectos de fondo */}
                      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-luxury opacity-10 blur-[80px] rounded-full group-hover:opacity-20 transition-opacity"></div>
                      
                      <div className="relative z-10">
                        <h3 className="text-2xl font-black luxury-font mb-8">Agenda <span className="text-gold-luxury">Inminente</span></h3>
                        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                          {upcomingAppointments.length === 0 ? (
                            <div className="py-10 text-center space-y-4">
                              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] italic">No hay citas en los próximos días.</p>
                              <button onClick={() => setIsAddingApp(true)} className="text-gold-luxury text-[9px] font-black uppercase border border-gold-luxury/30 px-6 py-2 rounded-full hover:bg-gold-luxury hover:text-navy-luxury transition-all">Abrir Agenda</button>
                            </div>
                          ) : (
                            upcomingAppointments.map(app => (
                              <div key={app.id} className="flex gap-6 items-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group/item">
                                <div className="text-center min-w-[60px] border-r border-white/10 pr-6">
                                  <span className="block text-gold-luxury font-black text-lg leading-none">{app.time}</span>
                                  <span className="block text-[8px] uppercase font-black text-white/30 mt-1 tracking-widest">{new Date(app.date).toLocaleDateString('es-MX', { weekday: 'short' })}</span>
                                </div>
                                <div className="flex-grow">
                                  <span className="block text-sm font-black group-hover/item:text-gold-luxury transition-colors">{app.patientName}</span>
                                  <span className="block text-[9px] uppercase tracking-widest text-white/40 mt-1 line-clamp-1">{app.service}</span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                        <button 
                          onClick={() => setIsAddingApp(true)} 
                          className="w-full mt-10 bg-gold-luxury text-navy-luxury py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                          Agendar Nuevo Paciente
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Resumen de Métricas Rápidas */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
                    <span className="text-slate-400 font-black uppercase text-[8px] tracking-widest block mb-1">Citas Hoy</span>
                    <span className="text-3xl font-black text-navy-luxury">{getAppointmentsForDay(today.getDate()).length}</span>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
                    <span className="text-slate-400 font-black uppercase text-[8px] tracking-widest block mb-1">Pendientes</span>
                    <span className="text-3xl font-black text-gold-luxury">{appointments.filter(a => a.status === 'pending').length}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'servicios' && (
            <motion.div key="servicios" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <div className="bg-white p-12 rounded-3xl shadow-2xl sticky top-24 border border-slate-100">
                  <h3 className="text-3xl font-black text-navy-luxury luxury-font mb-10">{editingService ? 'Editar' : 'Nuevo'} <span className="text-gold-luxury">Servicio</span></h3>
                  <form onSubmit={handleSaveService} className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nombre del Tratamiento</label>
                      <input name="name" placeholder="Ej. Diseño de Sonrisa" defaultValue={editingService?.name || ''} className="w-full bg-slate-50 border-slate-100 p-5 rounded-2xl focus:border-gold-luxury outline-none font-bold text-navy-luxury" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Precio Base (MXN)</label>
                      <input name="price" type="number" placeholder="0.00" defaultValue={editingService?.price || ''} className="w-full bg-slate-50 border-slate-100 p-5 rounded-2xl focus:border-gold-luxury outline-none font-bold text-navy-luxury" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Breve Descripción</label>
                      <textarea name="description" rows={4} placeholder="Detalles del tratamiento..." defaultValue={editingService?.description || ''} className="w-full bg-slate-50 border-slate-100 p-5 rounded-2xl focus:border-gold-luxury outline-none font-bold text-navy-luxury leading-relaxed" required />
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <input type="checkbox" name="featured" id="featured" defaultChecked={editingService?.featured} className="w-5 h-5 accent-gold-luxury rounded-lg" />
                      <label htmlFor="featured" className="text-[10px] font-black uppercase tracking-[0.2em] text-navy-luxury cursor-pointer">Marcar como Recomendado</label>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button type="submit" className="flex-1 bg-navy-luxury text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-gold-luxury transition-all shadow-xl">Guardar</button>
                      {editingService && <button type="button" onClick={() => setEditingService(null)} className="px-8 border border-slate-200 text-slate-400 text-[10px] font-black uppercase rounded-2xl">Cancelar</button>}
                    </div>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                {services.map(service => (
                  <motion.div layout key={service.id} className="bg-white p-10 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between items-center group border-l-[12px] border-gold-luxury/10 transition-all hover:shadow-2xl hover:border-gold-luxury gap-8">
                    <div>
                      <h4 className="font-black text-navy-luxury text-2xl tracking-tight mb-2">{service.name}</h4>
                      <p className="text-gold-luxury font-black text-lg tracking-tighter">${service.price.toLocaleString('es-MX')} MXN</p>
                      <p className="text-slate-400 text-xs font-medium mt-4 leading-relaxed max-w-lg italic">{service.description}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                      <button onClick={() => toggleFeaturedService(service.id)} className={`text-[9px] uppercase font-black tracking-widest px-6 py-3 rounded-xl border transition-all ${service.featured ? 'bg-gold-luxury text-navy-luxury border-gold-luxury shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-gold-luxury'}`}>
                        {service.featured ? 'Destacado' : 'Normal'}
                      </button>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingService(service)} className="p-4 bg-slate-50 text-navy-luxury rounded-xl hover:bg-navy-luxury hover:text-white transition-all shadow-sm">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button onClick={() => deleteService(service.id)} className="p-4 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'galeria' && (
            <motion.div key="galeria" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
              <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-12 rounded-3xl shadow-sm border border-slate-100 gap-8">
                <div>
                  <h3 className="text-3xl font-black text-navy-luxury luxury-font mb-2">Galería de <span className="text-gold-luxury">Resultados</span></h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Evidencia visual de transformaciones reales</p>
                </div>
                <button onClick={addGalleryItem} className="bg-gold-luxury text-navy-luxury px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:scale-105 transition-all active:scale-95 flex items-center gap-3">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                   Nuevo Caso de Éxito
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {gallery.map(item => (
                  <motion.div layout key={item.id} className="bg-white p-6 rounded-3xl shadow-xl group border border-slate-50 relative overflow-hidden transition-all hover:translate-y-[-10px]">
                    <div className="flex gap-3 mb-8 relative">
                      <div className="relative w-1/2">
                        <img src={item.beforeUrl} className="aspect-[4/5] object-cover rounded-2xl shadow-inner brightness-75 group-hover:brightness-50 transition-all duration-700" alt="Antes" />
                        <span className="absolute bottom-4 left-4 text-[8px] font-black uppercase bg-black/60 backdrop-blur text-white px-3 py-1.5 rounded-full border border-white/10 tracking-widest">Antes</span>
                      </div>
                      <div className="relative w-1/2">
                        <img src={item.afterUrl} className="aspect-[4/5] object-cover rounded-2xl shadow-lg brightness-100 transition-all duration-700" alt="Después" />
                        <span className="absolute bottom-4 left-4 text-[8px] font-black uppercase bg-gold-luxury text-navy-luxury px-3 py-1.5 rounded-full shadow-xl tracking-widest">Después</span>
                      </div>
                    </div>
                    <div className="p-4 border-t border-slate-50">
                       <p className="text-sm text-navy-luxury/80 mb-8 font-bold italic tracking-tight leading-relaxed line-clamp-2">"{item.description}"</p>
                       <button onClick={() => deleteGalleryItem(item.id)} className="w-full py-4 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-transparent hover:border-red-100">
                          Eliminar Caso
                       </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
