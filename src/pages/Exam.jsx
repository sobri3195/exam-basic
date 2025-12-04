import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFromStorage, saveToStorage } from '../utils/storage';
import { shuffleQuestions } from '../utils/shuffle';
import { useTimer } from '../hooks/useTimer';
import { useExam } from '../hooks/useExam';
import { QuestionCard } from '../components/QuestionCard';
import { Timer } from '../components/Timer';
import { ProgressBar } from '../components/ProgressBar';
import questionsData from '../data/questions.json';

const EXAM_DURATION = 15 * 60; // 15 minutes in seconds

export const Exam = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize questions
  useEffect(() => {
    const name = getFromStorage('studentName');
    const subject = getFromStorage('selectedSubject');

    if (!name || !subject) {
      navigate('/');
      return;
    }

    setStudentName(name);
    setSelectedSubject(subject);

    // Get or create shuffled questions
    let examQuestions = getFromStorage('examQuestions');
    
    if (!examQuestions) {
      // Filter questions by subject
      let filteredQuestions = subject === 'Semua Paket' 
        ? questionsData 
        : questionsData.filter(q => q.subject === subject);
      
      // Shuffle questions
      examQuestions = shuffleQuestions(filteredQuestions);
      saveToStorage('examQuestions', examQuestions);
    }

    setQuestions(examQuestions);
    setIsLoading(false);
  }, [navigate]);

  const exam = useExam(questions);

  const handleSubmit = () => {
    const unansweredCount = exam.getUnansweredCount();
    
    if (unansweredCount > 0) {
      const confirmSubmit = window.confirm(
        `Anda memiliki ${unansweredCount} soal yang belum dijawab. Yakin ingin mengumpulkan?`
      );
      if (!confirmSubmit) return;
    }

    timer.pause();
    
    // Save final answers and navigate to result
    saveToStorage('finalAnswers', exam.answers);
    saveToStorage('finalQuestions', questions);
    navigate('/result');
  };

  const handleTimeUp = () => {
    if (window.confirm('Waktu habis! Ujian akan dikumpulkan otomatis.')) {
      handleSubmit();
    } else {
      handleSubmit();
    }
  };

  const timer = useTimer(EXAM_DURATION, handleTimeUp);

  // Start timer when component mounts
  useEffect(() => {
    if (!isLoading && questions.length > 0) {
      timer.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, questions]);

  const handleAnswerSelect = (answerIndex) => {
    const currentQuestion = questions[exam.currentQuestionIndex];
    exam.setAnswer(currentQuestion.id, answerIndex);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat soal ujian...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md text-center">
          <p className="text-red-600 font-semibold mb-4">Tidak ada soal tersedia untuk paket ini.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[exam.currentQuestionIndex];
  const answeredCount = Object.keys(exam.answers).length;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{studentName}</h2>
              <p className="text-sm text-gray-600">{selectedSubject}</p>
            </div>
            <Timer formatTime={timer.formatTime} timeLeft={timer.timeLeft} />
          </div>
          <div className="mt-4">
            <ProgressBar current={answeredCount} total={questions.length} />
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={exam.currentQuestionIndex + 1}
          selectedAnswer={exam.answers[currentQuestion.id]}
          onSelectAnswer={handleAnswerSelect}
        />

        {/* Navigation */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={exam.previousQuestion}
            disabled={exam.currentQuestionIndex === 0}
            className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Sebelumnya
          </button>
          
          {exam.currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="btn-primary flex-1"
            >
              Selesai & Kumpulkan
            </button>
          ) : (
            <button
              onClick={exam.nextQuestion}
              className="btn-primary flex-1"
            >
              Selanjutnya →
            </button>
          )}
        </div>

        {/* Question Numbers Grid */}
        <div className="card mt-6">
          <h3 className="font-semibold text-gray-700 mb-3">Navigasi Soal:</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((q, index) => {
              const isAnswered = exam.answers[q.id] !== undefined;
              const isCurrent = index === exam.currentQuestionIndex;
              
              return (
                <button
                  key={q.id}
                  onClick={() => exam.goToQuestion(index)}
                  className={`
                    aspect-square rounded-lg font-semibold text-sm transition-all
                    ${isCurrent 
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400' 
                      : isAnswered 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                  aria-label={`Go to question ${index + 1}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-100 rounded"></div>
              <span className="text-gray-600">Terjawab</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-100 rounded"></div>
              <span className="text-gray-600">Belum dijawab</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
              <span className="text-gray-600">Soal saat ini</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
