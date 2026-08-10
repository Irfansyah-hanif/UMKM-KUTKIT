require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();

// Konfigurasi CORS agar mengizinkan request dari frontend Vercel
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Tangani Preflight Request
app.options('*', cors());

app.use(express.json());

// Endpoint Health Check
app.get('/', (req, res) => {
  res.send('API UMKM Kutowinangun Kidul is Running with Cloudinary!');
});

// 1. Konfigurasi Cloudinary dari Environment Variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Konfigurasi Multer Storage Menggunakan Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'umkm-kutowinangun',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Middleware Upload Banyak Field
const uploadFields = upload.fields([
  { name: 'gambar', maxCount: 1 },
  { name: 'galeri', maxCount: 8 }
]);

// 3. Koneksi MongoDB Atlas
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) {
    console.error('❌ FATAL: MONGO_URI belum diset di Environment Variables!');
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log('✅ Terhubung ke MongoDB Atlas!');
  } catch (err) {
    console.error('❌ Gagal Koneksi MongoDB:', err);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// 4. Schema Data UMKM
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
  gambar: String,         // URL Foto Utama dari Cloudinary
  galeri: [String],       // Array URL Foto Galeri dari Cloudinary
  jamOperasional: String,
  produkUnggulan: [String],
  tahunBerdiri: String,
  status: String,
  linkGmaps: String
}, { timestamps: true });

const Umkm = mongoose.model('Umkm', umkmSchema);

// --- REST API ENDPOINTS ---

// GET: Ambil Semua Data UMKM
app.get('/api/umkm', async (req, res) => {
  try {
    const list = await Umkm.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Tambah UMKM Baru
app.post('/api/umkm', uploadFields, async (req, res) => {
  try {
    const payload = { ...req.body };

    if (typeof payload.produkUnggulan === 'string') {
      try {
        payload.produkUnggulan = JSON.parse(payload.produkUnggulan);
      } catch (e) {
        payload.produkUnggulan = payload.produkUnggulan.split(',').map(s => s.trim());
      }
    }

    if (req.files && req.files['gambar']) {
      payload.gambar = req.files['gambar'][0].path;
    }

    if (req.files && req.files['galeri']) {
      payload.galeri = req.files['galeri'].map(f => f.path);
    }

    const newUmkm = new Umkm(payload);
    const saved = await newUmkm.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Edit Data UMKM
app.put('/api/umkm/:id', uploadFields, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Format ID tidak valid untuk MongoDB' });
    }

    const payload = { ...req.body };

    if (typeof payload.produkUnggulan === 'string') {
      try {
        payload.produkUnggulan = JSON.parse(payload.produkUnggulan);
      } catch (e) {
        payload.produkUnggulan = payload.produkUnggulan.split(',').map(s => s.trim());
      }
    }

    if (req.files && req.files['gambar']) {
      payload.gambar = req.files['gambar'][0].path;
    }

    if (req.files && req.files['galeri']) {
      payload.galeri = req.files['galeri'].map(f => f.path);
    }

    const updatedUmkm = await Umkm.findByIdAndUpdate(id, payload, { returnDocument: 'after' });

    if (!updatedUmkm) {
      return res.status(404).json({ message: 'Data UMKM tidak ditemukan di database' });
    }

    res.json(updatedUmkm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Hapus Data UMKM
app.delete('/api/umkm/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Format ID tidak valid untuk MongoDB' });
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

// Jalankan Server untuk Lokal
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server backend running on port ${PORT}`);
  });
}

module.exports = app;