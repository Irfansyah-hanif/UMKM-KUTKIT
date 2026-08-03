import React, { useState, useEffect } from 'react';
import { X, Loader2, Save, MapPin, Phone } from 'lucide-react';

export default function EditUmkmModal({ editingUmkm, setEditingUmkm, onEdit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    linkGmaps: '', // <--- FIELD GOOGLE MAPS
    jamOperasional: '',
    deskripsi: '',
    gambar: '',
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
        linkGmaps: editingUmkm.linkGmaps || '', // <--- AUTOFILL FIELD GMAPS
        jamOperasional: editingUmkm.jamOperasional || '08.00 - 17.00 WIB',
        deskripsi: editingUmkm.deskripsi || '',
        gambar: editingUmkm.gambar || '',
        produkUnggulanStr: Array.isArray(editingUmkm.produkUnggulan) 
          ? editingUmkm.produkUnggulan.join(', ') 
          : editingUmkm.produkUnggulan || ''
      });
    }
  }, [editingUmkm]);

  if (!editingUmkm) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const extractedRw = formData.rtRw.includes('RW') 
      ? formData.rtRw.split('RW')[1].trim() 
      : formData.rw || '01';

    const updatedData = {
      ...editingUmkm,
      namaUsaha: formData.namaUsaha,
      pemilik: formData.pemilik,
      jenisKelamin: formData.jenisKelamin,
      usia: parseInt(formData.usia) || '-',
      kategori: formData.kategori,
      kelompokUsaha: formData.kelompokUsaha,
      jenisBarangJasa: formData.jenisBarangJasa,
      alamat: formData.alamat,
      rtRw: formData.rtRw,
      rw: extractedRw,
      kontak: formData.kontak,
      linkGmaps: formData.linkGmaps, // <--- UPDATE GOOGLE MAPS KE DB
      deskripsi: formData.deskripsi,
      gambar: formData.gambar,
      jamOperasional: formData.jamOperasional,
      produkUnggulan: formData.produkUnggulanStr ? formData.produkUnggulanStr.split(',').map(s => s.trim()) : ['Produk Unggulan']
    };

    await onEdit(editingUmkm._id, updatedData);
    setIsSubmitting(false);
    setEditingUmkm(null);
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