import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearExamStorage, saveToStorage } from '../utils/storage';
import questionsData from '../data/questions.json';

export const Home = () => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  // Get unique subjects from questions
  const subjects = ['Semua Paket', ...new Set(questionsData.map(q => q.subject))];

  const handleStartExam = (e) => {
    e.preventDefault();
    
    if (!studentName.trim()) {
      alert('Silakan masukkan nama Anda!');
      return;
    }

    if (!selectedSubject) {
      alert('Silakan pilih paket ujian!');
      return;
    }

    // Clear previous exam data
    clearExamStorage();

    // Save student info
    saveToStorage('studentName', studentName);
    saveToStorage('selectedSubject', selectedSubject);

    // Navigate to exam
    navigate('/exam');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Exam Basic</h1>
          <p className="text-gray-600">Aplikasi Ujian Pilihan Ganda</p>
        </div>

        <div className="card">
          <form onSubmit={handleStartExam} className="space-y-6">
            <div>
              <label 
                htmlFor="studentName" 
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Nama Siswa
              </label>
              <input
                type="text"
                id="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Masukkan nama Anda"
                required
              />
            </div>

            <div>
              <label 
                htmlFor="subject" 
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Pilih Paket Ujian
              </label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
                required
              >
                <option value="">-- Pilih Paket --</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Informasi Ujian:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Durasi: 15 menit</li>
                <li>• Soal akan diacak</li>
                <li>• Jawaban tersimpan otomatis</li>
                <li>• Dapat navigasi antar soal</li>
              </ul>
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
            >
              Mulai Ujian
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Pastikan koneksi internet stabil dan gunakan browser terbaru</p>
        </div>
      </div>
    </div>
  );
};
