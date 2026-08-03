require('dotenv').config();
const mongoose = require('mongoose');

// Schema UMKM
const umkmSchema = new mongoose.Schema({
  no: Number,
  namaUsaha: String,
  pemilik: String,
  jenisKelamin: String,
  usia: mongoose.Schema.Types.Mixed,
  kategori: String,
  subKategori: String,
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
  status: String
}, { timestamps: true });

const Umkm = mongoose.model('Umkm', umkmSchema);

// Data Sampel/Awal UMKM
const initialData = [
  {
    no: 1,
    namaUsaha: "Usaha TERNAK BURUNG (ANG YU TUNG)",
    pemilik: "ANG YU TUNG",
    jenisKelamin: "L",
    usia: 45,
    kategori: "Jasa",
    kelompokUsaha: "PRODUKSI/NON PERTANIAN",
    jenisBarangJasa: "TERNAK BURUNG",
    alamat: "JL KALIPENGGING RT 10 RW 01",
    rtRw: "RT 10 / RW 01",
    rw: "01",
    kontak: "08123456789",
    gambar: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    produkUnggulan: ["Ternak Burung"],
    status: "Aktif"
  }
  // Kamu juga bisa paste isi array INITIAL_UMKM_DATA dari umkmData.js ke sini
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Terhubung ke MongoDB Atlas untuk Seeding...');
    
    // Opsional: Hapus data lama agar tidak bertumpuk
    await Umkm.deleteMany({}); 

    await Umkm.insertMany(initialData);
    console.log('🎉 Data UMKM Berhasil Dimasukkan ke MongoDB Atlas!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Gagal Melakukan Seed:', err);
    process.exit(1);
  }
}

seedDB();