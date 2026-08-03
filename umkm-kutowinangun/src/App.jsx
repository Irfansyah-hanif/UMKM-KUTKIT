import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import HistorySection from './components/HistorySection';
import DigitalMarketingGuide from './components/DigitalMarketingGuide';
import SearchFilter from './components/SearchFilter';
import TableView from './components/TableView';
import GridView from './components/GridView';
import { Building2, Loader2, Store } from 'lucide-react';

// Lazy Import Komponen Modal (Hanya dimuat saat dibutuhkan)
const UmkmDetailModal = lazy(() => import('./components/UmkmDetailModal'));
const AddUmkmModal = lazy(() => import('./components/AddUmkmModal'));
const EditUmkmModal = lazy(() => import('./components/EditUmkmModal'));
const AdminLoginModal = lazy(() => import('./components/AdminLoginModal'));

export default function App() {
  const [umkmList, setUmkmList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State Navigasi Halaman: 'home' | 'grid_catalog' | 'official_table'
  const [activePage, setActivePage] = useState('home'); 

  const [activeTab, setActiveTab] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRw, setSelectedRw] = useState('semua');
  const [selectedUmkm, setSelectedUmkm] = useState(null);
  const [editingUmkm, setEditingUmkm] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // --- STATE HAK AKSES ADMIN ---
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Handler Login Admin
  const handleAdminLogin = (passwordInput) => {
    if (passwordInput === 'adminkutkitumkm') { 
      setIsAdmin(true);
      localStorage.setItem('isAdminLoggedIn', 'true');
      setIsAdminModalOpen(false);
      alert('Berhasil masuk sebagai Admin!');
    } else {
      alert('Password Admin Salah!');
    }
  };

  // Handler Logout Admin
  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdminLoggedIn');
    alert('Anda telah keluar dari Mode Admin.');
  };

  // Fetch Data dari Server Express
  useEffect(() => {
    fetch('http://localhost:5000/api/umkm')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setUmkmList(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Gagal mengambil data dari server:', err);
        setUmkmList([]);
        setLoading(false);
      });
  }, []);

  // Fitur Hapus Data
  const handleDeleteUmkm = async (id) => {
    if (!id) {
      alert('Gagal menghapus: ID data tidak ditemukan!');
      return;
    }

    if (!window.confirm('Apakah Anda yakin ingin menghapus data UMKM ini?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/umkm/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        setUmkmList((prevList) => {
          if (!Array.isArray(prevList)) return [];
          return prevList.filter((item) => item._id !== id);
        });

        if (selectedUmkm && selectedUmkm._id === id) {
          setSelectedUmkm(null);
        }
        alert('Data UMKM berhasil dihapus!');
      } else {
        alert(`Gagal Menghapus [Error ${res.status}]: ${data.error || data.message || 'Format ID tidak valid'}`);
      }
    } catch (err) {
      console.error('Error saat menghapus:', err);
      alert('Terjadi kesalahan koneksi ke server backend!');
    }
  };

  // Fitur Edit Data (Mendukung FormData / Upload File & JSON)
  const handleEditUmkm = async (id, updatedData) => {
    try {
      // Cek apakah data bertipe FormData (Upload file gambar)
      const isFormData = updatedData instanceof FormData;

      const res = await fetch(`http://localhost:5000/api/umkm/${id}`, {
        method: 'PUT',
        // Jika FormData, biarkan browser yang set Content-Type & boundary secara otomatis
        headers: isFormData ? {} : { 'Content-Type': 'application/json' },
        body: isFormData ? updatedData : JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (res.ok) {
        // 1. Update daftar utama UMKM di state
        setUmkmList((prev) => {
          if (!Array.isArray(prev)) return [];
          return prev.map((item) => (item._id === id ? data : item));
        });

        // 2. Jika modal detail sedang aktif menampilkan UMKM ini, perbarui datanya secara langsung
        if (selectedUmkm && selectedUmkm._id === id) {
          setSelectedUmkm(data);
        }

        // 3. Tutup modal edit
        setEditingUmkm(null);

        alert('✨ Data UMKM berhasil diperbarui!');
      } else {
        alert(`Gagal mengupdate [Error ${res.status}]: ${data.error || data.message || 'Terjadi kesalahan pada server'}`);
      }
    } catch (err) {
      console.error('Error saat mengedit:', err);
      alert('Terjadi kesalahan koneksi saat memperbarui data. Pastikan server backend berjalan.');
    }
  };

  // Safe Filtering untuk Halaman Katalog & Tabel
  const filteredUmkm = useMemo(() => {
    const safeList = Array.isArray(umkmList) ? umkmList : [];

    return safeList.filter(item => {
      const matchCategory = activeTab === 'semua' || (item.kategori && item.kategori.toLowerCase() === activeTab.toLowerCase());
      const matchRw = selectedRw === 'semua' || item.rw === selectedRw;
      const query = searchQuery.toLowerCase();
      const matchQuery = 
        (item.namaUsaha && item.namaUsaha.toLowerCase().includes(query)) ||
        (item.pemilik && item.pemilik.toLowerCase().includes(query)) ||
        (item.alamat && item.alamat.toLowerCase().includes(query)) ||
        (item.jenisBarangJasa && item.jenisBarangJasa.toLowerCase().includes(query)) ||
        (item.kelompokUsaha && item.kelompokUsaha.toLowerCase().includes(query));

      return matchCategory && matchRw && matchQuery;
    });
  }, [umkmList, activeTab, selectedRw, searchQuery]);

  // LOGIKA MENGACAK 6 DATA UMKM UNTUK KATALOG ACAK DI HALAMAN BERANDA
  const randomFeaturedUmkm = useMemo(() => {
    const safeList = Array.isArray(umkmList) ? umkmList : [];
    if (safeList.length === 0) return [];
    // Mengacak susunan array dan mengambil 6 item teratas
    const shuffled = [...safeList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, [umkmList]);

  return (
    <div className="min-h-screen bg-sky-50/20 text-sky-950 font-sans flex flex-col selection:bg-sky-100 selection:text-sky-900 print:bg-white print:text-black">
      
      {/* Background Graphic Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden print:hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-100/60 blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-sky-100/50 blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-sky-100/40 blur-3xl"></div>
      </div>

      {/* Header Navigasi Utama */}
      <Header 
        activePage={activePage} 
        setActivePage={setActivePage} 
        setIsAddModalOpen={setIsAddModalOpen} 
        isAdmin={isAdmin}
        setIsAdminModalOpen={setIsAdminModalOpen}
        handleAdminLogout={handleAdminLogout}
      />

      {/* 1. HALAMAN BERANDA */}
      {activePage === 'home' && (
        <div className="space-y-8">
          <HeroBanner 
            umkmList={umkmList} 
            setViewMode={(mode) => setActivePage(mode)} 
          />

          <HistorySection />

          <DigitalMarketingGuide />

          {/* SECTION KATALOG ACAK UNGGULAN */}
          <section className="w-full px-4 sm:px-8 lg:px-12 py-4 relative z-10 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-sky-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-sky-950 flex items-center gap-2">
                  <span>✨ Usaha Mikro Unggulan Pilihan</span>
                </h3>
                <p className="text-xs text-sky-700 font-medium">
                  Beberapa sampel usaha mikro terdaftar di Kelurahan Kutowinangun Kidul
                </p>
              </div>
              <button
                onClick={() => setActivePage('grid_catalog')}
                className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Lihat Semua Katalog ({umkmList.length}) →</span>
              </button>
            </div>

            {/* Menampilkan 6 Kartu Katalog Acak */}
            <GridView 
              filteredUmkm={randomFeaturedUmkm} 
              setSelectedUmkm={setSelectedUmkm} 
              onDelete={isAdmin ? handleDeleteUmkm : null}
              onEdit={isAdmin ? (item) => setEditingUmkm(item) : null}
            />

            {/* Tombol CTA Ke Katalog Lengkap */}
            <div className="pt-4 text-center">
              <button
                onClick={() => setActivePage('grid_catalog')}
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-6 py-3.5 rounded-2xl shadow-md shadow-sky-200 transition-all cursor-pointer hover:scale-105"
              >
                <Store className="w-4 h-4" />
                <span>Buka Katalog Lengkap UMKM ({umkmList.length} Data)</span>
              </button>
            </div>
          </section>
        </div>
      )}

      {/* 2 & 3. HALAMAN KATALOG DAN TABEL */}
      {(activePage === 'grid_catalog' || activePage === 'official_table') && (
        <main className="w-full px-4 sm:px-8 lg:px-12 py-8 flex-1 space-y-6 relative z-10">
          <SearchFilter 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedRw={selectedRw}
            setSelectedRw={setSelectedRw}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            umkmList={umkmList}
          />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-sky-700 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
              <p className="text-sm font-semibold">Mengambil data dari MongoDB Atlas...</p>
            </div>
          ) : activePage === 'official_table' ? (
            <TableView 
              filteredUmkm={filteredUmkm} 
              setSelectedUmkm={setSelectedUmkm}
              onDelete={isAdmin ? handleDeleteUmkm : null} 
              onEdit={isAdmin ? (item) => setEditingUmkm(item) : null}
            />
          ) : (
            <GridView 
              filteredUmkm={filteredUmkm} 
              setSelectedUmkm={setSelectedUmkm} 
              onDelete={isAdmin ? handleDeleteUmkm : null}
              onEdit={isAdmin ? (item) => setEditingUmkm(item) : null}
            />
          )}
        </main>
      )}

      {/* MODAL WRAPPED IN SUSPENSE FOR LAZY LOADING */}
      <Suspense fallback={null}>
        {/* Modal Detail UMKM */}
        {selectedUmkm && (
          <UmkmDetailModal 
            selectedUmkm={selectedUmkm} 
            setSelectedUmkm={setSelectedUmkm} 
            onDelete={isAdmin ? handleDeleteUmkm : null}
          />
        )}

        {/* Modal Tambah UMKM */}
        {isAddModalOpen && isAdmin && (
          <AddUmkmModal 
            setIsAddModalOpen={setIsAddModalOpen} 
            umkmList={umkmList} 
            setUmkmList={setUmkmList} 
          />
        )}

        {/* Modal Edit UMKM */}
        {editingUmkm && isAdmin && (
          <EditUmkmModal 
            editingUmkm={editingUmkm} 
            setEditingUmkm={setEditingUmkm} 
            onEdit={handleEditUmkm} 
          />
        )}

        {/* Modal Login Admin */}
        {isAdminModalOpen && (
          <AdminLoginModal 
            setIsAdminModalOpen={setIsAdminModalOpen} 
            handleAdminLogin={handleAdminLogin} 
          />
        )}
      </Suspense>

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-sky-100 text-sky-900 text-xs py-8 mt-12 print:hidden">
        <div className="w-full px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-500" />
            <span className="font-bold text-sky-950">Pendataan UMKM Kelurahan Kutowinangun Kidul 2026</span>
          </div>
          <p className="text-sky-800/80 font-medium">Sumber Data : Kelurahan Kutowinangun Kidul, Kecamatan Tingkir, Kota Salatiga</p>
        </div>
      </footer>

    </div>
  );
}