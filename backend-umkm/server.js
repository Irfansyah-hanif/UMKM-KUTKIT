require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

// 0. Otomatis buat folder 'uploads' jika belum ada
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 1. Sajikan folder 'uploads' secara publik agar gambar bisa diakses frontend
app.use('/uploads', express.static(uploadDir));

// 2. Konfigurasi Multer untuk penyimpanan gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Hanya file gambar yang diperbolehkan!'), false);
    }
  }
});

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
  gambar: String, // Menyimpan URL relatif (contoh: '/uploads/1723456789.jpg')
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

// 2. POST: Tambah UMKM Baru (Dengan Upload Gambar)
app.post('/api/umkm', upload.single('gambar'), async (req, res) => {
  try {
    const payload = { ...req.body };

    // Parsing produkUnggulan jika dikirim sebagai string JSON dari FormData
    if (typeof payload.produkUnggulan === 'string') {
      try {
        payload.produkUnggulan = JSON.parse(payload.produkUnggulan);
      } catch (e) {
        payload.produkUnggulan = payload.produkUnggulan.split(',').map(s => s.trim());
      }
    }

    // Simpan path file gambar jika diunggah
    if (req.file) {
      payload.gambar = `/uploads/${req.file.filename}`;
    }

    const newUmkm = new Umkm(payload);
    const saved = await newUmkm.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. PUT: Edit / Update Data UMKM (Dengan Upload Gambar)
app.put('/api/umkm/:id', upload.single('gambar'), async (req, res) => {
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

    // Update path gambar jika ada file baru diunggah
    if (req.file) {
      payload.gambar = `/uploads/${req.file.filename}`;
    }

    // Opsi { returnDocument: 'after' } digunakan untuk menggantikan { new: true } sesuai standar Mongoose v8+
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