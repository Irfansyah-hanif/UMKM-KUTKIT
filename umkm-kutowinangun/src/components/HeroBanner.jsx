import React, { useMemo } from 'react';
import { Sparkles, FileText, Users } from 'lucide-react';

export default function HeroBanner({ umkmList, setViewMode }) {
  const statsSummary = useMemo(() => {
    const total = umkmList.length;
    const laki = umkmList.filter(u => u.jenisKelamin === 'L').length;
    const perempuan = umkmList.filter(u => u.jenisKelamin === 'P').length;
    return { total, laki, perempuan };
  }, [umkmList]);

  return (
    <section className="relative z-10 overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-white text-sky-950 py-8 lg:py-10 border-b border-sky-100 print:hidden">
      {/* Menggunakan w-full dan padding responsif agar memenuhi lebar layar */}
      <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        <div className="lg:col-span-8 space-y-3">
          <div className="inline-flex items-center gap-2 bg-sky-100/80 border border-sky-200/60 text-sky-800 text-xs font-bold px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Sistem Pendataan Terpadu Usaha Mikro Tahun 2026</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-sky-950">
            DAFTAR UMKM KELURAHAN KUTOWINANGUN KIDUL <br />
            <span className="text-sky-600">
              KECAMATAN TINGKIR TAHUN 2026
            </span>
          </h2>

          <p className="text-sky-900/80 text-xs sm:text-sm max-w-3xl leading-relaxed font-medium">
            Data terverifikasi sektor usaha produksi, perdagangan, kuliner, dan jasa warga Kelurahan Kutowinangun Kidul, Kota Salatiga.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={() => setViewMode('official_table')}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Buka Tabel Laporan Resmi ({statsSummary.total} UMKM)</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center">
          <div className="w-full bg-white border border-sky-200/80 p-5 rounded-3xl shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-sky-100 pb-2.5">
              <span className="text-xs font-bold text-sky-950 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-sky-500" />
                Rekapitulasi Pelaku Usaha
              </span>
              <span className="text-[11px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-md">
                Tahun 2026
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-sky-50/80 p-2.5 rounded-xl border border-sky-100">
                <p className="text-[10px] text-sky-700 font-bold uppercase">Total</p>
                <p className="text-lg font-black text-sky-950">{statsSummary.total}</p>
              </div>
              <div className="bg-sky-50/80 p-2.5 rounded-xl border border-sky-100">
                <p className="text-[10px] text-sky-700 font-bold uppercase">Laki-Laki</p>
                <p className="text-lg font-black text-sky-950">{statsSummary.laki}</p>
              </div>
              <div className="bg-sky-50/80 p-2.5 rounded-xl border border-sky-100">
                <p className="text-[10px] text-sky-700 font-bold uppercase">Perempuan</p>
                <p className="text-lg font-black text-sky-950">{statsSummary.perempuan}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}