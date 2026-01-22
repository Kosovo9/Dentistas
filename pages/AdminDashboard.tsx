
import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { Appointment, Service, GalleryItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const { 
    services, updateServices, 
    gallery, updateGallery, 
    appointments, updateAppointments 
  } = useClinic();
  
  const [activeTab, setActiveTab] = useState<'citas' | 'servicios' | 'galeria'>('citas');
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Appointments logic
  const addAppointment = () => {
    const name = prompt("Nombre del paciente:");
    if (!name) return;
    const date = prompt("Fecha (AAAA-MM-DD):", new Date().toISOString().split('T')[0]);
    if (!date) return;
    
    const newApp: Appointment = {
      id: Date.now().toString(),
      patientName: name,
      date: date,
      time: "10:00",
      service: "Consulta General",
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

  // Services logic
  const handleSaveService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const serviceData: Service = {
      id: editingService?.id || Date.now().toString(),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      featured: formData.get('featured') === 'on'
    };

    if (editingService) {
      updateServices(services.map(s => s.id === editingService.id ? serviceData : s));
      setEditingService(null);
    } else {
      updateServices([...services, serviceData]);
    }
    e.currentTarget.reset();
  };

  const toggleFeaturedService = (id: string) => {
    updateServices(services.map(s => s.id === id ? { ...s, featured: !s.featured } : s));
  };

  const deleteService = (id: string) => {
    if (confirm("¿Eliminar este servicio?")) {
      updateServices(services.filter(s => s.id !== id));
    }
  };

  // Gallery logic
  const addGalleryItem = () => {
    const desc = prompt("Descripción del caso:");
    if (!desc) return;
    const before = prompt("URL Imagen Antes:", "https://picsum.photos/800/600?random=" + Math.random());
    const after = prompt("URL Imagen Después:", "https://picsum.photos/800/600?random=" + Math.random());
    if (!before || !after) return;

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      beforeUrl: before,
      afterUrl: after,
      description: desc
    };
    updateGallery([newItem, ...gallery]);
  };

  const deleteGalleryItem = (id: string) => {
    if (confirm("¿Eliminar este caso de la galería?")) {
      updateGallery(gallery.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-bold text-navy-luxury luxury-font">Centro de Control</h1>
            <p className="text-slate-400 font-medium">Dr. César Acosta — Chihuahua, MX</p>
          </motion.div>
          
          <div className="flex bg-white rounded-full shadow-lg border border-slate-200 p-1.5 w-full md:w-auto overflow-x-auto">
            {(['citas', 'servicios', 'galeria'] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none px-8 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full transition-all ${activeTab === tab ? 'bg-navy-luxury text-white shadow-md' : 'text-slate-400 hover:text-navy-luxury'}`}
              >
                {tab === 'citas' ? 'Agenda' : tab === 'servicios' ? 'Servicios' : 'Galería'}
              </button>
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'citas' && (
            <motion.div key="citas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <div className="flex justify-between items-center bg-white p-6 rounded-sm shadow-sm border border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-navy-luxury luxury-font">Próximas Consultas</h2>
                  <p className="text-sm text-slate-400">Hoy tienes {appointments.filter(a => a.status !== 'completed').length} citas activas.</p>
                </div>
                <button 
                  onClick={addAppointment}
                  className="bg-gold-luxury text-navy-luxury px-8 py-3 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-navy-luxury hover:text-white transition-all shadow-lg"
                >
                  + Nueva Cita
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.map(app => (
                  <div key={app.id} className="bg-white p-8 rounded-sm shadow-md border-t-4 border-gold-luxury relative group">
                    <div className="flex justify-between mb-6">
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{app.date} • {app.time}</span>
                      <select 
                        value={app.status}
                        onChange={(e) => updateAppointmentStatus(app.id, e.target.value as any)}
                        className={`text-[9px] px-3 py-1 rounded-full font-bold uppercase border-none focus:ring-0 cursor-pointer ${
                          app.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                          app.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="confirmed">Confirmado</option>
                        <option value="completed">Completado</option>
                      </select>
                    </div>
                    <h3 className="font-bold text-navy-luxury text-xl mb-1">{app.patientName}</h3>
                    <p className="text-slate-400 text-xs mb-8 italic">{app.service}</p>
                    <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => deleteAppointment(app.id)} className="text-red-400 hover:text-red-600 text-[10px] font-bold uppercase tracking-widest">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'servicios' && (
            <motion.div key="servicios" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <div className="bg-white p-10 rounded-sm shadow-xl border border-slate-100 sticky top-24">
                  <h3 className="text-2xl font-bold text-navy-luxury luxury-font mb-8">
                    {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
                  </h3>
                  <form onSubmit={handleSaveService} className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Nombre</label>
                      <input name="name" defaultValue={editingService?.name || ''} className="w-full bg-slate-50 border-slate-200 p-4 rounded-sm focus:border-gold-luxury transition-colors text-sm" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Precio Base (MXN)</label>
                      <input name="price" type="number" defaultValue={editingService?.price || ''} className="w-full bg-slate-50 border-slate-200 p-4 rounded-sm focus:border-gold-luxury transition-colors text-sm" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Descripción</label>
                      <textarea name="description" rows={4} defaultValue={editingService?.description || ''} className="w-full bg-slate-50 border-slate-200 p-4 rounded-sm focus:border-gold-luxury transition-colors text-sm" required />
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <input 
                        type="checkbox" 
                        name="featured" 
                        id="featured" 
                        defaultChecked={editingService?.featured}
                        className="w-4 h-4 text-gold-luxury border-slate-300 rounded focus:ring-gold-luxury" 
                      />
                      <label htmlFor="featured" className="text-xs font-bold uppercase tracking-widest text-navy-luxury cursor-pointer">Destacar en la web principal</label>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button type="submit" className="flex-1 bg-navy-luxury text-white py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gold-luxury transition-all shadow-xl">
                        {editingService ? 'Guardar Cambios' : 'Crear Servicio'}
                      </button>
                      {editingService && (
                        <button type="button" onClick={() => setEditingService(null)} className="px-6 py-4 border border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Cancelar</button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                {services.map(service => (
                  <div 
                    key={service.id} 
                    className={`bg-white p-8 rounded-sm shadow-md flex justify-between items-center group border-l-4 ${service.featured ? 'border-gold-luxury' : 'border-slate-200'}`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-navy-luxury text-lg">{service.name}</h4>
                        {service.featured && (
                          <span className="bg-gold-luxury/10 text-gold-luxury text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Destacado</span>
                        )}
                      </div>
                      <p className="text-gold-luxury font-bold text-sm tracking-tight">${service.price.toLocaleString()} MXN</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[8px] uppercase tracking-widest text-slate-300 font-bold">Visibilidad</span>
                        <button 
                          onClick={() => toggleFeaturedService(service.id)}
                          className={`w-10 h-5 rounded-full relative transition-colors ${service.featured ? 'bg-gold-luxury' : 'bg-slate-200'}`}
                        >
                          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${service.featured ? 'left-6' : 'left-1'}`} />
                        </button>
                      </div>
                      <button onClick={() => setEditingService(service)} className="text-navy-luxury font-bold text-[10px] uppercase tracking-widest border-b-2 border-transparent hover:border-gold-luxury transition-all">Editar</button>
                      <button onClick={() => deleteService(service.id)} className="text-red-400 font-bold text-[10px] uppercase tracking-widest hover:text-red-600 transition-colors">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'galeria' && (
            <motion.div key="galeria" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <div className="flex justify-between items-center bg-white p-10 rounded-sm shadow-md">
                <div>
                  <h3 className="text-2xl font-bold text-navy-luxury luxury-font">Casos de Transformación</h3>
                  <p className="text-slate-400">Estas fotos se actualizan automáticamente en la página principal.</p>
                </div>
                <button onClick={addGalleryItem} className="bg-gold-luxury text-navy-luxury px-12 py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] shadow-xl hover:bg-navy-luxury hover:text-white transition-all">Añadir Nuevo Caso</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {gallery.map(item => (
                  <div key={item.id} className="bg-white p-6 rounded-sm shadow-lg border border-slate-100 group">
                    <div className="flex gap-3 mb-6">
                      <img src={item.beforeUrl} alt="Antes" className="w-1/2 aspect-[4/5] object-cover rounded-sm border border-slate-200 shadow-inner" />
                      <img src={item.afterUrl} alt="Después" className="w-1/2 aspect-[4/5] object-cover rounded-sm border border-slate-200 shadow-inner" />
                    </div>
                    <p className="text-sm text-slate-500 font-light italic mb-8 h-12 overflow-hidden">{item.description}</p>
                    <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-slate-300">ID: {item.id.substring(0,6)}</span>
                      <button onClick={() => deleteGalleryItem(item.id)} className="text-red-400 hover:text-red-600 font-bold uppercase text-[10px] tracking-widest">Eliminar Caso</button>
                    </div>
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
