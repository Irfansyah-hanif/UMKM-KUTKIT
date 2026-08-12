import React from 'react';
import { Landmark, BookOpen, ExternalLink } from 'lucide-react';

export default function HistorySection() {
  const referensiList = [
    {
      penulis: "Dinas Perdagangan, Koperasi dan Usaha Mikro Kota Salatiga",
      tahun: "2023",
      judul: "Laporan akhir pilot project model inkubasi ekonomi kreatif Kota Salatiga",
      penerbit: "Sistem Informasi Pengembangan UMKM",
      url: null
    },
    {
      penulis: "DPRD Kota Salatiga",
      tahun: "n.d.",
      judul: "Pengembangan Usaha Mikro, Kecil, dan Menengah (UMKM) ekonomi kreatif",
      penerbit: "Portal Resmi DPRD Kota Salatiga",
      url: "https://dprd-salatigakota.go.id/pengembangan-usaha-mikro-kecil-dan-menengah-umkm-ekonomi-kreatif/"
    },
    {
      penulis: "Kampung KB Kemendukbangga",
      tahun: "2023",
      judul: "Kampung KBRPPA Lincah, Kelurahan Kutowinangun Kidul, Kecamatan Tingkir, Kota Salatiga",
      penerbit: "Portal Resmi Kampung KB",
      url: "https://kampungkb.kemendukbangga.go.id/kampung/56777/kampung-kb-rppa-lincah"
    },
    {
      penulis: "Pemerintah Provinsi Jawa Tengah",
      tahun: "2026",
      judul: "Ribuan orang padati Gebyar Sidorejo Kidul Salatiga, padukan UMKM, budaya, hingga layanan publik",
      penerbit: "Berita Daerah Provinsi Jawa Tengah",
      url: "https://jatengprov.go.id/beritadaerah/ribuan-orang-padati-gebyar-sidorejo-kidul-salatiga-padukan-umkm-budaya-hingga-layanan-publik"
    }
  ];

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-4 relative z-10">
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-sky-100 space-y-8">
        
        {/* Header Seksi */}
        <div className="border-b border-sky-100 pb-5">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 border border-sky-200/60 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Landmark className="w-4 h-4 text-sky-500" />
            <span>Gambaran Umum Wilayah & Ekonomi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-sky-950 tracking-tight">
            Perkembangan Perekonomian di Kelurahan Kutowinangun Kidul, Kota Salatiga
          </h2>
          <p className="text-xs sm:text-sm text-sky-700 font-medium mt-1">
            Kecamatan Tingkir, Kota Salatiga, Provinsi Jawa Tengah
          </p>
        </div>

        {/* Ringkasan Statistik Singkat */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-100 space-y-1">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">Pemekaran Wilayah</span>
            <p className="text-lg font-black text-sky-950">Tahun 2015</p>
            <p className="text-[11px] text-sky-700 font-medium">Pemekaran Kelurahan Kutowinangun</p>
          </div>
          <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-100 space-y-1">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">Cakupan Wilayah</span>
            <p className="text-lg font-black text-sky-950">8 RW / 70 RT</p>
            <p className="text-[11px] text-sky-700 font-medium">Luas Wilayah ± 102 Hektare</p>
          </div>
          <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-100 space-y-1">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">Demografi Penduduk</span>
            <p className="text-lg font-black text-sky-950">6.084 Jiwa</p>
            <p className="text-[11px] text-sky-700 font-medium">Tergabung dalam 2.254 KK</p>
          </div>
        </div>

        {/* Isi Narasi Utama */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          <p>
            Kelurahan Kutowinangun Kidul merupakan salah satu kelurahan di Kecamatan Tingkir, Kota Salatiga, Provinsi Jawa Tengah, yang terbentuk sejak tahun 2015 setelah pemekaran wilayah Kelurahan Kutowinangun menjadi Kutowinangun Lor dan Kutowinangun Kidul. Kelurahan ini sebelumnya merupakan wilayah Kelurahan Kutowinangun sebelum dibagi menjadi dua bagian tersebut. Secara administratif, wilayah ini terdiri atas 8 RW dan 70 RT dengan luas sekitar 102 hektare, dan berpenduduk 6.084 jiwa yang tergabung dalam 2.254 kepala keluarga.
          </p>

          <p>
            Dari sisi perekonomian, penggerak utama masyarakat Kutowinangun Kidul adalah sektor usaha mikro, kecil, dan menengah (UMKM). Dua produk unggulan yang dikenal luas dari wilayah ini adalah <strong className="text-sky-950 font-bold">Kopi Babah Kocomoto</strong> dan <strong className="text-sky-950 font-bold">Enting-enting Gepuk Cap 2 Holo</strong>, yang keduanya berperan menyerap tenaga kerja lokal sekaligus membantu program pemerintah dalam menekan angka pengangguran. Selain sektor kuliner, geliat ekonomi kreatif berbasis komunitas juga tumbuh di tingkat kampung. Di Kampung Rekesan, wilayah Nanggulan, para remaja dan pemuda yang sebelumnya dipandang kurang produktif dibina untuk membuat kerajinan lampu hias berbahan pipa paralon, yang kemudian berkembang menjadi usaha bernilai ekonomis dengan permintaan yang terus meningkat dari warga sekitar maupun luar daerah, sebuah perubahan yang didorong oleh program pembinaan UMKM yang digagas oleh salah satu warga setempat.
          </p>

          <p>
            Pemberdayaan ekonomi warga di kelurahan ini juga didukung melalui program Kampung Keluarga Berkualitas Ramah Perempuan Peduli Anak (Kampung KBRPPA) bernama <strong className="text-sky-950 font-bold">"LINCAH"</strong>, yang menjadi pendekatan pembangunan untuk meningkatkan kualitas sumber daya manusia sekaligus memperkuat institusi keluarga di wilayah tersebut. Program semacam ini sejalan dengan arah kebijakan Pemerintah Kota Salatiga yang tengah mendorong pengembangan UMKM berbasis ekonomi kreatif, antara lain melalui rancangan peraturan daerah yang bertujuan meningkatkan kapasitas pelaku usaha, memfasilitasi perolehan Hak Kekayaan Intelektual (HAKI), serta mendampingi proses sertifikasi dan standardisasi produk agar lebih kompetitif di pasar.
          </p>

          <p>
            Tren positif ini juga tampak pada level kecamatan, di mana kelurahan-kelurahan tetangga seperti Sidorejo Kidul rutin menggelar kegiatan bazar UMKM berskala besar yang memadukan promosi produk lokal dengan pelestarian seni budaya, sebuah pola yang turut memperkuat ekosistem ekonomi kerakyatan di wilayah Kecamatan Tingkir secara keseluruhan. Dengan kombinasi antara produk unggulan UMKM, kreativitas ekonomi berbasis pemuda, dan dukungan kebijakan pemerintah daerah, perekonomian Kelurahan Kutowinangun Kidul menunjukkan arah perkembangan yang cukup dinamis meski masih berskala usaha mikro dan menengah.
          </p>
        </div>

        {/* Daftar Pustaka / Referensi */}
        <div className="pt-6 border-t border-sky-100 space-y-3">
          <div className="flex items-center gap-2 text-sky-950 font-bold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-sky-500" />
            <span>Daftar Pustaka / Sumber Data</span>
          </div>
          <ul className="space-y-2 text-[11px] text-slate-600">
            {referensiList.map((ref, idx) => (
              <li key={idx} className="bg-sky-50/30 p-2.5 rounded-xl border border-sky-100/60 leading-snug">
                <span className="font-semibold text-slate-800">{ref.penulis}.</span> ({ref.tahun}). <i>{ref.judul}</i>. {ref.penerbit}.
                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-sky-600 hover:text-sky-800 font-semibold ml-1 underline transition-colors"
                  >
                    <span>Buka Sumber</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}