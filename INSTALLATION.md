# Panduan Instalasi dan Penggunaan

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Buka browser di http://localhost:5173
```

## Build untuk Production

```bash
# Build aplikasi
npm run build

# Preview production build
npm run preview
```

## Struktur Project

- `src/pages/` - Halaman utama (Home, Exam, Result)
- `src/components/` - Komponen reusable (Nav, Timer, QuestionCard, dll)
- `src/data/` - Data soal dalam format JSON
- `src/utils/` - Helper functions (storage, scoring, shuffle)
- `src/hooks/` - Custom React hooks (useTimer, useExam)

## Menambah Soal

Edit file `src/data/questions.json` dengan format:

```json
{
  "id": "UNIQUE-ID",
  "subject": "Nama Paket",
  "question": "Teks pertanyaan...",
  "options": ["Opsi A", "Opsi B", "Opsi C", "Opsi D"],
  "answerIndex": 1,
  "explanation": "Penjelasan jawaban..."
}
```

## Konfigurasi

### Mengubah Durasi Ujian

Edit `src/pages/Exam.jsx`:

```javascript
const EXAM_DURATION = 15 * 60; // 15 menit (dalam detik)
```

### Mengubah Tema Warna

Edit `src/index.css` untuk custom classes atau gunakan utility classes Tailwind di komponen.
