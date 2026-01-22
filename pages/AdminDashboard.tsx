
import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { Appointment, Service, GalleryItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { 
    services, updateServices, 
    gallery, updateGallery, 
    appointments, updateAppointments 
  } = useClinic();
  
  const [activeTab, setActiveTab] = useState<'citas' | 'servicios' | 'galeria'>('citas');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [editingService, setEditingService] = useState<Service | null>(null);

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

  const addAppointment = () => {
    const name = prompt("Nombre del paciente:");
    if (!name) return;
    const phone = prompt("Teléfono (10 dígitos):");
    const date = prompt("Fecha (AAAA-MM-DD):", new Date().toISOString().split('T')[0]);
    const time = prompt("Hora (HH:MM):", "10:00");
    if (!date) return;
    
    const newApp: Appointment = {
      id: Date.now().toString(),
      patientName: name,
      patientPhone: phone || '',
      date: date,
      time: time || '10:00',
      service: "Consulta de Valoración",
      status: 'pending'
    };
    updateAppointments([newApp, ...appointments]);
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
    .slice(0, 5);

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
      const newService: Service = { id: Date.now().toString(), name, price, description, featured };
      updateServices([...services, newService]);
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
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-8 bg-gold-luxury rounded-full"></div>
              <h1 className="text-3xl font-bold text-navy-luxury luxury-font tracking-tight">Panel de Control</h1>
            </div>
            <p className="text-slate-400 font-medium ml-5 uppercase tracking-[0.2em] text-[10px]">Gestión de Élite — Dr. César Acosta</p>
          </motion.div>
          
          <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 p-1.5 w-full lg:w-auto overflow-x-auto">
            {(['citas', 'servicios', 'galeria'] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => { setActiveTab(tab); setEditingService(null); }}
                className={`flex-1 lg:flex-none px-10 py-3 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === tab ? 'bg-navy-luxury text-white shadow-lg' : 'text-slate-400 hover:text-navy-luxury'}`}
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
              className="grid grid-cols-1 xl:grid-cols-12 gap-8"
            >
              <div className="xl:col-span-8 space-y-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
                    <div className="flex items-center gap-4">
                      <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-full transition-colors active:scale-95">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                      </button>
                      <h2 className="text-xl font-bold text-navy-luxury luxury-font min-w-[150px] text-center">
                        {monthNames[currentMonth]} {currentYear}
                      </h2>
                      <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-full transition-colors active:scale-95">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    </div>

                    <div className="flex bg-slate-100 rounded-lg p-1">
                      <button 
                        onClick={() => setViewMode('calendar')}
                        className={`px-4 py-2 text-[9px] uppercase font-bold tracking-widest rounded-md transition-all ${viewMode === 'calendar' ? 'bg-white text-navy-luxury shadow-sm' : 'text-slate-400'}`}
                      >
                        Calendario
                      </button>
                      <button 
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-2 text-[9px] uppercase font-bold tracking-widest rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-navy-luxury shadow-sm' : 'text-slate-400'}`}
                      >
                        Lista
                      </button>
                    </div>
                  </div>

                  {viewMode === 'calendar' ? (
                    <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-lg overflow-hidden">
                      {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
                        <div key={d} className="bg-slate-50 p-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">{d}</div>
                      ))}
                      {Array.from({ length: firstDayOfMonth(currentMonth, currentYear) }).map((_, i) => (
                        <div key={`empty-${i}`} className="bg-white h-32 opacity-50"></div>
                      ))}
                      {Array.from({ length: daysInMonth(currentMonth, currentYear) }).map((_, i) => {
                        const day = i + 1;
                        const dayApps = getAppointmentsForDay(day);
                        const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                        
                        return (
                          <div key={day} className={`bg-white h-32 p-2 border-t border-l border-slate-50 group transition-colors hover:bg-slate-50/50 relative ${isToday ? 'bg-gold-luxury/5' : ''}`}>
                            <span className={`text-xs font-bold ${isToday ? 'bg-gold-luxury text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-slate-400'}`}>{day}</span>
                            <div className="mt-2 space-y-1 overflow-y-auto max-h-[80px] custom-scrollbar">
                              {dayApps.map(app => (
                                <div key={app.id} onClick={() => setViewMode('list')} className="text-[9px] p-1.5 bg-navy-luxury/5 border-l-2 border-gold-luxury rounded-sm truncate hover:bg-navy-luxury hover:text-white transition-all cursor-pointer">
                                  <span className="font-bold">{app.time}</span> {app.patientName}
                                </div>
                              ))}
                            </div>
                            <button onClick={addAppointment} className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-white/80 transition-opacity z-10">
                              <span className="text-[9px] font-bold uppercase text-gold-luxury">+ Cita</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {appointments.length === 0 ? (
                        <p className="text-center py-20 text-slate-300 italic">No hay citas registradas.</p>
                      ) : (
                        appointments.map(app => (
                          <div key={app.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-xl hover:shadow-md transition-all group">
                            <div className="flex items-center gap-6">
                              <div className="bg-white w-14 h-14 rounded-lg shadow-sm flex flex-col items-center justify-center border border-slate-100">
                                <span className="text-[10px] font-bold text-gold-luxury uppercase">{app.date.split('-')[1]}</span>
                                <span className="text-xl font-bold text-navy-luxury tracking-tighter">{app.date.split('-')[2]}</span>
                              </div>
                              <div>
                                <h4 className="font-bold text-navy-luxury text-lg">{app.patientName}</h4>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{app.service} — {app.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                               <a href={`https://wa.me/52${app.patientPhone}`} target="_blank" className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-all active:scale-90">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.455 1.083 3.44l-1.037 3.803 3.967-1.037a5.747 5.747 0 0 0 2.754.701c3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.39 8.161c-.146.411-.852.753-1.183.8-.331.047-.753.116-2.126-.457-1.745-.733-2.871-2.515-2.958-2.631-.087-.116-.713-.948-.713-1.815 0-.867.457-1.295.62-1.468.163-.174.354-.216.471-.216.116 0 .231 0 .331.006.107.006.246-.04.385.293.146.353.5.122.569.261s.116.273.058.388c-.058.116-.116.19-.174.261-.058.071-.122.146-.071.231.052.087.231.382.494.618.341.306.63.402.723.446.092.043.146.037.202-.023.058-.06.246-.286.312-.382.067-.097.133-.081.225-.047s.583.275.684.326c.101.051.168.076.19.116.022.04.022.231-.073.442z"/></svg>
                               </a>
                               <select 
                                  value={app.status}
                                  onChange={(e) => updateAppointmentStatus(app.id, e.target.value as any)}
                                  className={`text-[9px] px-4 py-2 rounded-lg font-bold uppercase border-none cursor-pointer transition-all ${
                                    app.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                                    app.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                  }`}
                                >
                                  <option value="pending">Pendiente</option>
                                  <option value="confirmed">Confirmado</option>
                                  <option value="completed">Completado</option>
                                </select>
                                <button onClick={() => deleteAppointment(app.id)} className="text-slate-300 hover:text-red-500 transition-colors p-2 active:scale-90">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="xl:col-span-4 space-y-8">
                <div className="bg-navy-luxury p-8 rounded-xl shadow-xl text-white relative overflow-hidden group">
                  <h3 className="text-xl font-bold luxury-font mb-6">Próximas Citas</h3>
                  <div className="space-y-6">
                    {upcomingAppointments.length === 0 ? (
                      <p className="text-white/40 text-xs italic">No hay citas próximas.</p>
                    ) : (
                      upcomingAppointments.map(app => (
                        <div key={app.id} className="flex gap-4 items-center p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="text-center min-w-[50px]">
                            <span className="block text-gold-luxury font-bold text-sm">{app.time}</span>
                            <span className="block text-[8px] uppercase font-bold text-white/40">{new Date(app.date).toLocaleDateString('es-MX', { weekday: 'short' })}</span>
                          </div>
                          <div>
                            <span className="block text-sm font-bold">{app.patientName}</span>
                            <span className="block text-[9px] uppercase tracking-widest text-white/40">{app.service}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <button onClick={addAppointment} className="w-full mt-10 bg-gold-luxury text-navy-luxury py-4 rounded-lg font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all active:scale-95 shadow-lg">Nueva Cita</button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'servicios' && (
            <motion.div key="servicios" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <div className="bg-white p-10 rounded-sm shadow-xl sticky top-24 border border-slate-100">
                  <h3 className="text-2xl font-bold text-navy-luxury luxury-font mb-8">{editingService ? 'Editar' : 'Nuevo'} Servicio</h3>
                  <form onSubmit={handleSaveService} className="space-y-6">
                    <input name="name" placeholder="Nombre del Servicio" defaultValue={editingService?.name || ''} className="w-full bg-slate-50 border-slate-200 p-4 rounded-sm focus:border-gold-luxury outline-none" required />
                    <input name="price" type="number" placeholder="Precio MXN" defaultValue={editingService?.price || ''} className="w-full bg-slate-50 border-slate-200 p-4 rounded-sm focus:border-gold-luxury outline-none" required />
                    <textarea name="description" rows={4} placeholder="Descripción" defaultValue={editingService?.description || ''} className="w-full bg-slate-50 border-slate-200 p-4 rounded-sm focus:border-gold-luxury outline-none" required />
                    <div className="flex items-center gap-3">
                      <input type="checkbox" name="featured" id="featured" defaultChecked={editingService?.featured} className="w-4 h-4 text-gold-luxury rounded" />
                      <label htmlFor="featured" className="text-xs font-bold uppercase tracking-widest text-navy-luxury cursor-pointer">Destacar</label>
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" className="flex-1 bg-navy-luxury text-white py-4 font-bold uppercase tracking-widest text-[10px] hover:bg-gold-luxury transition-all">Guardar</button>
                      {editingService && <button type="button" onClick={() => setEditingService(null)} className="px-6 border border-slate-200 text-slate-400 text-[10px] font-bold uppercase">Cancelar</button>}
                    </div>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                {services.map(service => (
                  <div key={service.id} className="bg-white p-8 rounded-sm shadow-md flex justify-between items-center group border-l-4 border-gold-luxury transition-all hover:shadow-lg">
                    <div>
                      <h4 className="font-bold text-navy-luxury text-lg">{service.name}</h4>
                      <p className="text-gold-luxury font-bold text-sm">${service.price.toLocaleString()} MXN</p>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => toggleFeaturedService(service.id)} className={`text-[9px] uppercase font-bold tracking-widest px-4 py-2 rounded-full border ${service.featured ? 'bg-gold-luxury/10 border-gold-luxury text-gold-luxury' : 'border-slate-200 text-slate-400'}`}>
                        {service.featured ? 'Destacado' : 'Normal'}
                      </button>
                      <button onClick={() => setEditingService(service)} className="text-navy-luxury text-[10px] font-bold uppercase tracking-widest hover:text-gold-luxury transition-colors">Editar</button>
                      <button onClick={() => deleteService(service.id)} className="text-red-400 text-[10px] font-bold uppercase tracking-widest hover:text-red-600 transition-colors">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'galeria' && (
            <motion.div key="galeria" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <div className="flex justify-between items-center bg-white p-10 rounded-sm shadow-md">
                <h3 className="text-2xl font-bold text-navy-luxury luxury-font">Galería Antes/Después</h3>
                <button onClick={addGalleryItem} className="bg-gold-luxury text-navy-luxury px-12 py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] shadow-xl hover:bg-navy-luxury hover:text-white transition-all active:scale-95">Nuevo Caso</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {gallery.map(item => (
                  <div key={item.id} className="bg-white p-6 rounded-sm shadow-lg group border border-slate-50 relative">
                    <div className="flex gap-2 mb-6">
                      <img src={item.beforeUrl} className="w-1/2 aspect-square object-cover rounded-sm" alt="Antes" />
                      <img src={item.afterUrl} className="w-1/2 aspect-square object-cover rounded-sm" alt="Después" />
                    </div>
                    <p className="text-xs text-slate-500 mb-6 italic">{item.description}</p>
                    <button onClick={() => deleteGalleryItem(item.id)} className="w-full py-3 text-red-400 hover:bg-red-50 text-[10px] font-bold uppercase tracking-widest transition-all">Eliminar</button>
                  </div>
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
