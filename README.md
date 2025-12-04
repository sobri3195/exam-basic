# Exam Basic

Aplikasi ujian pilihan ganda untuk siswa dengan antarmuka yang sederhana, rapi, dan mudah dikembangkan.

## 🚀 Fitur

### Halaman Home
- Input nama siswa
- Pilih paket ujian (berdasarkan subject)
- Informasi durasi dan aturan ujian
- Validasi form sebelum memulai

### Halaman Exam
- Tampilan soal pilihan ganda (A/B/C/D)
- Timer 15 menit dengan auto-submit
- Navigasi Next/Previous
- Grid navigasi cepat ke nomor soal
- Progress bar jawaban
- Indikator soal yang sudah dijawab (hijau) dan belum (abu-abu)
- Penyimpanan otomatis ke localStorage (aman dari refresh)
- Konfirmasi jika ada soal yang belum dijawab saat submit
- Soal diacak secara otomatis

### Halaman Result
- Skor dalam persentase dan grade (A-E)
- Statistik: jumlah benar, salah, dan kosong
- Review lengkap semua soal dengan:
  - Jawaban benar ditandai hijau
  - Jawaban salah ditandai merah
  - Penjelasan untuk setiap soal
- Tombol "Ulangi Ujian" dan "Kembali ke Home"

## 🛠️ Tech Stack

- **React** - Library UI
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing/navigasi
- **LocalStorage API** - Penyimpanan data lokal

## 📁 Struktur Folder

```
exam-basic/
├── src/
│   ├── pages/              # Halaman utama
│   │   ├── Home.jsx        # Halaman awal (input nama & pilih paket)
│   │   ├── Exam.jsx        # Halaman ujian
│   │   └── Result.jsx      # Halaman hasil & review
│   ├── components/         # Komponen reusable
│   │   ├── Nav.jsx         # Navigation bar
│   │   ├── Timer.jsx       # Komponen timer
│   │   ├── ProgressBar.jsx # Progress bar
│   │   └── QuestionCard.jsx # Kartu soal
│   ├── data/
│   │   └── questions.json  # Data soal (10 soal contoh)
│   ├── utils/              # Utility functions
│   │   ├── storage.js      # LocalStorage helpers
│   │   ├── scoring.js      # Kalkulasi skor & grade
│   │   └── shuffle.js      # Randomisasi soal
│   ├── hooks/              # Custom React hooks
│   │   ├── useTimer.js     # Hook untuk timer
│   │   └── useExam.js      # Hook untuk state ujian
│   ├── App.jsx             # Root component dengan routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles + Tailwind
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── postcss.config.js       # PostCSS configuration (Tailwind v4)
```

## 📝 Format Data Soal

File `src/data/questions.json` berisi array objek dengan format:

```json
{
  "id": "KL-001",
  "subject": "Kesehatan Lingkungan",
  "question": "Contoh upaya kesehatan lingkungan yang berperan dalam mencegah penyakit adalah…",
  "options": [
    "Konsumsi makanan berlemak",
    "Pengelolaan air bersih dan sanitasi layak",
    "Mengurangi jam tidur",
    "Menghindari olahraga"
  ],
  "answerIndex": 1,
  "explanation": "Air bersih dan sanitasi yang baik mencegah penularan penyakit."
}
```

**Keterangan:**
- `id`: Unique identifier (kombinasi subject code + nomor)
- `subject`: Kategori/paket soal
- `question`: Teks pertanyaan
- `options`: Array 4 pilihan jawaban
- `answerIndex`: Index jawaban benar (0-3)
- `explanation`: Penjelasan jawaban (opsional, ditampilkan di result)

## 🚀 Cara Menjalankan

### Install Dependencies

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Fitur UI/UX

- **Responsive Design** - Berfungsi baik di desktop dan mobile
- **Card-based UI** - Antarmuka berbasis card yang clean
- **Color Coding** - Sistem warna yang jelas untuk status (hijau=benar, merah=salah, biru=aktif)
- **Accessibility** - Label aria, keyboard navigation support
- **Loading States** - Indikator loading saat memuat data
- **Confirmation Dialogs** - Konfirmasi untuk aksi penting (submit, timeout)
- **Smooth Transitions** - Animasi halus untuk interaksi

## 🔧 Pengembangan Lebih Lanjut

Aplikasi ini dirancang agar mudah dikembangkan. Beberapa ide:

1. **Backend Integration**
   - Ganti `questions.json` dengan API call
   - Simpan hasil ujian ke database
   - Sistem autentikasi user

2. **Fitur Tambahan**
   - Export hasil ke PDF
   - Grafik/statistik performa
   - History ujian sebelumnya
   - Kategori tingkat kesulitan
   - Random opsi jawaban juga

3. **Admin Panel**
   - CRUD soal ujian
   - Manajemen paket ujian
   - Lihat hasil semua siswa

4. **Gamifikasi**
   - Badge/achievement
   - Leaderboard
   - Streak system

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.10.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.1.17",
    "vite": "^7.2.4",
    "autoprefixer": "^10.4.22",
    "postcss": "^8.5.6"
  }
}
```

## 📄 License

MIT License - Bebas digunakan untuk keperluan pendidikan dan komersial.

## 👤 Author

Exam Basic - Aplikasi Ujian Siswa

---

**Selamat menggunakan Exam Basic! 🎓**
