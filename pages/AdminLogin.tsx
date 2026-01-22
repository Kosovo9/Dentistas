
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real production environment, this would be a server-side check
    // For this demonstration, we use a simple predefined key
    if (password === 'acosta2024') {
      sessionStorage.setItem('acosta_auth', 'true');
      onLogin();
    } else {
      setError('Clave de acceso incorrecta.');
    }
  };

  return (
    <div className="min-h-screen bg-navy-luxury flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white p-10 rounded-sm shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-navy-luxury text-3xl font-bold luxury-font">Acceso Restringido</h2>
          <p className="text-slate-400 text-sm mt-2">Ingrese la clave maestra de administración</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Clave Maestra</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-4 focus:outline-none focus:border-gold-luxury transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-xs font-bold text-center italic">{error}</p>}
          
          <button 
            type="submit" 
            className="w-full bg-navy-luxury text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-gold-luxury transition-all"
          >
            Entrar al Panel
          </button>
        </form>
        
        <div className="mt-8 text-center">
            <a href="/" className="text-slate-300 text-[10px] uppercase tracking-widest hover:text-navy-luxury">Volver al sitio público</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
