require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();

// Konfigurasi CORS agar mengizinkan request dari mana saja (termasuk Vercel Frontend)
app.use(cors());
app.use(express.json());

// Endpoint Health Check
app.get('/', (req, res) => {
  res.send('API UMKM Kutowinangun Kidul is Running!');
});

// Gunakan Memory Storage jika berjalan di Serverless Vercel, dan Disk Storage jika di Lokal
const isVercel = process.env.VERCEL || process.env.NODE_ENV === 'production';

let storage;
if (!isVercel) {
  // Folder uploads hanya dibuat jika berjalan di komputer lokal
  const uploadDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadDir));

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
} else {
  // Gunakan Memory Storage di Vercel agar tidak memicu error Read-Only Filesystem
  storage = multer.memoryStorage();
}

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB per file
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Hanya file gambar yang diperbolehkan!'), false);
    }
  }
});

// Middleware Upload Banyak Field
const uploadFields = upload.fields([
  { name: 'gambar', maxCount: 1 },
  { name: 'galeri', maxCount: 8 }
]);

// Koneksi ke MongoDB Atlas (Menggunakan Mongoose Caching untuk Serverless)
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

// Panggil koneksi DB untuk setiap request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

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
  gambar: String,         // Path / URL Foto Utama
  galeri: [String],       // Array Path / URL Foto Produk
  jamOperasional: String,
  produkUnggulan: [String],
  tahunBerdiri: String,
  status: String,
  linkGmaps: String
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
      if (!isVercel) {
        payload.gambar = `/uploads/${req.files['gambar'][0].filename}`;
      } else {
        // Fallback untuk Vercel (Menggunakan placeholder atau gambar default)
        payload.gambar = '/assets/hero.png';
      }
    }

    if (req.files && req.files['galeri']) {
      if (!isVercel) {
        payload.galeri = req.files['galeri'].map(f => `/uploads/${f.filename}`);
      } else {
        payload.galeri = ['/assets/hero-market.jpg'];
      }
    }

    const newUmkm = new Umkm(payload);
    const saved = await newUmkm.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. PUT: Edit Data UMKM
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
      if (!isVercel) {
        payload.gambar = `/uploads/${req.files['gambar'][0].filename}`;
      }
    }

    if (req.files && req.files['galeri']) {
      if (!isVercel) {
        payload.galeri = req.files['galeri'].map(f => `/uploads/${f.filename}`);
      }
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

// 4. DELETE: Hapus Data UMKM
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

// Jalankan Server Lokal
if (!isVercel) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server backend running on port ${PORT}`);
  });
}

module.exports = app;