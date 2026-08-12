import React from 'react';
import { Search, Filter, Store, Utensils, ShoppingBag, Factory, Wrench, Shirt } from 'lucide-react';

export default function SearchFilter({
  searchQuery,
  setSearchQuery,
  selectedRw,
  setSelectedRw,
  activeTab,
  setActiveTab,
  umkmList
}) {
  // Daftar Tab Sektor/Kelompok Usaha yang disesuaikan persis dengan opsi Gambar 2
  const categories = [
    { id: 'semua', label: 'Semua Sektor Usaha', icon: Store },
    { id: 'kuliner', label: 'KULINER', icon: Utensils },
    { id: 'perdagangan', label: 'PERDAGANGAN', icon: ShoppingBag },
    { id: 'produksi/non pertanian', label: 'PRODUKSI/NON PERTANIAN', icon: Factory },
    { id: 'jasa', label: 'JASA', icon: Wrench },
    { id: 'konveksi', label: 'KONVEKSI', icon: Shirt }
  ];

  // Daftar RW
  const rwList = ['semua', '01', '02', '03', '04', '05', '06', '07', '08'];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xs border border-sky-100/80 space-y-4">
      
      {/* Baris Atas: Input Pencarian & Dropdown Filter RW */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Input Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-sky-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama usaha, pengusaha, barang/jasa utama, atau alamat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-sky-50/30 border border-sky-200/60 rounded-full text-xs font-medium text-sky-950 placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all"
          />
        </div>

        {/* Filter RW */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <Filter className="w-4 h-4 text-sky-500 hidden md:block" />
          <select
            value={selectedRw}
            onChange={(e) => setSelectedRw(e.target.value)}
            className="w-full md:w-auto px-4 py-3 bg-white border border-sky-200/80 rounded-full text-xs font-bold text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-300 cursor-pointer shadow-xs"
          >
            <option value="semua">Semua Wilayah RW</option>
            {rwList.filter(rw => rw !== 'semua').map((rw) => (
              <option key={rw} value={rw}>Wilayah RW {rw}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Baris Bawah: Tombol Tab Kelompok Usaha */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab.toLowerCase() === cat.id.toLowerCase();

          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-200'
                  : 'bg-sky-50/50 hover:bg-sky-100/80 text-sky-900 border-sky-200/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-sky-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}