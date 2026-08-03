import React from 'react';
import { Store, MapPin, User, Eye, Edit, Trash2 } from 'lucide-react';

export default function GridView({ filteredUmkm, setSelectedUmkm, onDelete, onEdit }) {
  // Fungsi penentu URL gambar (URL Absolut/Upload Server/Fallback Unsplash)
  const getImageUrl = (rawGambar) => {
    if (!rawGambar) {
      return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
    }
    if (rawGambar.startsWith('http://') || rawGambar.startsWith('https://')) {
      return rawGambar;
    }
    return `http://localhost:5000${rawGambar}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black text-sky-950 flex items-center gap-2">
          <span>Katalog Usaha Mikro</span>
          <span className="text-xs bg-sky-100 text-sky-800 font-bold px-2.5 py-0.5 rounded-full border border-sky-200/60">
            {filteredUmkm.length}
          </span>
        </h3>
      </div>

      {filteredUmkm.length === 0 ? (
        <div className="bg-white rounded-3xl border border-sky-200/80 p-12 text-center space-y-3 shadow-xs">
          <Store className="w-12 h-12 text-sky-300 mx-auto" />
          <h4 className="text-base font-bold text-sky-950">Data UMKM Tidak Ditemukan</h4>
          <p className="text-xs text-sky-800 max-w-md mx-auto font-medium">
            Coba sesuaikan kata kunci pencarian atau ganti filter RW.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUmkm.map((umkm, idx) => (
            <div 
              key={umkm._id || umkm.id || idx}
              className="bg-white rounded-3xl border border-sky-100 overflow-hidden shadow-xs hover:shadow-md hover:border-sky-200 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-sky-50">
                <img 
                  src={getImageUrl(umkm.gambar)} 
                  alt={umkm.namaUsaha}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md bg-white/90 text-sky-800 border border-sky-100 shadow-xs">
                    {umkm.kategori || 'UMKM'}
                  </span>
                </div>
                <span className="absolute bottom-3 right-3 text-[11px] font-bold bg-sky-500/90 text-white backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                  <MapPin className="w-3 h-3 text-sky-100" />
                  RW {umkm.rw || '01'}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-sky-950 group-hover:text-sky-600 transition-colors line-clamp-1">
                    {umkm.namaUsaha}
                  </h4>
                  <p className="text-xs text-sky-800 flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Pengusaha: <strong className="text-sky-950 font-semibold">{umkm.pemilik}</strong> ({umkm.jenisKelamin || '-'}, {umkm.usia || '-'} th)</span>
                  </p>
                  <p className="text-xs text-sky-900/80 line-clamp-2 leading-relaxed font-medium">
                    <strong>Barang/Jasa:</strong> {umkm.jenisBarangJasa}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-sky-100">
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(umkm.produkUnggulan) && umkm.produkUnggulan.slice(0, 2).map((prod, pIdx) => (
                      <span key={pIdx} className="text-[10px] bg-sky-50 text-sky-800 border border-sky-100 px-2 py-0.5 rounded-md font-semibold">
                        {prod}
                      </span>
                    ))}
                  </div>

                  {/* Action Group: Detail (Publik) + Edit & Hapus (Hanya Admin) */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedUmkm(umkm)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-900 font-bold text-xs py-2.5 rounded-xl transition-colors border border-sky-100 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-sky-500" />
                      <span>Detail Usaha</span>
                    </button>

                    {onEdit && (
                      <button
                        onClick={() => onEdit(umkm)}
                        className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-xl transition-colors border border-amber-200/70 cursor-pointer"
                        title="Edit Data UMKM"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {onDelete && (
                      <button
                        onClick={() => onDelete(umkm._id)}
                        className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors border border-rose-200/70 cursor-pointer"
                        title="Hapus Data UMKM"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}