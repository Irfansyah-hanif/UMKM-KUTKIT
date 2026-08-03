require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB Atlas via Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Terhubung ke MongoDB Atlas!'))
  .catch((err) => console.error('❌ Gagal Koneksi MongoDB:', err));

// Schema Data UMKM
const umkmSchema = new mongoose.Schema({
  namaUsaha: String,
  pemilik: String,
  jenisKelamin: String,
  usia: mongoose.Schema.Types.Mixed,
  kategori: String,
  kelompokUsaha: String,
  jenisBarangJasa: String,
  alamat: String,
  rtRw: String,
  rw: String,
  kontak: String,
  deskripsi: String,
  gambar: String,
  jamOperasional: String,
  produkUnggulan: [String],
  tahunBerdiri: String,
  status: String,
  linkGmaps: String // <--- DITAMBAHKAN FIELD LINK / EMBED GOOGLE MAPS
}, { timestamps: true });

const Umkm = mongoose.model('Umkm', umkmSchema);

// --- REST API ENDPOINTS ---

// 1. GET: Ambil Semua Data UMKM
app.get('/api/umkm', async (req, res) => {
  try {
    const list = await Umkm.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. POST: Tambah UMKM Baru
app.post('/api/umkm', async (req, res) => {
  try {
    const newUmkm = new Umkm(req.body);
    const saved = await newUmkm.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. PUT: Edit / Update Data UMKM
app.put('/api/umkm/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi format ObjectId MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Format ID tidak valid untuk MongoDB' });
    }

    const updatedUmkm = await Umkm.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedUmkm) {
      return res.status(404).json({ message: 'Data UMKM tidak ditemukan di database' });
    }

    res.json(updatedUmkm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. DELETE: Hapus Data UMKM (Aman & Terverifikasi)
app.delete('/api/umkm/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi apakah string ID merupakan ObjectId 24-karakter valid milik MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: 'Format ID tidak valid. Data ini mungkin data dummy lokal lama dan belum ada di MongoDB Atlas.' 
      });
    }

    const deletedUmkm = await Umkm.findByIdAndDelete(id);

    if (!deletedUmkm) {
      return res.status(404).json({ error: 'Data UMKM tidak ditemukan di database' });
    }

    res.json({ message: 'Data UMKM berhasil dihapus', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server backend running di http://localhost:${PORT}`);
});