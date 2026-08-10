import React, { useState } from 'react';
import { X, Loader2, MapPin, Phone, Upload, Image as ImageIcon, Images } from 'lucide-react';

export default function AddUmkmModal({ setIsAddModalOpen, umkmList, setUmkmList }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileGambar, setFileGambar] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // State untuk menyimpan galeri foto produk (soto, menu, dll)
  const [galeriFiles, setGaleriFiles] = useState([]);
  const [galeriPreviews, setGaleriPreviews] = useState([]);

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
    linkGmaps: '',
    jamOperasional: '08.00 - 17.00 WIB',
    deskripsi: '',
    produkUnggulanStr: ''
  });

  // Handler Foto Sampul Utama
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileGambar(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handler Galeri Foto Produk (Bisa Pilih Banyak Foto Sekaligus)
  const handleGaleriChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setGaleriFiles(prev => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setGaleriPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  // Handler Hapus 1 Foto Galeri tertentu
  const handleRemoveGaleriItem = (index) => {
    setGaleriFiles(prev => prev.filter((_, i) => i !== index));
    setGaleriPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddUmkm = async (e) => {
    e.preventDefault();
    if (!formData.namaUsaha || !formData.pemilik) return;

    setIsSubmitting(true);

    const extractedRw = formData.rtRw.includes('RW') 
      ? formData.rtRw.split('RW')[1].trim() 
      : '01';

    const bodyFormData = new FormData();
    bodyFormData.append('no', umkmList.length + 1);
    bodyFormData.append('namaUsaha', formData.namaUsaha);
    bodyFormData.append('pemilik', formData.pemilik);
    bodyFormData.append('jenisKelamin', formData.jenisKelamin);
    bodyFormData.append('usia', parseInt(formData.usia) || '-');
    bodyFormData.append('kategori', formData.kategori);
    bodyFormData.append('subKategori', formData.kelompokUsaha || 'PERDAGANGAN');
    bodyFormData.append('kelompokUsaha', formData.kelompokUsaha || 'PERDAGANGAN');
    bodyFormData.append('jenisBarangJasa', formData.jenisBarangJasa || 'PRODUK UMKM');
    bodyFormData.append('alamat', formData.alamat || 'Kutowinangun Kidul');
    bodyFormData.append('rtRw', formData.rtRw);
    bodyFormData.append('rw', extractedRw);
    bodyFormData.append('kontak', formData.kontak || '08123456789');
    bodyFormData.append('linkGmaps', formData.linkGmaps || '');
    bodyFormData.append('deskripsi', formData.deskripsi || 'Sektor UMKM Kelurahan Kutowinangun Kidul.');
    bodyFormData.append('jamOperasional', formData.jamOperasional);
    bodyFormData.append('tahunBerdiri', '2026');
    bodyFormData.append('status', 'Aktif');

    const produkArr = formData.produkUnggulanStr 
      ? formData.produkUnggulanStr.split(',').map(s => s.trim()) 
      : ['Produk Unggulan'];
    bodyFormData.append('produkUnggulan', JSON.stringify(produkArr));

    // Append Foto Utama jika ada
    if (fileGambar) {
      bodyFormData.append('gambar', fileGambar);
    }

    // Append Semua Foto Galeri Produk ke field 'galeri'
    if (galeriFiles.length > 0) {
      galeriFiles.forEach((file) => {
        bodyFormData.append('galeri', file);
      });
    }

    try {
      // Menggunakan VITE_API_URL dinamis dari Environment Variable Vercel / .env
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/umkm`, {
        method: 'POST',
        body: bodyFormData
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
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-xl border border-sky-100 my-8 max-h-[90vh] overflow-y-auto">
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
          
          {/* UPLOAD FOTO UTAMA */}
          <div>
            <label className="block font-bold text-sky-950 mb-1 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-sky-500" />
              <span>Foto Utama Tempat Usaha</span>
            </label>
            
            {imagePreview && (
              <div className="mb-2 relative w-full h-36 rounded-2xl overflow-hidden border border-sky-200">
                <img src={imagePreview} alt="Preview Usaha" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setFileGambar(null); setImagePreview(null); }}
                  className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1 shadow-md hover:bg-rose-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-sky-200 rounded-2xl cursor-pointer bg-sky-50/30 hover:bg-sky-50 transition-all">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-4 h-4 text-sky-500 mb-0.5" />
                  <p className="text-[11px] text-sky-800 font-semibold">Unggah Foto Utama Tempat Usaha</p>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          {/* UPLOAD GALERI FOTO PRODUK / SOTO / MENU */}
          <div>
            <label className="block font-bold text-sky-950 mb-1 flex items-center gap-1">
              <Images className="w-3.5 h-3.5 text-sky-500" />
              <span>Foto Produk / Makanan / Suasana Usaha (Pilih Banyak)</span>
            </label>

            {/* List Pratinjau Foto Galeri */}
            {galeriPreviews.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mb-2">
                {galeriPreviews.map((src, idx) => (
                  <div key={idx} className="relative w-full h-16 rounded-xl overflow-hidden border border-sky-200 group">
                    <img src={src} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGaleriItem(idx)}
                      className="absolute top-1 right-1 bg-rose-500 text-white rounded-full p-0.5 shadow-md hover:bg-rose-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-sky-200 rounded-2xl cursor-pointer bg-sky-50/30 hover:bg-sky-50 transition-all">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-4 h-4 text-sky-500 mb-0.5" />
                  <p className="text-[11px] text-sky-800 font-semibold">Klik untuk pilih foto produk/soto (Bisa {">"}1 file)</p>
                  <p className="text-[9px] text-sky-500">Maksimal 8 foto galeri</p>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={handleGaleriChange} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          {/* NAMA USAHA */}
          <div>
            <label className="block font-bold text-sky-950 mb-1">Nama Usaha *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Soto Ayam Pak Yono"
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
                <option value="KULINER">KULINER</option>
                <option value="PERDAGANGAN">PERDAGANGAN</option>
                <option value="PRODUKSI/NON PERTANIAN">PRODUKSI/NON PERTANIAN</option>
                <option value="JASA">JASA</option>
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
              placeholder="Contoh: SOTO AYAM / KULINER LOKAL"
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