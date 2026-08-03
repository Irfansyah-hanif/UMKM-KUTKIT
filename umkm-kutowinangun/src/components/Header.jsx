import React from 'react';
import { Home, LayoutGrid, Table, Plus, LogIn, LogOut } from 'lucide-react';

export default function Header({ 
  activePage, 
  setActivePage, 
  setIsAddModalOpen, 
  isAdmin, 
  setIsAdminModalOpen, 
  handleAdminLogout 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-sky-100 px-4 sm:px-8 lg:px-12 py-3 shadow-sm transition-all print:hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => setActivePage('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-200 group-hover:scale-105 transition-transform">
            <span className="font-black text-lg">K</span>
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base text-sky-950 tracking-tight leading-tight group-hover:text-sky-600 transition-colors">
              UMKM Kutowinangun Kidul
            </h1>
            <p className="text-[11px] font-medium text-sky-700">
              Kecamatan Tingkir, Kota Salatiga
            </p>
          </div>
        </div>

        {/* Navigation Tabs & Actions */}
        <div className="flex items-center flex-wrap gap-2">
          
          {/* Navigasi 3 Halaman Utama */}
          <div className="bg-sky-50/80 p-1 rounded-2xl border border-sky-100 flex items-center gap-1">
            <button
              onClick={() => setActivePage('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activePage === 'home'
                  ? 'bg-white text-sky-900 shadow-sm'
                  : 'text-sky-700 hover:text-sky-950 hover:bg-sky-100/50'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </button>

            <button
              onClick={() => setActivePage('grid_catalog')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activePage === 'grid_catalog'
                  ? 'bg-white text-sky-900 shadow-sm'
                  : 'text-sky-700 hover:text-sky-950 hover:bg-sky-100/50'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Katalog</span>
            </button>

            <button
              onClick={() => setActivePage('official_table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activePage === 'official_table'
                  ? 'bg-white text-sky-900 shadow-sm'
                  : 'text-sky-700 hover:text-sky-950 hover:bg-sky-100/50'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Tabel Resmi</span>
            </button>
          </div>

          {/* Tombol Akses Admin */}
          <div className="flex items-center gap-2 pl-2 border-l border-sky-100">
            {isAdmin ? (
              <>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tambah UMKM</span>
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="inline-flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer border border-rose-200"
                  title="Keluar Mode Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-sky-100/80 hover:bg-sky-200/80 text-sky-800 font-bold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer border border-sky-200/60"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}