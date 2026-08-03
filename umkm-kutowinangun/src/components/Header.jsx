import React from 'react';
import { Building2, LayoutGrid, Table, ShieldCheck, LogOut, Lock, Plus } from 'lucide-react';

export default function Header({ 
  viewMode, 
  setViewMode, 
  setIsAddModalOpen, 
  isAdmin, 
  setIsAdminModalOpen, 
  handleAdminLogout 
}) {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-sky-100 sticky top-0 z-40 print:hidden transition-all">
      <div className="w-full px-4 sm:px-8 lg:px-12 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Identitas Branding & Badge Status Admin */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-sky-950 text-base leading-tight tracking-tight">
                  Pendataan UMKM
                </h1>
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Mode Admin
                  </span>
                )}
              </div>
              <p className="text-[11px] text-sky-700 font-semibold">
                Kelurahan Kutowinangun Kidul
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          
          {/* Switch Mode Tampilan (Tabel / Grid Katalog) */}
          <div className="bg-sky-50 p-1 rounded-2xl border border-sky-100 flex items-center gap-1">
            <button
              onClick={() => setViewMode('official_table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'official_table'
                  ? 'bg-white text-sky-950 shadow-xs'
                  : 'text-sky-700 hover:text-sky-950'
              }`}
              title="Tampilan Tabel Resmi Laporan"
            >
              <Table className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Tabel</span>
            </button>

            <button
              onClick={() => setViewMode('grid_catalog')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid_catalog'
                  ? 'bg-white text-sky-950 shadow-xs'
                  : 'text-sky-700 hover:text-sky-950'
              }`}
              title="Tampilan Katalog Kartu"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Katalog</span>
            </button>
          </div>

          <div className="h-6 w-[1px] bg-sky-200/60 hidden sm:block"></div>

          {/* Tombol Tambah UMKM (Hanya Muncul Jika Admin) */}
          {isAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs shadow-sky-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah UMKM</span>
            </button>
          )}

          {/* Tombol Akses / Logout Admin */}
          {isAdmin ? (
            <button
              onClick={handleAdminLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-600 border border-rose-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
              title="Keluar dari mode admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar Admin</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-50 hover:bg-sky-100 active:scale-95 text-sky-900 border border-sky-200 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <Lock className="w-3.5 h-3.5 text-sky-600" />
              <span>Akses Admin</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}