import React from 'react';
import { X, MapPin, Building2, Phone, Trash2, Navigation, Map } from 'lucide-react';

export default function UmkmDetailModal({ selectedUmkm, setSelectedUmkm, onDelete }) {
  // Jika tidak ada data UMKM yang dipilih, jangan tampilkan modal
  if (!selectedUmkm) return null;

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedUmkm(null);
  };

  const handleDelete = () => {
    if (onDelete && selectedUmkm._id) {
      onDelete(selectedUmkm._id);
    }
  };

  // --- LOGIKA FORMALISASI URL GAMBAR ---
  const getImageUrl = () => {
    const rawGambar = selectedUmkm.gambar;
    if (!rawGambar) {
      return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
    }
    // Jika gambar dikirim dalam format URL absolute (http/https)
    if (rawGambar.startsWith('http://') || rawGambar.startsWith('https://')) {
      return rawGambar;
    }
    // Jika path relatif (seperti '/uploads/12345.jpg') dari backend Multer
    return `http://localhost:5000${rawGambar}`;
  };

  // --- LOGIKA PARSER GOOGLE MAPS ---
  const getMapsUrls = () => {
    const rawInput = (selectedUmkm.linkGmaps || '').trim();

    // 1. Jika Admin menempelkan Kode Embed HTML (<iframe src="...">)
    if (rawInput.includes('<iframe')) {
      const srcMatch = rawInput.match(/src=["']([^"']+)["']/);
      const embedUrl = srcMatch ? srcMatch[1] : '';
      return {
        embedUrl: embedUrl,
        directUrl: embedUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedUmkm.namaUsaha + ' ' + selectedUmkm.alamat)}`
      };
    }

    // 2. Jika Admin menempelkan Link Share biasa (https://maps.app.goo.gl/... atau https://goo.gl/maps/...)
    if (rawInput.startsWith('http://') || rawInput.startsWith('https://')) {
      return {
        embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(rawInput)}&output=embed`,
        directUrl: rawInput
      };
    }

    // 3. Fallback Otomatis berdasarkan Nama Usaha + Alamat jika Admin tidak mengisi link
    const fallbackQuery = encodeURIComponent(`${selectedUmkm.namaUsaha} ${selectedUmkm.alamat} Salatiga`);
    return {
      embedUrl: `https://maps.google.com/maps?q=${fallbackQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`,
      directUrl: `https://www.google.com/maps/search/?api=1&query=${fallbackQuery}`
    };
  };

  const { embedUrl, directUrl } = getMapsUrls();

  return (
    <div 
      className="fixed inset-0 z-50 bg-sky-950/30 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:hidden"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-sky-100 my-8 relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Gambar Usaha (Mendukung File Upload Backend) */}
        <div className="relative h-52 sm:h-60 bg-sky-50">
          <img 
            src={getImageUrl()} 
            alt={selectedUmkm.namaUsaha} 
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-sky-950 flex items-center justify-center backdrop-blur-md transition-colors shadow-xs cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="text-xs font-bold bg-sky-500 text-white px-3 py-1 rounded-lg shadow-xs">
              {selectedUmkm.kategori || 'UMKM'}
            </span>
            <span className="text-xs font-semibold bg-white/90 text-sky-800 px-3 py-1 rounded-lg backdrop-blur-md border border-sky-100">
              RW {selectedUmkm.rw || '01'}
            </span>
          </div>
        </div>

        {/* Bodi Modal Detail */}
        <div className="p-6 space-y-5">
          <div>
            <h3 className="text-xl font-black text-sky-950">{selectedUmkm.namaUsaha}</h3>
            <p className="text-xs text-sky-800 mt-1 flex items-center gap-2 font-medium">
              <span>
                Pengusaha: <strong className="text-sky-950">{selectedUmkm.pemilik}</strong> ({selectedUmkm.jenisKelamin || '-'}, {selectedUmkm.usia || '-'} th)
              </span>
            </p>
          </div>

          {/* Ringkasan Informasi */}
          <div className="bg-sky-50/60 p-4 rounded-2xl space-y-2 border border-sky-100 text-xs font-medium">
            <div className="flex items-start gap-2 text-sky-900">
              <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
              <span><strong>Alamat Usaha:</strong> {selectedUmkm.alamat}</span>
            </div>
            <div className="flex items-center gap-2 text-sky-900">
              <Building2 className="w-4 h-4 text-sky-500 shrink-0" />
              <span><strong>Kelompok Usaha:</strong> {selectedUmkm.kelompokUsaha}</span>
            </div>
            <div className="flex items-center gap-2 text-sky-900">
              <Phone className="w-4 h-4 text-sky-500 shrink-0" />
              <span><strong>Kontak / WA:</strong> {selectedUmkm.kontak || '-'}</span>
            </div>
          </div>

          {/* SECTION TAMPILAN PETA VISUAL DIRECT */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-sky-950 uppercase tracking-wider flex items-center gap-1.5">
                <Map className="w-4 h-4 text-sky-500" />
                <span>Peta Lokasi Usaha</span>
              </h4>
              <a
                href={directUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 transition-colors"
              >
                <span>Buka Google Maps</span>
                <Navigation className="w-3 h-3" />
              </a>
            </div>

            {/* PETA VISUAL LANGSUNG */}
            <div className="w-full h-44 rounded-2xl overflow-hidden border border-sky-200/80 bg-sky-100/50 shadow-inner">
              <iframe
                title={`Peta Lokasi ${selectedUmkm.namaUsaha}`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={embedUrl}
                loading="lazy"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Tombol Aksi Bottom */}
          <div className="pt-3 border-t border-sky-100 flex flex-wrap sm:flex-nowrap gap-2.5">
            <a
              href={`https://wa.me/${(selectedUmkm.kontak || '').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-all border border-emerald-400/30"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi WA</span>
            </a>

            <a
              href={directUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all border border-sky-400/30"
            >
              <Navigation className="w-4 h-4" />
              <span>Petunjuk Arah</span>
            </a>

            {onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition-colors border border-rose-200 cursor-pointer"
                title="Hapus Data UMKM Ini"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-3 bg-sky-50 hover:bg-sky-100 text-sky-900 font-bold text-xs rounded-xl transition-colors border border-sky-100 cursor-pointer"
            >
              Tutup
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}