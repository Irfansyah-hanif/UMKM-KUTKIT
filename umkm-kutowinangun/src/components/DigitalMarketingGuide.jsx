import React from 'react';
import { Lightbulb, Target, Megaphone, Users, Eye, MessageCircle, BarChart3 } from 'lucide-react';

export default function DigitalMarketingGuide() {
  const tipsPemasaran = [
    { title: "Kenali Target Konsumen", desc: "Buat profil target konsumen sederhana sebagai acuan menyusun strategi promosi.", icon: Target },
    { title: "Memahami Perilaku Konsumen", desc: "Kenali pola perilaku dan faktor yang memengaruhi keputusan pembelian.", icon: Users },
    { title: "Buat Konten Relevan", desc: "Sajikan konten promosi yang menarik dan sesuai kebutuhan target pembeli.", icon: Lightbulb },
    { title: "Bangun Komunikasi Baik", desc: "Pelayanan yang ramah & cepat membangun kepercayaan serta loyalitas.", icon: MessageCircle },
    { title: "Evaluasi Strategi", desc: "Lakukan evaluasi rutin agar promosi digital semakin efektif dan tepat sasaran.", icon: BarChart3 },
  ];

  const caraMemahami = [
    { step: "AMATI", detail: "Perhatikan siapa pembeli, produk favorit, dan jam-jam ramai transaksi." },
    { step: "LIHAT RESPON SOSMED", detail: "Perhatikan konten mana yang paling banyak disukai, dikomentari, atau ditanyakan." },
    { step: "CATAT POLA PEMBELIAN", detail: "Catat produk terlaris, hari paling ramai, serta promo yang paling berhasil." },
    { step: "GUNAKAN UNTUK STRATEGI", detail: "Sesuaikan waktu unggah, jenis promo, dan konten dengan kebiasaan pembeli." }
  ];

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-4 relative z-10">
      <div className="bg-gradient-to-br from-sky-900 via-sky-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl space-y-8">
        
        {/* Banner Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold px-3 py-1 rounded-full">
            <Megaphone className="w-3.5 h-3.5" />
            <span>Panduan Edukasi UMKM</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Pemasaran Digital Berbasis Perilaku Konsumen
          </h3>
          <p className="text-sky-200 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
            Pahami kebiasaan, kebutuhan, dan minat konsumen agar promosi usaha mikro lebih efektif dan tepat sasaran.
          </p>
        </div>

        {/* 3 Manfaat Utama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs space-y-1">
            <span className="text-sky-400 font-extrabold text-base">01</span>
            <p className="font-semibold text-sky-100">Menentukan strategi promosi yang tepat sasaran</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs space-y-1">
            <span className="text-sky-400 font-extrabold text-base">02</span>
            <p className="font-semibold text-sky-100">Meningkatkan efektivitas iklan & konten pemasaran</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs space-y-1">
            <span className="text-sky-400 font-extrabold text-base">03</span>
            <p className="font-semibold text-sky-100">Mempermudah proses pembuatan konten promosi harian</p>
          </div>
        </div>

        {/* Grid Tips Pemasaran */}
        <div className="space-y-4 pt-2">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-sky-300">
            5 Tips Pemasaran Berbasis Perilaku Konsumen
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {tipsPemasaran.map((tip, idx) => {
              const IconComponent = tip.icon;
              return (
                <div key={idx} className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 transition-colors space-y-2">
                  <IconComponent className="w-5 h-5 text-sky-400" />
                  <h5 className="font-bold text-xs text-white">{tip.title}</h5>
                  <p className="text-[11px] text-sky-200 leading-relaxed">{tip.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Langkah Mudah Memahami Konsumen */}
        <div className="bg-sky-500/10 rounded-2xl p-5 border border-sky-400/20 space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-sky-300 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>Cara Mudah Memahami Konsumen Usaha Anda</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {caraMemahami.map((item, idx) => (
              <div key={idx} className="bg-sky-950/60 p-3.5 rounded-xl border border-sky-800/60 space-y-1">
                <span className="text-[10px] font-black bg-sky-500 text-white px-2 py-0.5 rounded-md">
                  {item.step}
                </span>
                <p className="text-[11px] text-sky-100 font-medium pt-1 leading-snug">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
);
}
