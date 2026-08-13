import React, { useState } from 'react';
import { X, Loader2, MapPin, Phone, Upload, Image as ImageIcon, Images } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddUmkmModal({ setIsAddModalOpen, umkmList, setUmkmList }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileGambar, setFileGambar] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [galeriFiles, setGaleriFiles] = useState([]);
  const [galeriPreviews, setGaleriPreviews] = useState([]);

  // Batas Maksimal Ukuran File per Gambar (2 MB)
  const MAX_FILE_SIZE = 2 * 1024 * 1024; 

  // Daftar Opsi Kelompok Usaha / Kategori Terpadu
  const opsiKategori = [
    'KULINER',
    'PERDAGANGAN',
    'PRODUKSI/NON PERTANIAN',
    'JASA',
    'KONVEKSI'
  ];

  const [formData, setFormData] = useState({
    namaUsaha: '',
    pemilik: '',
    jenisKelamin: 'L',
    kategori: 'PERDAGANGAN',
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

  const handleKategoriChange = (val) => {
    setFormData(prev => ({
      ...prev,
      kelompokUsaha: val,
      kategori: val
    }));
  };

  // Validasi Foto Utama Maksimal 2 MB
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error('Foto utama terlalu besar! Maksimal ukuran file adalah 2 MB.');
        e.target.value = ''; // Reset input file
        return;
      }
      setFileGambar(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Validasi Foto Galeri Maksimal 2 MB per File
  const handleGaleriChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File "${file.name}" dilewati karena ukurannya melebihi 2 MB!`);
      } else {
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      setGaleriFiles(prev => [...prev, ...validFiles]);
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setGaleriPreviews(prev => [...prev, ...newPreviews]);
    }

    e.target.value = ''; // Reset input file agar bisa pilih file yang sama jika perlu
  };

  const handleRemoveGaleriItem = (index) => {
    setGaleriFiles(prev => prev.filter((_, i) => i !== index));
    setGaleriPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddUmkm = async (e) => {
    e.preventDefault();
    if (!formData.namaUsaha || !formData.pemilik) return;

    setIsSubmitting(true);
    const toastId = toast.loading('Menyimpan data UMKM ke database...');

    // EKSTRAKSI RW PRESISI: Mengekstrak angka RW dari string RT/RW (misal "RT 02 / RW 01" -> "01")
    const matchRw = formData.rtRw.match(/RW\s*(\d+)/i);
    const extractedRw = matchRw 
      ? matchRw[1].padStart(2, '0') 
      : (formData.rw || '01').padStart(2, '0');

    const bodyFormData = new FormData();
    bodyFormData.append('no', umkmList.length + 1);
    bodyFormData.append('namaUsaha', formData.namaUsaha);
    bodyFormData.append('pemilik', formData.pemilik);
    bodyFormData.append('jenisKelamin', formData.jenisKelamin);
    bodyFormData.append('kategori', formData.kategori);
    bodyFormData.append('subKategori', formData.kelompokUsaha);
    bodyFormData.append('kelompokUsaha', formData.kelompokUsaha);
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

    if (fileGambar) {
      bodyFormData.append('gambar', fileGambar);
    }

    if (galeriFiles.length > 0) {
      galeriFiles.forEach((file) => {
        bodyFormData.append('galeri', file);
      });
    }

    try {
      const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      let baseUrl = rawApiUrl.trim().replace(/\/+$/, '');
      if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        baseUrl = `https://${baseUrl}`;
      }

      const response = await fetch(`${baseUrl}/api/umkm`, {
        method: 'POST',
        body: bodyFormData
      });

      if (!response.ok) {
        if (response.status === 413) {
          throw new Error('Ukuran total data/foto terlalu besar! Coba kurangi foto galeri.');
        }
        throw new Error('Gagal menyimpan data ke server');
      }

      const savedUmkm = await response.json();
      setUmkmList([savedUmkm, ...umkmList]);
      setIsAddModalOpen(false);

      toast.success('✨ Data UMKM baru berhasil disimpan!', { id: toastId });
    } catch (error) {
      console.error('Error saat menambah UMKM:', error);
      toast.error(error.message || 'Gagal menyimpan data ke database!', { id: toastId });
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
            <label className="block font-bold text-sky-950 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-sky-500" />
                <span>Foto Utama Tempat Usaha</span>
              </span>
              <span className="text-[10px] text-sky-500 font-normal">(Maks. 2 MB)</span>
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
                  <p className="text-[9px] text-sky-500">Maksimal 2 MB</p>
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

          {/* UPLOAD GALERI FOTO PRODUK */}
          <div>
            <label className="block font-bold text-sky-950 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Images className="w-3.5 h-3.5 text-sky-500" />
                <span>Foto Produk / Makanan / Suasana Usaha</span>
              </span>
              <span className="text-[10px] text-sky-500 font-normal">(Maks. 2 MB / file)</span>
            </label>

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
                  <p className="text-[11px] text-sky-800 font-semibold">Klik untuk pilih foto produk</p>
                  <p className="text-[9px] text-sky-500">Maksimal 2 MB per foto</p>
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
              placeholder="Contoh: Bengkel Ketok Magic Jaya"
              value={formData.namaUsaha}
              onChange={e => setFormData({ ...formData, namaUsaha: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
            />
          </div>

          {/* NAMA PENGUSAHA & JENIS KELAMIN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
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
          </div>

          {/* KELOMPOK USAHA / KATEGORI */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-sky-950 mb-1">Kelompok Usaha *</label>
              <select
                value={formData.kelompokUsaha}
                onChange={e => handleKategoriChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-bold text-sky-900 cursor-pointer"
              >
                {opsiKategori.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
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
              placeholder="Contoh: JASA PERBAIKAN MOBIL / KONVEKSI KAOS"
              value={formData.jenisBarangJasa}
              onChange={e => setFormData({ ...formData, jenisBarangJasa: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-sky-950 mb-1">Alamat Usaha Lengkap</label>
            <input
              type="text"
              placeholder="Jl. Solo - Purwodadi..."
              value={formData.alamat}
              onChange={e => setFormData({ ...formData, alamat: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
            />
          </div>

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