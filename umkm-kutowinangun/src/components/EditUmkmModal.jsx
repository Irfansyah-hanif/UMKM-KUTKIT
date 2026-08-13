import React, { useState, useEffect } from 'react';
import { X, Loader2, MapPin, Phone, Upload, Image as ImageIcon, Images } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EditUmkmModal({ editingUmkm, setEditingUmkm, onEdit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileGambar, setFileGambar] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // State untuk Galeri Foto Tambahan
  const [galeriFiles, setGaleriFiles] = useState([]);
  const [galeriPreviews, setGaleriPreviews] = useState([]);
  const [existingGaleri, setExistingGaleri] = useState([]);

  // Batas Maksimal Ukuran File per Gambar (2 MB)
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const [formData, setFormData] = useState({
    namaUsaha: '',
    pemilik: '',
    jenisKelamin: 'L',
    usia: 35,
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

  // Pre-fill Data saat Modal Buka
  useEffect(() => {
    if (editingUmkm) {
      setFormData({
        namaUsaha: editingUmkm.namaUsaha || '',
        pemilik: editingUmkm.pemilik || '',
        jenisKelamin: editingUmkm.jenisKelamin || 'L',
        usia: editingUmkm.usia || 35,
        kategori: editingUmkm.kategori || 'PERDAGANGAN',
        kelompokUsaha: editingUmkm.kelompokUsaha || 'PERDAGANGAN',
        jenisBarangJasa: editingUmkm.jenisBarangJasa || '',
        alamat: editingUmkm.alamat || '',
        rtRw: editingUmkm.rtRw || 'RT 01 / RW 01',
        rw: editingUmkm.rw || '01',
        kontak: editingUmkm.kontak || '',
        linkGmaps: editingUmkm.linkGmaps || '',
        jamOperasional: editingUmkm.jamOperasional || '08.00 - 17.00 WIB',
        deskripsi: editingUmkm.deskripsi || '',
        produkUnggulanStr: Array.isArray(editingUmkm.produkUnggulan) 
          ? editingUmkm.produkUnggulan.join(', ') 
          : (editingUmkm.produkUnggulan || '')
      });

      // Mengubah http:// menjadi https:// untuk mencegah Mixed Content Warning
      if (editingUmkm.gambar) {
        const secureGambar = editingUmkm.gambar.replace(/^http:\/\//i, 'https://');
        setImagePreview(secureGambar);
      } else {
        setImagePreview(null);
      }

      if (Array.isArray(editingUmkm.galeri)) {
        const secureGaleri = editingUmkm.galeri.map(url => typeof url === 'string' ? url.replace(/^http:\/\//i, 'https://') : url);
        setExistingGaleri(secureGaleri);
      } else {
        setExistingGaleri([]);
      }
    }
  }, [editingUmkm]);

  // Handler Foto Utama dengan Validasi 2 MB
  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error('Foto utama terlalu besar! Maksimal ukuran file adalah 2 MB.');
        e.target.value = '';
        return;
      }
      setFileGambar(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handler Galeri Tambahan dengan Validasi 2 MB per File
  const handleGaleriChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const validFiles = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File "${file.name}" dilewati karena ukurannya melebihi 2 MB!`);
      } else {
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      setGaleriFiles(prev => [...(prev || []), ...validFiles]);
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setGaleriPreviews(prev => [...(prev || []), ...newPreviews]);
    }

    e.target.value = '';
  };

  // Handler Hapus Galeri Tambahan Baru
  const handleRemoveNewGaleriItem = (index) => {
    setGaleriFiles(prev => (prev || []).filter((_, i) => i !== index));
    setGaleriPreviews(prev => (prev || []).filter((_, i) => i !== index));
  };

  // Handler Hapus Foto Galeri Lama
  const handleRemoveExistingGaleri = (index) => {
    setExistingGaleri(prev => (prev || []).filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.namaUsaha || !formData.pemilik) return;

    setIsSubmitting(true);

    // EKSTRAKSI RW PRESISI: Mengekstrak angka RW dari string RT/RW (misal "RT 02 / RW 01" -> "01")
    const matchRw = formData.rtRw ? formData.rtRw.match(/RW\s*(\d+)/i) : null;
    const extractedRw = matchRw 
      ? matchRw[1].padStart(2, '0') 
      : (formData.rw || '01').padStart(2, '0');

    const bodyFormData = new FormData();
    bodyFormData.append('namaUsaha', formData.namaUsaha);
    bodyFormData.append('pemilik', formData.pemilik);
    bodyFormData.append('jenisKelamin', formData.jenisKelamin);
    bodyFormData.append('usia', parseInt(formData.usia) || '-');
    bodyFormData.append('kategori', formData.kelompokUsaha);
    bodyFormData.append('kelompokUsaha', formData.kelompokUsaha);
    bodyFormData.append('jenisBarangJasa', formData.jenisBarangJasa);
    bodyFormData.append('alamat', formData.alamat);
    bodyFormData.append('rtRw', formData.rtRw);
    bodyFormData.append('rw', extractedRw);
    bodyFormData.append('kontak', formData.kontak);
    bodyFormData.append('linkGmaps', formData.linkGmaps);
    bodyFormData.append('deskripsi', formData.deskripsi);
    bodyFormData.append('jamOperasional', formData.jamOperasional);

    const produkArr = formData.produkUnggulanStr 
      ? formData.produkUnggulanStr.split(',').map(s => s.trim()) 
      : ['Produk Unggulan'];
    bodyFormData.append('produkUnggulan', JSON.stringify(produkArr));

    if (fileGambar) {
      bodyFormData.append('gambar', fileGambar);
    }

    // Append Galeri Baru
    const safeGaleriFiles = Array.isArray(galeriFiles) ? galeriFiles : [];
    if (safeGaleriFiles.length > 0) {
      safeGaleriFiles.forEach((file) => {
        bodyFormData.append('galeri', file);
      });
    }

    try {
      await onEdit(editingUmkm._id, bodyFormData);
    } catch (error) {
      console.error('Error saat update UMKM:', error);
      toast.error('Gagal memperbarui data UMKM!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-sky-950/20 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:hidden">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-xl border border-sky-100 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-sky-100 pb-4">
          <div>
            <h3 className="text-base font-black text-sky-950">Edit Data UMKM</h3>
            <p className="text-xs text-sky-700 font-medium">{formData.namaUsaha || 'Kelurahan Kutowinangun Kidul'}</p>
          </div>
          <button
            onClick={() => setEditingUmkm(null)}
            disabled={isSubmitting}
            className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* FOTO UTAMA */}
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
                  <p className="text-[11px] text-sky-800 font-semibold">Ganti Foto Utama Tempat Usaha</p>
                  <p className="text-[9px] text-sky-500">Maksimal 2 MB</p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* GALERI FOTO */}
          <div>
            <label className="block font-bold text-sky-950 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Images className="w-3.5 h-3.5 text-sky-500" />
                <span>Galeri Foto Produk / Suasana</span>
              </span>
              <span className="text-[10px] text-sky-500 font-normal">(Maks. 2 MB / file)</span>
            </label>

            {/* Foto Galeri Lama & Baru */}
            {((existingGaleri && existingGaleri.length > 0) || (galeriPreviews && galeriPreviews.length > 0)) && (
              <div className="grid grid-cols-4 gap-2 mb-2">
                {existingGaleri.map((src, idx) => (
                  <div key={`existing-${idx}`} className="relative w-full h-16 rounded-xl overflow-hidden border border-sky-200">
                    <img src={src} alt="Galeri Existing" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingGaleri(idx)}
                      className="absolute top-1 right-1 bg-rose-500 text-white rounded-full p-0.5 shadow-md hover:bg-rose-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {galeriPreviews.map((src, idx) => (
                  <div key={`new-${idx}`} className="relative w-full h-16 rounded-xl overflow-hidden border border-sky-200">
                    <img src={src} alt="Galeri Baru" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewGaleriItem(idx)}
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
                  <p className="text-[11px] text-sky-800 font-semibold">Tambah Foto Galeri Produk Baru</p>
                  <p className="text-[9px] text-sky-500">Maksimal 2 MB per foto</p>
                </div>
                <input type="file" accept="image/*" multiple onChange={handleGaleriChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* NAMA USAHA */}
          <div>
            <label className="block font-bold text-sky-950 mb-1">Nama Usaha *</label>
            <input
              type="text"
              required
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
                onChange={e => setFormData({ ...formData, kelompokUsaha: e.target.value, kategori: e.target.value })}
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
              value={formData.jenisBarangJasa}
              onChange={e => setFormData({ ...formData, jenisBarangJasa: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-sky-950 mb-1">Alamat Usaha Lengkap</label>
            <input
              type="text"
              value={formData.alamat}
              onChange={e => setFormData({ ...formData, alamat: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
            />
          </div>

          {/* KONTAK */}
          <div>
            <label className="block font-bold text-sky-950 mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-sky-500" />
              <span>No. WhatsApp / Kontak</span>
            </label>
            <input
              type="text"
              value={formData.kontak}
              onChange={e => setFormData({ ...formData, kontak: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
            />
          </div>

          {/* LINK GOOGLE MAPS */}
          <div>
            <label className="block font-bold text-sky-950 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-500" />
              <span>Link Google Maps / Embed Peta (Opsional)</span>
            </label>
            <input
              type="text"
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
                  Memperbarui Data...
                </>
              ) : (
                'Simpan Perubahan'
              )}
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setEditingUmkm(null)}
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