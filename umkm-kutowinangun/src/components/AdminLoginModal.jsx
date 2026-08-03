import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

export default function AdminLoginModal({ setIsAdminModalOpen, handleAdminLogin }) {
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleAdminLogin(password);
  };

  return (
    <div className="fixed inset-0 z-50 bg-sky-950/30 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xs w-full p-6 space-y-4 shadow-2xl border border-sky-100">
        <div className="flex items-center justify-between border-b border-sky-100 pb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-sky-500" />
            <h3 className="font-extrabold text-sky-950 text-sm">Masuk Mode Admin</h3>
          </div>
          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="w-7 h-7 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-sky-900 mb-1">
              Masukkan Password Admin:
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-sky-50/50 border border-sky-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Aktivasi Mode Admin
          </button>
        </form>
      </div>
    </div>
  );
}