import React, { useState } from 'react';
import { X, Loader2, MapPin, Phone } from 'lucide-react';

export default function AddUmkmModal({ setIsAddModalOpen, umkmList, setUmkmList }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    namaUsaha: '',
    pemilik: '',
    jenisKelamin: 'L',
    usia: 35,
    kategori: 'Makanan',
    kelompokUsaha: 'PERDAGANGAN',
    jenisBarangJasa: '',
    alamat: '',
    rtRw: 'RT 01 / RW 01',
    rw: '01',
    kontak: '',
    linkGmaps: '', // <--- FIELD GOOGLE MAPS
    jamOperasional: '08.00 - 17.00 WIB',
    deskripsi: '',
    gambar: '',
    produkUnggulanStr: ''
  });

  const handleAddUmkm = async (e) => {
    e.preventDefault();
    if (!formData.namaUsaha || !formData.pemilik) return;

    setIsSubmitting(true);

    const extractedRw = formData.rtRw.includes('RW') 
      ? formData.rtRw.split('RW')[1].trim() 
      : '01';

    const newUmkmData = {
      no: umkmList.length + 1,
      namaUsaha: formData.namaUsaha,
      pemilik: formData.pemilik,
      jenisKelamin: formData.jenisKelamin,
      usia: parseInt(formData.usia) || '-',
      kategori: formData.kategori,
      subKategori: formData.kelompokUsaha || 'PERDAGANGAN',
      kelompokUsaha: formData.kelompokUsaha || 'PERDAGANGAN',
      jenisBarangJasa: formData.jenisBarangJasa || 'PRODUK UMKM',
      alamat: formData.alamat || 'Kutowinangun Kidul',
      rtRw: formData.rtRw,
      rw: extractedRw,
      kontak: formData.kontak || '08123456789',
      linkGmaps: formData.linkGmaps || '', // <--- TERKIRIM KE BACKEND
      deskripsi: formData.deskripsi || 'Sektor UMKM Kelurahan Kutowinangun Kidul.',
      gambar: formData.gambar || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      jamOperasional: formData.jamOperasional,
      produkUnggulan: formData.produkUnggulanStr ? formData.produkUnggulanStr.split(',').map(s => s.trim()) : ['Produk Unggulan'],
      tahunBerdiri: '2026',
      status: 'Aktif'
    };

    try {
      const response = await fetch('http://localhost:5000/api/umkm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUmkmData)
      });

      if (!response.ok) throw new Error('Gagal menyimpan data ke server');

      const savedUmkm = await response.json();
      setUmkmList([savedUmkm, ...umkmList]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error saat menambah UMKM:', error);
      alert('Gagal menyimpan data ke database. Pastikan server backend berjalan!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-sky-950/20 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:hidden">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-xl border border-sky-100 my-8">
        <div className="flex items-center justify-between border-b border-sky-100 pb-4">
          <div>
            <h3 className="text-base font-black text-sky-950">Formulir Pendataan UMKM 2026</h3>
            <p className="text-xs text-sky-700 font-medium">Kelurahan Kutowinangun Kidul</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(false)}
            disabled={isSubmitting}
            className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleAddUmkm} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-sky-950 mb-1">Nama Usaha *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Toko Berkah Jaya"
              value={formData.namaUsaha}
              onChange={e => setFormData({ ...formData, namaUsaha: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="block font-bold text-sky-950 mb-1">Nama Pengusaha *</label>
              <input
                type="text"
                required
                placeholder="Nama lengkap"
                value={formData.pemilik}
                onChange={e => setFormData({ ...formData, pemilik: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-sky-950 mb-1">L/P *</label>
              <select
                value={formData.jenisKelamin}
                onChange={e => setFormData({ ...formData, jenisKelamin: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium cursor-pointer"
              >
                <option value="L">Laki-Laki (L)</option>
                <option value="P">Perempuan (P)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-sky-950 mb-1">Usia (Th)</label>
              <input
                type="text"
                placeholder="Contoh: 45"
                value={formData.usia}
                onChange={e => setFormData({ ...formData, usia: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-sky-950 mb-1">Kelompok Usaha</label>
              <select
                value={formData.kelompokUsaha}
                onChange={e => setFormData({ ...formData, kelompokUsaha: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium cursor-pointer"
              >
                <option value="PERDAGANGAN">PERDAGANGAN</option>
                <option value="PRODUKSI/NON PERTANIAN">PRODUKSI/NON PERTANIAN</option>
                <option value="JASA">JASA</option>
                <option value="KULINER">KULINER</option>
                <option value="KONVEKSI">KONVEKSI</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-sky-950 mb-1">Wilayah RT / RW</label>
              <input
                type="text"
                placeholder="Contoh: RT 02 RW 01"
                value={formData.rtRw}
                onChange={e => setFormData({ ...formData, rtRw: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-sky-950 mb-1">Jenis Barang/Jasa Utama *</label>
            <input
              type="text"
              required
              placeholder="Contoh: KULINER / PENJAHIT"
              value={formData.jenisBarangJasa}
              onChange={e => setFormData({ ...formData, jenisBarangJasa: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-sky-950 mb-1">Alamat Usaha Lengkap</label>
            <input
              type="text"
              placeholder="Jl. Serayu No..."
              value={formData.alamat}
              onChange={e => setFormData({ ...formData, alamat: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
            />
          </div>

          {/* INPUT KONTAK / WHATSAPP */}
          <div>
            <label className="block font-bold text-sky-950 mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-sky-500" />
              <span>No. WhatsApp / Kontak</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: 08123456789"
              value={formData.kontak}
              onChange={e => setFormData({ ...formData, kontak: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
            />
          </div>

          {/* INPUT LINK / EMBED GOOGLE MAPS */}
          <div>
            <label className="block font-bold text-sky-950 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-500" />
              <span>Link Google Maps / Embed Peta (Opsional)</span>
            </label>
            <input
              type="text"
              placeholder="Tempel link Google Maps / kode iframe di sini"
              value={formData.linkGmaps}
              onChange={e => setFormData({ ...formData, linkGmaps: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-all border border-sky-400/30 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan ke Database...
                </>
              ) : (
                'Simpan Data Ke Laporan'
              )}
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-3 bg-sky-50 hover:bg-sky-100 text-sky-900 font-bold text-xs rounded-xl border border-sky-100 cursor-pointer disabled:opacity-50"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}