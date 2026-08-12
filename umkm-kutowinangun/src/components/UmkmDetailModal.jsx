import React, { useState } from 'react';
import { X, MapPin, Building2, Phone, Trash2, Navigation, Map, Images, ZoomIn, Store } from 'lucide-react';

export default function UmkmDetailModal({ selectedUmkm, setSelectedUmkm, onDelete }) {
  // State untuk menyimpan data gambar yang sedang dibuka di Lightbox Zoom
  const [activePreviewImage, setActivePreviewImage] = useState(null);

  if (!selectedUmkm) return null;

  // Sanitasi & pembentukan URL Gambar aman
  const getImageUrl = (path) => {
    if (!path) return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
    let url = path.trim();
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url.replace(/^http:\/\//i, 'https://');
    }
    return `http://localhost:5000${url}`;
  };

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

  // Generator URL Peta Google Maps
  const getMapsUrls = () => {
    const rawInput = (selectedUmkm.linkGmaps || '').trim();
    if (rawInput.includes('<iframe')) {
      const srcMatch = rawInput.match(/src=["']([^"']+)["']/);
      const embedUrl = srcMatch ? srcMatch[1] : '';
      return {
        embedUrl,
        directUrl: embedUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedUmkm.namaUsaha + ' ' + selectedUmkm.alamat)}`
      };
    }
    if (rawInput.startsWith('http://') || rawInput.startsWith('https://')) {
      return {
        embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(rawInput)}&output=embed`,
        directUrl: rawInput
      };
    }
    const fallbackQuery = encodeURIComponent(`${selectedUmkm.namaUsaha} ${selectedUmkm.alamat} Salatiga`);
    return {
      embedUrl: `https://maps.google.com/maps?q=${fallbackQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`,
      directUrl: `https://www.google.com/maps/search/?api=1&query=${fallbackQuery}`
    };
  };

  const { embedUrl, directUrl } = getMapsUrls();

  // Foto Tempat/Suasana Usaha Utama
  const fotoUtama = getImageUrl(selectedUmkm.gambar);

  // Galeri Foto Produk Usaha
  const galeriProduk = Array.isArray(selectedUmkm.galeri) && selectedUmkm.galeri.length > 0 
    ? selectedUmkm.galeri 
    : [];

  // Array produk unggulan untuk dijadikan caption masing-masing foto produk
  const daftarProduk = Array.isArray(selectedUmkm.produkUnggulan)
    ? selectedUmkm.produkUnggulan
    : typeof selectedUmkm.produkUnggulan === 'string'
    ? selectedUmkm.produkUnggulan.split(',').map((s) => s.trim())
    : [];

  return (
    <>
      {/* MODAL UTAMA DETAIL UMKM */}
      <div 
        className="fixed inset-0 z-50 bg-sky-950/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:hidden"
        onClick={handleClose}
      >
        <div 
          className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-sky-100 my-8 relative z-10 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar Modal */}
          <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-sky-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold bg-sky-500 text-white px-2.5 py-0.5 rounded-lg">
                {selectedUmkm.kategori || 'UMKM'}
              </span>
              <h3 className="text-lg font-black text-sky-950 mt-0.5">{selectedUmkm.namaUsaha}</h3>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-950 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-6">

            {/* 1. SEKSI FOTO SUASANA / TEMPAT USAHA */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-sky-950 uppercase tracking-wider flex items-center gap-1.5">
                <Store className="w-4 h-4 text-sky-500" />
                <span>Foto Suasana Tempat Usaha</span>
              </h4>
              <div 
                onClick={() => setActivePreviewImage({ url: fotoUtama, title: 'Suasana / Tempat Usaha', caption: selectedUmkm.namaUsaha })}
                className="relative h-52 sm:h-60 rounded-2xl overflow-hidden border border-sky-100 shadow-xs cursor-pointer group"
              >
                <img 
                  src={fotoUtama} 
                  alt={`Suasana ${selectedUmkm.namaUsaha}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 font-bold text-xs bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <ZoomIn className="w-5 h-5" />
                  <span>Klik untuk memperbesar</span>
                </div>
              </div>
            </div>

            {/* 2. SEKSI FOTO PRODUK USAHA (DENGAN CAPTION) */}
            {galeriProduk.length > 0 && (
              <div className="space-y-2.5 pt-1">
                <h4 className="text-xs font-extrabold text-sky-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Images className="w-4 h-4 text-sky-500" />
                  <span>Foto Produk Usaha</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {galeriProduk.map((imgUrl, idx) => {
                    const fullUrl = getImageUrl(imgUrl);
                    const captionText = daftarProduk[idx] || `Produk ${idx + 1} - ${selectedUmkm.namaUsaha}`;
                    
                    return (
                      <div 
                        key={idx}
                        onClick={() => setActivePreviewImage({ url: fullUrl, title: `Foto Produk ${idx + 1}`, caption: captionText })}
                        className="group cursor-pointer space-y-1"
                      >
                        <div className="relative h-28 rounded-2xl overflow-hidden border border-sky-100 shadow-xs bg-sky-50">
                          <img 
                            src={fullUrl} 
                            alt={captionText} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <ZoomIn className="w-4 h-4" />
                          </div>
                        </div>
                        {/* Caption khusus gambar produk */}
                        <p className="text-[11px] font-semibold text-slate-700 leading-tight group-hover:text-sky-600 transition-colors line-clamp-2">
                          {captionText}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* INFORMASI PEMILIK & ALAMAT */}
            <div className="bg-sky-50/60 p-4 rounded-2xl space-y-2 border border-sky-100 text-xs font-medium">
              <div className="flex items-center gap-2 text-sky-900">
                <Building2 className="w-4 h-4 text-sky-500 shrink-0" />
                <span><strong>Pemilik Usaha:</strong> {selectedUmkm.pemilik} ({selectedUmkm.jenisKelamin || '-'}, {selectedUmkm.usia || '-'} th)</span>
              </div>
              <div className="flex items-start gap-2 text-sky-900">
                <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span><strong>Alamat Usaha:</strong> {selectedUmkm.alamat} (RW {selectedUmkm.rw || '01'})</span>
              </div>
              <div className="flex items-center gap-2 text-sky-900">
                <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                <span><strong>Kontak / WA:</strong> {selectedUmkm.kontak || '-'}</span>
              </div>
            </div>

            {/* SECTION PETA GOOGLE MAPS */}
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

              <div className="w-full h-40 rounded-2xl overflow-hidden border border-sky-200/80 bg-sky-100/50 shadow-inner">
                <iframe
                  title={`Peta Lokasi ${selectedUmkm.namaUsaha}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
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

      {/* LIGHTBOX MODAL (POPUP SAAT GAMBAR DIKLIK) */}
      {activePreviewImage && (
        <div
          onClick={() => setActivePreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Tombol Close Lightbox */}
            <button
              onClick={() => setActivePreviewImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center cursor-pointer border border-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Container Gambar Utuh */}
            <div className="max-h-[75vh] flex items-center justify-center bg-black/40 p-3">
              <img
                src={activePreviewImage.url}
                alt={activePreviewImage.caption}
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>

            {/* Teks Keterangan & Caption Gambar */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">
                {activePreviewImage.title}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-100">
                {activePreviewImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}