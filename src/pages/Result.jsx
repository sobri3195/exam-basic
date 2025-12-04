import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFromStorage, clearExamStorage } from '../utils/storage';
import { calculateScore, getScoreGrade, getScoreColor } from '../utils/scoring';
import { QuestionCard } from '../components/QuestionCard';

export const Result = () => {
  const navigate = useNavigate();
  
  // Load data from localStorage
  const name = getFromStorage('studentName');
  const subject = getFromStorage('selectedSubject');
  const finalQuestions = getFromStorage('finalQuestions');
  const finalAnswers = getFromStorage('finalAnswers');
  
  const [studentName] = useState(name || '');
  const [selectedSubject] = useState(subject || '');
  const [questions] = useState(finalQuestions || []);
  const [answers] = useState(finalAnswers || {});
  const [score] = useState(() => {
    if (finalQuestions && finalAnswers) {
      return calculateScore(finalQuestions, finalAnswers);
    }
    return null;
  });

  useEffect(() => {
    if (!name || !finalQuestions || !finalAnswers) {
      navigate('/');
    }
  }, [name, finalQuestions, finalAnswers, navigate]);

  const handleRetake = () => {
    clearExamStorage();
    navigate('/');
  };

  const handleBackHome = () => {
    clearExamStorage();
    navigate('/');
  };

  if (!score) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Menghitung hasil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Score Summary */}
        <div className="card mb-6 text-center">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hasil Ujian</h1>
            <p className="text-lg text-gray-600">{studentName}</p>
            <p className="text-sm text-gray-500">{selectedSubject}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 mb-6">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(score.percentage)}`}>
              {score.percentage}%
            </div>
            <div className="text-2xl font-semibold text-gray-700 mb-4">
              Grade: {getScoreGrade(score.percentage)}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{score.correct}</div>
                <div className="text-sm text-gray-600">Benar</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">{score.incorrect}</div>
                <div className="text-sm text-gray-600">Salah</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-600">{score.unanswered}</div>
                <div className="text-sm text-gray-600">Kosong</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleRetake} className="btn-primary">
              Ulangi Ujian
            </button>
            <button onClick={handleBackHome} className="btn-secondary">
              Kembali ke Home
            </button>
          </div>
        </div>

        {/* Review Questions */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Soal & Jawaban</h2>
          <p className="text-gray-600 mb-6">
            Tinjau kembali jawaban Anda dan pelajari penjelasan dari setiap soal.
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.answerIndex;
            const isUnanswered = userAnswer === undefined;

            return (
              <div key={question.id} className="relative">
                {/* Status Badge */}
                <div className="absolute -top-3 -right-3 z-10">
                  {isCorrect ? (
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Benar
                    </div>
                  ) : isUnanswered ? (
                    <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Tidak Dijawab
                    </div>
                  ) : (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Salah
                    </div>
                  )}
                </div>

                <QuestionCard
                  question={question}
                  questionNumber={index + 1}
                  selectedAnswer={null}
                  onSelectAnswer={() => {}}
                  disabled={true}
                  showCorrectAnswer={true}
                  userAnswer={userAnswer}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 card text-center">
          <p className="text-gray-700 mb-4">
            Terima kasih telah mengerjakan ujian. Semangat belajar!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleRetake} className="btn-primary">
              Ulangi Ujian
            </button>
            <button onClick={handleBackHome} className="btn-secondary">
              Kembali ke Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
