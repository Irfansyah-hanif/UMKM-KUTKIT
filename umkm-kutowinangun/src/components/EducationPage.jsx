import React, { useState } from 'react';
import { GraduationCap, ZoomIn, ZoomOut, Download, ExternalLink, BookOpen } from 'lucide-react';

// Import gambar dari folder assets
import imgPemasaran from '../assets/pemasaran-digital.jpg';
import imgKontaminasi1 from '../assets/kontaminasi-1.jpg';
import imgKontaminasi2 from '../assets/kontaminasi-2.jpg';
import imgHakKewajiban from '../assets/hak-kewajiban-umkm.png';

export default function EducationPage() {
  const [previewImage, setPreviewImage] = useState(null);
  
  // State untuk kontrol perbesaran (Zoom) pada Lightbox
  const [zoomScale, setZoomScale] = useState(1);

  const edukasiList = [
    {
      id: 1,
      judul: 'Edukasi Hak & Kewajiban Pelaku UMKM',
      deskripsi: 'Panduan legalitas usaha, hak perlindungan hukum dan pembinaan, kewajiban usaha, hak perlindungan konsumen, hingga aspek risiko hukum dalam berwirausaha.',
      gambar: imgHakKewajiban,
    },
    {
      id: 2,
      judul: 'Pemasaran Digital Berbasis Perilaku Konsumen',
      deskripsi: 'Panduan mengenai strategi pemasaran memanfaatkan media digital dengan memahami kebiasaan, kebutuhan, dan minat konsumen.',
      gambar: imgPemasaran,
    },
    {
      id: 3,
      judul: 'Apa Itu Kontaminasi Pangan',
      deskripsi: 'Edukasi pentingnya menjaga kebersihan pangan, jenis-jenis kontaminasi (biologis, kimia, fisik), serta manfaat menjaga higienitas usaha.',
      gambar: imgKontaminasi1,
    },
    {
      id: 4,
      judul: 'Mari Cegah Kontaminasi',
      deskripsi: 'Langkah taktis pencegahan kontaminasi pangan, pemilihan kemasan yang aman, Alat Pelindung Diri (APD), dan 6 langkah cuci tangan yang benar.',
      gambar: imgKontaminasi2,
    },
  ];

  const handleOpenPreview = (item) => {
    setPreviewImage(item);
    setZoomScale(1);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
    setZoomScale(1);
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.3, 3));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.3, 0.8));
  };

  const handleResetZoom = () => {
    setZoomScale(1);
  };

  return (
    <main className="w-full px-4 sm:px-8 lg:px-12 py-6 sm:py-8 flex-1 space-y-6 sm:space-y-8 relative z-10">
      {/* Header Halaman Edukasi */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xs border border-sky-100/80 space-y-2">
        <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 border border-sky-200/60 text-xs font-bold px-3 py-1 rounded-full">
          <GraduationCap className="w-4 h-4 text-sky-500" />
          <span>Pusat Edukasi & Modul UMKM</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-sky-950 tracking-tight">
          Edukasi UMKM Kelurahan Kutowinangun Kidul
        </h2>
        <p className="text-xs sm:text-sm text-sky-700 font-medium">
          Materi infografis dan modul edukasi untuk meningkatkan kapasitas, legalitas usaha, manajemen keuangan, serta higienitas pelaku usaha mikro lokal.
        </p>
      </div>

      {/* MODUL UTAMA: PENGELOLAAN MANAJEMEN KEUANGAN BUKUWARUNG */}
      <div className="bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden border border-sky-400/30">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-sky-100 border border-white/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Modul Panduan Keuangan</span>
          </div>

          <h3 className="text-lg sm:text-xl font-black leading-snug">
            EDUKASI PENGELOLAAN MANAJEMEN KEUANGAN SEDERHANA BERBASIS APLIKASI "BUKU WARUNG" BAGI UMKM.
          </h3>

          <p className="text-xs sm:text-sm text-sky-50 leading-relaxed font-medium">
            Pengelolaan arus kas dan pencatatan transaksi merupakan fondasi utama keberlanjutan usaha mikro. Modul ini berisi panduan praktis penggunaan aplikasi <strong>BukuWarung</strong> untuk membantu pelaku UMKM mencatat penjualan, pengeluaran, utang-piutang, serta menyusun laporan keuangan harian secara mudah, akurat, dan digital langsung dari smartphone.
          </p>

          <div className="pt-2">
            <a
              href="https://drive.google.com/file/d/1mpcoPKHlrVxzr-32EkWGi4eN0Vpn7n9M/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-sky-900 hover:bg-sky-50 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <span>Baca Selengkapnya Modul Manajemen Keuangan</span>
              <ExternalLink className="w-4 h-4 text-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Grid Poster Edukasi Infografis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6">
        {edukasiList.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-sky-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
          >
            {/* Pratinjau Gambar / Poster */}
            <div
              onClick={() => handleOpenPreview(item)}
              className="relative h-72 sm:h-96 bg-sky-50 overflow-hidden cursor-pointer"
            >
              <img
                src={item.gambar}
                alt={item.judul}
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-bold text-xs bg-gradient-to-t from-black/70 via-transparent to-transparent">
                <ZoomIn className="w-5 h-5" />
                <span>Klik untuk Memperbesar</span>
              </div>
            </div>

            {/* Informasi & Deskripsi */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-black text-sky-950 text-sm sm:text-base group-hover:text-sky-600 transition-colors">
                  {item.judul}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {item.deskripsi}
                </p>
              </div>

              <div className="pt-3 border-t border-sky-50 flex items-center gap-2">
                <button
                  onClick={() => handleOpenPreview(item)}
                  className="flex-1 bg-sky-50 hover:bg-sky-500 text-sky-800 hover:text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Lihat Poster Jelas</span>
                </button>
                <a
                  href={item.gambar}
                  download={`${item.judul}.png`}
                  className="p-2.5 bg-sky-100/60 hover:bg-sky-200 text-sky-800 rounded-xl transition-colors cursor-pointer"
                  title="Unduh Poster"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL DENGAN BAR KONTROL & TOMBOL KEMBALI DI TENGAH BAWAH */}
      {previewImage && (
        <div
          onClick={handleClosePreview}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 cursor-pointer transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-slate-900 text-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col h-[85vh] sm:h-[90vh] my-auto"
          >
            {/* Header Lightbox (Hanya Judul Poster) */}
            <div className="p-3 sm:p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0 z-10">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate max-w-md">
                {previewImage.judul}
              </h4>
            </div>

            {/* Container Scroll Gambar */}
            <div className="relative flex-1 overflow-auto p-2 sm:p-4 bg-black/60 scrollbar-thin flex">
              <div className="m-auto flex items-center justify-center min-w-full min-h-full p-2 pb-20">
                <div
                  className="transition-transform duration-200 ease-out origin-center"
                  style={{
                    transform: `scale(${zoomScale})`,
                  }}
                >
                  <img
                    src={previewImage.gambar}
                    alt={previewImage.judul}
                    className="max-w-none max-h-[65vh] sm:max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl block"
                  />
                </div>
              </div>

              {/* BAR KONTROL ZOOM + TOMBOL KEMBALI MELAYANG DI TENGAH BAWAH */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-2xl">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomScale <= 0.8}
                  className="p-1.5 hover:bg-white/20 text-white rounded-full transition-colors disabled:opacity-30 cursor-pointer"
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <span className="text-xs font-bold text-sky-400 px-2 min-w-[45px] text-center select-none">
                  {Math.round(zoomScale * 100)}%
                </span>

                <button
                  onClick={handleZoomIn}
                  disabled={zoomScale >= 3}
                  className="p-1.5 hover:bg-white/20 text-white rounded-full transition-colors disabled:opacity-30 cursor-pointer"
                  title="Zoom In (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <button
                  onClick={handleResetZoom}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold rounded-full transition-colors cursor-pointer ml-1 border border-white/10"
                  title="Reset Zoom Ke 100%"
                >
                  Reset
                </button>

                {/* Tombol Teks Kembali Menggantikan Tombol Silang */}
                <button
                  onClick={handleClosePreview}
                  className="px-3 py-1 bg-rose-500/80 hover:bg-rose-600 text-white text-xs font-black rounded-full transition-colors cursor-pointer ml-1 border border-rose-400/30 shadow-xs"
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}