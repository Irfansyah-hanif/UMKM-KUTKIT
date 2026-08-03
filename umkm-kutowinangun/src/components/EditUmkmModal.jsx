import React, { useState, useEffect } from 'react';
import { X, Loader2, Save, MapPin, Phone, Upload, Image as ImageIcon } from 'lucide-react';

export default function EditUmkmModal({ editingUmkm, setEditingUmkm, onEdit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileGambar, setFileGambar] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    namaUsaha: '',
    pemilik: '',
    jenisKelamin: 'L',
    usia: '',
    kategori: 'Makanan',
    kelompokUsaha: 'PERDAGANGAN',
    jenisBarangJasa: '',
    alamat: '',
    rtRw: '',
    rw: '01',
    kontak: '',
    linkGmaps: '',
    jamOperasional: '',
    deskripsi: '',
    produkUnggulanStr: ''
  });

  useEffect(() => {
    if (editingUmkm) {
      setFormData({
        namaUsaha: editingUmkm.namaUsaha || '',
        pemilik: editingUmkm.pemilik || '',
        jenisKelamin: editingUmkm.jenisKelamin || 'L',
        usia: editingUmkm.usia || '',
        kategori: editingUmkm.kategori || 'Makanan',
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
          : editingUmkm.produkUnggulan || ''
      });

      // Preview gambar lama jika ada
      if (editingUmkm.gambar) {
        const existingImg = editingUmkm.gambar.startsWith('http') 
          ? editingUmkm.gambar 
          : `http://localhost:5000${editingUmkm.gambar}`;
        setImagePreview(existingImg);
      } else {
        setImagePreview(null);
      }
      setFileGambar(null);
    }
  }, [editingUmkm]);

  if (!editingUmkm) return null;

  // Handler saat file gambar baru dipilih oleh admin
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileGambar(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const extractedRw = formData.rtRw.includes('RW') 
      ? formData.rtRw.split('RW')[1].trim() 
      : formData.rw || '01';

    // 1. Menggunakan FormData agar mendukung pengiriman File + Teks
    const bodyFormData = new FormData();
    bodyFormData.append('namaUsaha', formData.namaUsaha);
    bodyFormData.append('pemilik', formData.pemilik);
    bodyFormData.append('jenisKelamin', formData.jenisKelamin);
    bodyFormData.append('usia', parseInt(formData.usia) || '-');
    bodyFormData.append('kategori', formData.kategori);
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

    // Jika admin mengunggah foto baru
    if (fileGambar) {
      bodyFormData.append('gambar', fileGambar);
    }

    try {
      // Panggil fungsi onEdit dengan ID dan FormData
      await onEdit(editingUmkm._id, bodyFormData);
      setEditingUmkm(null);
    } catch (error) {
      console.error('Error saat update UMKM:', error);
      alert('Gagal memperbarui data UMKM.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-sky-950/30 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:hidden">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-sky-100 my-8">
        <div className="flex items-center justify-between border-b border-sky-100 pb-4">
          <div>
            <h3 className="text-base font-black text-sky-950">Edit Data UMKM</h3>
            <p className="text-xs text-sky-700 font-medium">Perbarui informasi pelaku usaha</p>
          </div>
          <button
            onClick={() => setEditingUmkm(null)}
            className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* UPLOAD FOTO USAHA BARU */}
          <div>
            <label className="block font-bold text-sky-950 mb-1 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-sky-500" />
              <span>Foto Usaha / Produk (Ganti Gambar)</span>
            </label>
            
            {imagePreview && (
              <div className="mb-2 relative w-full h-36 rounded-2xl overflow-hidden border border-sky-200">
                <img src={imagePreview} alt="Preview Usaha" className="w-full h-full object-cover" />
                {fileGambar && (
                  <button
                    type="button"
                    onClick={() => { setFileGambar(null); setImagePreview(editingUmkm.gambar ? `http://localhost:5000${editingUmkm.gambar}` : null); }}
                    className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1 shadow-md hover:bg-rose-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-sky-200 rounded-2xl cursor-pointer bg-sky-50/30 hover:bg-sky-50 transition-all">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-4 h-4 text-sky-500 mb-1" />
                  <p className="text-[11px] text-sky-800 font-semibold">Pilih foto baru untuk mengganti</p>
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
              <label className="block font-bold text-sky-950 mb-1">Pengusaha *</label>
              <input
                type="text"
                required
                value={formData.pemilik}
                onChange={e => setFormData({ ...formData, pemilik: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-sky-950 mb-1">L/P</label>
              <select
                value={formData.jenisKelamin}
                onChange={e => setFormData({ ...formData, jenisKelamin: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
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
                onChange={e => setFormData({ ...formData, kelompokUsaha: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
              >
                <option value="PERDAGANGAN">PERDAGANGAN</option>
                <option value="PRODUKSI/NON PERTANIAN">PRODUKSI/NON PERTANIAN</option>
                <option value="JASA">JASA</option>
                <option value="KULINER">KULINER</option>
                <option value="KONVEKSI">KONVEKSI</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-sky-950 mb-1">RT / RW</label>
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
            <label className="block font-bold text-sky-950 mb-1">Alamat Usaha</label>
            <input
              type="text"
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
              value={formData.linkGmaps}
              onChange={e => setFormData({ ...formData, linkGmaps: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 font-medium"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setEditingUmkm(null)}
              className="px-4 py-3 bg-sky-50 hover:bg-sky-100 text-sky-900 font-bold text-xs rounded-xl border border-sky-100 cursor-pointer"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}