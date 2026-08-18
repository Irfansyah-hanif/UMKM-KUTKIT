import React, { useState } from 'react';
import { Landmark, BookOpen, ExternalLink, Languages } from 'lucide-react';

export default function HistorySection() {
  const [lang, setLang] = useState('id');

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
        
        {/* Header Seksi & Tombol Switch Bahasa */}
        <div className="border-b border-sky-100 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 border border-sky-200/60 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <Landmark className="w-4 h-4 text-sky-500" />
              <span>{lang === 'id' ? 'Gambaran Umum Wilayah & Ekonomi' : 'Overview of Area & Economy'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-sky-950 tracking-tight">
              {lang === 'id' 
                ? 'Perkembangan Perekonomian di Kelurahan Kutowinangun Kidul, Kota Salatiga' 
                : 'Economic Development in Kutowinangun Kidul Urban Village, Salatiga City'}
            </h2>
            <p className="text-xs sm:text-sm text-sky-700 font-medium mt-1">
              {lang === 'id'
                ? 'Kecamatan Tingkir, Kota Salatiga, Provinsi Jawa Tengah'
                : 'Tingkir District, Salatiga City, Central Java Province'}
            </p>
          </div>

          {/* Toggle Switch Bahasa */}
          <div className="flex items-center self-start sm:self-center gap-1 bg-sky-50 p-1.5 rounded-2xl border border-sky-200/80 shrink-0">
            <Languages className="w-4 h-4 text-sky-600 ml-1.5 mr-0.5" />
            <button
              type="button"
              onClick={() => setLang('id')}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                lang === 'id'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-sky-700 hover:text-sky-950'
              }`}
            >
              Indonesia
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-sky-700 hover:text-sky-950'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Ringkasan Statistik Singkat */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-100 space-y-1">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
              {lang === 'id' ? 'Pemekaran Wilayah' : 'Regional Division'}
            </span>
            <p className="text-lg font-black text-sky-950">{lang === 'id' ? 'Tahun 2015' : 'Year 2015'}</p>
            <p className="text-[11px] text-sky-700 font-medium">
              {lang === 'id' ? 'Pemekaran Kelurahan Kutowinangun' : 'Division of Kutowinangun Urban Village'}
            </p>
          </div>
          <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-100 space-y-1">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
              {lang === 'id' ? 'Cakupan Wilayah' : 'Area Coverage'}
            </span>
            <p className="text-lg font-black text-sky-950">8 RW / 70 RT</p>
            <p className="text-[11px] text-sky-700 font-medium">
              {lang === 'id' ? 'Luas Wilayah ± 102 Hektare' : 'Total Area ± 102 Hectares'}
            </p>
          </div>
          <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-100 space-y-1">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
              {lang === 'id' ? 'Demografi Penduduk' : 'Demographics'}
            </span>
            <p className="text-lg font-black text-sky-950">
              {lang === 'id' ? '6.084 Jiwa' : '6,084 Residents'}
            </p>
            <p className="text-[11px] text-sky-700 font-medium">
              {lang === 'id' ? 'Tergabung dalam 2.254 KK' : 'Across 2,254 Households'}
            </p>
          </div>
        </div>

        {/* Isi Narasi Utama (Dinamis ID / EN) */}
        {lang === 'id' ? (
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
        ) : (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            <p>
              Kutowinangun Kidul is an urban Village located in Tingkir District, Salatiga City, Central Java. Established in 2015 following the division of the former Kutowinangun Urban Village into Kutowinangun Lor and Kutowinangun Kidul, the area covers approximately 102 hectares. Administratively, Kutowinangun Kidul consists of 8 community units and 70 neighborhood units, with a population of 6,084 residents living across 2,254 households.
            </p>

            <p>
              The local economy of Kutowinangun Kidul is largely driven by Micro, Small, and Medium Enterprises (UMKM), which play an important role in creating employment opportunities and supporting the livelihoods of local residents. Among the area's well-known local products are <strong className="text-sky-950 font-bold">Kopi Babah Kacamata</strong> and <strong className="text-sky-950 font-bold">Enting-enting Gepuk Cap 2 Holo</strong>. These businesses not only contribute to the local economy but also help create job opportunities and support efforts to reduce unemployment in the community.
            </p>

            <p>
              Economic activity in Kutowinangun Kidul extends beyond the culinary sector. Community-based creative businesses have also begun to emerge, particularly through initiatives involving local youth. In Kampung Rekesan, Nanggulan, teenagers and young people have been encouraged to develop their creativity by producing decorative lamps made from pipes. With guidance and support from a local UMKM development initiative, what began as a small community activity has gradually developed into an economically valuable business, attracting growing demand from residents as well as customers from outside the area.
            </p>

            <p>
              Community empowerment is another important part of the economic development process in Kutowinangun Kidul. One of the initiatives supporting this effort is <strong className="text-sky-950 font-bold">"LINCAH"</strong>, a Kampung Keluarga Berkualitas Ramah Perempuan Peduli Anak (Kampung KBRPPA) program that focuses on strengthening families, empowering women, and promoting child-friendly communities. Through initiatives such as LINCAH, community development is not only focused on economic activities but also on improving the quality of human resources and strengthening families as an important foundation of community life.
            </p>

            <p>
              These local initiatives are also in line with the broader efforts of the Salatiga City Government to strengthen UMKMs and develop the creative economy. Government support includes efforts to improve the capacity of business owners, facilitate Intellectual Property Rights (HKI), and provide assistance with product certification and standardization. Such support is expected to help local businesses improve the quality of their products, expand their market reach, and compete more effectively in a wider market.
            </p>

            <p>
              The positive development of the local economy can also be seen across the wider Tingkir District. Neighboring urban villages, such as Sidorejo Kidul, regularly organize large-scale UMKM bazaars that combine the promotion of local products with cultural and artistic activities. These events provide opportunities for local entrepreneurs to introduce their products to a broader audience while also contributing to the preservation of local arts and cultural traditions. Together, these activities help strengthen the community-based economic ecosystem throughout the district.
            </p>

            <p>
              The economic development of Kutowinangun Kidul demonstrates how local products, community creativity, and youth participation can contribute to sustainable economic growth. From established culinary businesses to creative initiatives developed by local young people, the community continues to explore new opportunities based on its own potential and resources.
            </p>

            <p>
              Although most businesses in the area remain at the micro and small-to-medium scale, their contribution to employment, household income, and community empowerment is significant. With continued collaboration among residents, local entrepreneurs, community organizations, and the local government, Kutowinangun Kidul has strong potential to further develop its local economy while maintaining the unique character and creativity of its community.
            </p>
          </div>
        )}

        {/* Daftar Pustaka / Referensi */}
        <div className="pt-6 border-t border-sky-100 space-y-3">
          <div className="flex items-center gap-2 text-sky-950 font-bold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-sky-500" />
            <span>{lang === 'id' ? 'Daftar Pustaka / Sumber Data' : 'References / Data Sources'}</span>
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
                    <span>{lang === 'id' ? 'Buka Sumber' : 'Open Source'}</span>
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