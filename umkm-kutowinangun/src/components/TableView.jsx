import React from 'react';
import { FileSpreadsheet, Download, Printer, Trash2, Edit, Eye } from 'lucide-react';

export default function TableView({ filteredUmkm, setSelectedUmkm, onDelete, onEdit }) {
  const handleExportCSV = () => {
    const headers = ["NO", "NAMA USAHA", "ALAMAT USAHA", "RW", "KELOMPOK LAPANGAN USAHA", "JENIS BARANG/JASA UTAMA"];
    const rows = filteredUmkm.map((item, index) => [
      index + 1,
      `"${(item.namaUsaha || '').replace(/"/g, '""')}"`,
      `"${(item.alamat || '').replace(/"/g, '""')}"`,
      item.rw,
      `"${(item.kelompokUsaha || '').replace(/"/g, '""')}"`,
      `"${(item.jenisBarangJasa || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + 
      ["DAFTAR UMKM KELURAHAN KUTOWINANGUN KIDUL KECAMATAN TINGKIR TAHUN 2026", "", headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `DAFTAR_UMKM_KUTOWINANGUN_KIDUL_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Table Export Action Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-sky-50/80 p-4 rounded-2xl border border-sky-200/70 print:hidden">
        <div>
          <h3 className="font-black text-sky-950 text-sm flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-sky-600" />
            Tabel Resmi Laporan UMKM Kelurahan Kutowinangun Kidul 2026
          </h3>
          <p className="text-xs text-sky-800 font-medium mt-0.5">
            Menampilkan {filteredUmkm.length} data UMKM terverifikasi.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleExportCSV}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-white hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-sky-600" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* Official Formatted Table Document Container */}
      <div className="bg-white rounded-3xl border border-sky-200/80 shadow-xs p-6 md:p-8 space-y-6 print:border-none print:shadow-none print:p-0">
        <div className="text-center space-y-1.5 border-b-2 border-sky-900 pb-5">
          <h2 className="text-base sm:text-xl font-black text-sky-950 tracking-tight uppercase leading-snug">
            DAFTAR UMKM KELURAHAN KUTOWINANGUN KIDUL
          </h2>
          <h3 className="text-sm sm:text-lg font-extrabold text-sky-900 tracking-tight uppercase">
            KECAMATAN TINGKIR TAHUN 2026
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs border border-sky-200">
            <thead>
              <tr className="bg-sky-100/80 text-sky-950 font-black uppercase text-[11px] tracking-wider text-center border-b border-sky-200">
                <th className="py-3 px-2 border-r border-sky-200 w-12">NO</th>
                <th className="py-3 px-3 border-r border-sky-200 min-w-[180px]">NAMA USAHA</th>
                <th className="py-3 px-3 border-r border-sky-200 min-w-[220px]">ALAMAT USAHA</th>
                <th className="py-3 px-2 border-r border-sky-200 w-14">RW</th>
                <th className="py-3 px-3 border-r border-sky-200 min-w-[180px]">KELOMPOK LAPANGAN USAHA</th>
                <th className="py-3 px-3 border-r border-sky-200 min-w-[200px]">JENIS BARANG/JASA UTAMA</th>
                <th className="py-3 px-3 min-w-[130px] print:hidden">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100 text-sky-950 font-medium">
              {filteredUmkm.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-sky-600 font-semibold">
                    Tidak ada data UMKM yang memenuhi kriteria pencarian/filter.
                  </td>
                </tr>
              ) : (
                filteredUmkm.map((item, index) => (
                  <tr key={item._id || item.id || index} className="hover:bg-sky-50/50 transition-colors">
                    <td className="py-2.5 px-2 text-center border-r border-sky-200 font-bold">{index + 1}</td>
                    <td className="py-2.5 px-3 border-r border-sky-200 font-bold text-sky-950">{item.namaUsaha}</td>
                    <td className="py-2.5 px-3 border-r border-sky-200">{item.alamat}</td>
                    <td className="py-2.5 px-2 text-center border-r border-sky-200 font-semibold">{item.rw}</td>
                    <td className="py-2.5 px-3 border-r border-sky-200">{item.kelompokUsaha}</td>
                    <td className="py-2.5 px-3 border-r border-sky-200">{item.jenisBarangJasa}</td>

                    {/* Kolom Aksi: Detail (Publik) + Edit & Hapus (Admin) */}
                    <td className="py-2.5 px-2 text-center print:hidden">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Tombol Detail (Dipakai Publik & Admin) */}
                        {setSelectedUmkm && (
                          <button
                            onClick={() => setSelectedUmkm(item)}
                            className="p-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg transition-colors border border-sky-200/80 cursor-pointer inline-flex items-center gap-1 font-semibold text-[11px]"
                            title="Lihat Detail & Peta Google Maps"
                          >
                            <Eye className="w-3.5 h-3.5 text-sky-500" />
                            <span>Detail</span>
                          </button>
                        )}

                        {/* Tombol Edit (Khusus Admin) */}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg transition-colors border border-amber-200/80 cursor-pointer inline-flex items-center gap-1 font-semibold text-[11px]"
                            title="Edit Data UMKM"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                        )}

                        {/* Tombol Hapus (Khusus Admin) */}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item._id)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors border border-rose-200/80 cursor-pointer inline-flex items-center gap-1 font-semibold text-[11px]"
                            title="Hapus Data UMKM"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-sky-900 border-t border-sky-100 gap-2 font-semibold">
          <p className="italic text-sky-800">
            Sumber Data : Kelurahan Kutowinangun Kidul
          </p>
          <div className="flex gap-4 text-[11px] text-sky-800">
            <span>Total Terdata: <strong>{filteredUmkm.length}</strong> UMKM</span>
            <span>Laki-Laki (L): <strong>{filteredUmkm.filter(u => u.jenisKelamin === 'L').length}</strong></span>
            <span>Perempuan (P): <strong>{filteredUmkm.filter(u => u.jenisKelamin === 'P').length}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}