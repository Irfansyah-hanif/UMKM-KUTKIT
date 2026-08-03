import React, { useMemo } from 'react';
import { FileText, Store, Users } from 'lucide-react';

// Import Gambar Lokal dari Folder Assets
import heroMarketImg from '../assets/hero-market.jpg';

export default function HeroBanner({ umkmList, setViewMode }) {
  const statsSummary = useMemo(() => {
    const total = umkmList.length;
    const laki = umkmList.filter(u => u.jenisKelamin === 'L').length;
    const perempuan = umkmList.filter(u => u.jenisKelamin === 'P').length;
    return { total, laki, perempuan };
  }, [umkmList]);

  return (
    <section className="relative w-full z-10 overflow-hidden bg-sky-950 text-white print:hidden">
      {/* CONTAINER BANNER */}
      <div className="relative h-[550px] sm:h-[650px] lg:h-[720px] w-full">
        
        {/* GAMBAR BACKGROUND HERO-MARKET.JPG */}
        <img
          src={heroMarketImg}
          alt="Pasar Tradisional UMKM Kutowinangun Kidul"
          className="w-full h-full object-cover object-center absolute inset-0 z-0"
        />

        {/* OVERLAY GRADIENT GELAP */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-sky-950/90 via-sky-950/75 to-sky-950/40"></div>

        {/* KARTU STATISTIK REKAPITULASI (POSISI: POJOK KANAN ATAS BANNER) */}
        <div className="absolute top-6 right-4 sm:right-8 lg:right-12 z-30 hidden lg:block">
          <div className="w-80 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl space-y-3 text-white">
            
            {/* HEADER KARTU */}
            <div className="flex items-center justify-between border-b border-white/20 pb-2">
              <span className="text-xs font-black flex items-center gap-1.5">
                <Users className="w-4 h-4 text-sky-400" />
                Rekapitulasi Pelaku Usaha
              </span>
              <span className="text-[10px] bg-sky-500/30 text-sky-200 font-bold px-2 py-0.5 rounded-md border border-sky-300/30">
                2026
              </span>
            </div>

            {/* GRID ANGKA STATISTIK */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/10 backdrop-blur-xs p-2 rounded-2xl border border-white/15">
                <p className="text-[9px] text-sky-200 font-extrabold uppercase">Total</p>
                <p className="text-base font-black text-white">{statsSummary.total}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-2 rounded-2xl border border-white/15">
                <p className="text-[9px] text-sky-200 font-extrabold uppercase">Laki-Laki</p>
                <p className="text-base font-black text-white">{statsSummary.laki}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-2 rounded-2xl border border-white/15">
                <p className="text-[9px] text-sky-200 font-extrabold uppercase">Perempuan</p>
                <p className="text-base font-black text-white">{statsSummary.perempuan}</p>
              </div>
            </div>

          </div>
        </div>

        {/* CONTENT OVERLAY DI ATAS GAMBAR */}
        <div className="relative z-20 h-full w-full px-4 sm:px-8 lg:px-12 flex items-center">
          <div className="w-full max-w-3xl space-y-4">

            {/* JUDUL UTAMA */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
              DAFTAR UMKM KELURAHAN KUTOWINANGUN KIDUL <br />
              <span className="text-sky-400">KECAMATAN TINGKIR TAHUN 2026</span>
            </h1>

            {/* DESKRIPSI */}
            <p className="text-sky-100 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium drop-shadow-xs">
              Data terverifikasi sektor usaha produksi, perdagangan, kuliner, dan jasa warga Kelurahan Kutowinangun Kidul, Kota Salatiga.
            </p>

            {/* TOMBOL AKSI */}
            <div className="flex flex-wrap gap-3 pt-3">
              <button
                onClick={() => setViewMode('official_table')}
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition-all cursor-pointer hover:scale-105"
              >
                <FileText className="w-4 h-4" />
                <span>Buka Tabel Laporan Resmi ({statsSummary.total} UMKM)</span>
              </button>

              <button
                onClick={() => setViewMode('grid_catalog')}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3 rounded-xl border border-white/30 backdrop-blur-md transition-all cursor-pointer"
              >
                <Store className="w-4 h-4 text-sky-300" />
                <span>Jelajahi Katalog UMKM</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}