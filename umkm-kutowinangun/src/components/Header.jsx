import React from 'react';
import { Home, LayoutGrid, TableProperties, GraduationCap } from 'lucide-react';

export default function Header({ activePage, setActivePage, setIsAddModalOpen, isAdmin, setIsAdminModalOpen, handleAdminLogout }) {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'grid_catalog', label: 'Katalog', icon: LayoutGrid },
    { id: 'official_table', label: 'Tabel Resmi', icon: TableProperties },
    { id: 'education', label: 'Edukasi UMKM', icon: GraduationCap },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-100 py-3 transition-all print:hidden">
      <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-6">
        
        {/* Brand / Title (Kiri) */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActivePage('home')}>
          <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-black text-lg shadow-md shadow-sky-200">
            K
          </div>
          <div>
            <h1 className="text-sm font-black text-sky-950 tracking-tight">Kutowinangun Kidul</h1>
            <p className="text-[10px] text-sky-600 font-bold uppercase tracking-wider">Katalog UMKM 2026</p>
          </div>
        </div>

        {/* Minimalist Navigation Bar - Rata Kanan (ml-auto) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`relative py-2 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-sky-600 font-bold'
                    : 'text-slate-600 hover:text-sky-600'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                
                {/* Indikator Garis Bawah saat Aktif */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full transition-all duration-300" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin Action Buttons (Paling Kanan) */}
        <div className="flex items-center gap-2 shrink-0">
          {isAdmin ? (
            <>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                + Tambah UMKM
              </button>
              <button
                onClick={handleAdminLogout}
                className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs px-3 py-2.5 rounded-xl border border-rose-100 transition-all cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-sky-100 transition-all cursor-pointer"
            >
              Mode Admin
            </button>
          )}
        </div>

      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-around border-t border-sky-50 mt-3 pt-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`relative py-2 text-xs font-semibold flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                isActive ? 'text-sky-600 font-bold' : 'text-slate-500'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-sky-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}