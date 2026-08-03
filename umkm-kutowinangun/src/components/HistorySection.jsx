import React from 'react';
import { History, Award, TrendingUp, Landmark } from 'lucide-react';

export default function HistorySection() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-8 relative z-10">
      <div className="bg-white rounded-3xl border border-sky-100 p-6 md:p-8 shadow-xs space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center gap-3 border-b border-sky-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-sky-950">Sejarah & Perkembangan UMKM Kutowinangun Kidul</h3>
            <p className="text-xs text-sky-700 font-medium">Jejak langkah pemberdayaan ekonomi lokal masyarakat Kelurahan Kutowinangun Kidul</p>
          </div>
        </div>

        {/* Isi Artikel Sejarah */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3 text-xs text-sky-900 leading-relaxed font-medium">
            <p>
              Kelurahan Kutowinangun Kidul di Kecamatan Tingkir, Salatiga, memiliki jejak sejarah panjang sebagai salah satu pusat aktivitas ekonomi kerakyatan. Berawal dari usaha-usaha rumahan sektor konveksi, jajanan tradisional, dan perdagangan skala mikro, masyarakat setempat secara turun-temurun menjaga tradisi kewirausahaan lokal.
            </p>
            <p>
              Seiring berjalannya waktu, potensi UMKM di wilayah Kutowinangun Kidul berkembang pesat melingkupi berbagai sektor seperti kuliner modern, kerajinan tangan, hingga jasa kreatif. Sinergi antara pemerintah kelurahan, komunitas, dan mahasiswa KKN memperkuat pendataan terpadu serta digitalisasi agar pelaku UMKM berdaya saing tinggi di pasar digital.
            </p>
          </div>

          {/* Kartu Highlight Sejarah */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100 space-y-1">
              <History className="w-5 h-5 text-sky-500 mb-2" />
              <h4 className="font-bold text-sky-950 text-xs">Warisan Usaha Lokal</h4>
              <p className="text-[11px] text-sky-700 leading-snug">Berakar dari tradisi pembuatan makanan khas dan konveksi rumahan.</p>
            </div>
            <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100 space-y-1">
              <TrendingUp className="w-5 h-5 text-emerald-500 mb-2" />
              <h4 className="font-bold text-sky-950 text-xs">Transformasi Digital</h4>
              <p className="text-[11px] text-sky-700 leading-snug">Mulai mengadopsi pemasaran digital dan katalog online terpadu.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}