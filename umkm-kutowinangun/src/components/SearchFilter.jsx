import React, { useMemo } from 'react';
import { Search, Filter, X, Store, Utensils, Coffee, Users, ShoppingBag } from 'lucide-react';

export default function SearchFilter({ 
  searchQuery, setSearchQuery, 
  selectedRw, setSelectedRw, 
  activeTab, setActiveTab, 
  umkmList 
}) {
  const rwOptions = useMemo(() => {
    const list = Array.from(new Set(umkmList.map(item => item.rw))).filter(Boolean);
    return list.sort();
  }, [umkmList]);

  return (
    <div className="bg-white p-4 rounded-3xl shadow-xs border border-sky-100 space-y-4 print:hidden">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-400" />
          <input
            type="text"
            placeholder="Cari nama usaha, pengusaha, barang/jasa utama, atau alamat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-sky-50/30 border border-sky-200/70 rounded-2xl text-xs font-medium text-sky-950 placeholder:text-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-400 hover:text-sky-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter RW Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-sky-500 shrink-0" />
          <select
            value={selectedRw}
            onChange={(e) => setSelectedRw(e.target.value)}
            className="bg-sky-50/30 border border-sky-200/70 text-sky-900 text-xs font-medium rounded-2xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-300 cursor-pointer"
          >
            <option value="semua">Semua Wilayah RW</option>
            {rwOptions.map((rwNum, idx) => (
              <option key={idx} value={rwNum}>RW {rwNum}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-sky-100">
        {[
          { id: 'semua', label: 'Semua Sektor Usaha', icon: Store },
          { id: 'makanan', label: 'Kuliner Makanan', icon: Utensils },
          { id: 'minuman', label: 'Kuliner Minuman', icon: Coffee },
          { id: 'jasa', label: 'Jasa & Konveksi', icon: Users },
          { id: 'kerajinan', label: 'Kerajinan & Fashion', icon: ShoppingBag }
        ].map(tab => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive 
                  ? 'bg-sky-500 text-white shadow-xs' 
                  : 'bg-sky-50/50 text-sky-800 hover:bg-sky-100/50 border border-sky-100'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}