// Scoring and evaluation utilities

export const calculateScore = (questions, answers) => {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    const userAnswer = answers[question.id];
    
    if (userAnswer === undefined || userAnswer === null) {
      unanswered++;
    } else if (userAnswer === question.answerIndex) {
      correct++;
    } else {
      incorrect++;
    }
  });

  const total = questions.length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return {
    correct,
    incorrect,
    unanswered,
    total,
    percentage,
  };
};

export const getScoreGrade = (percentage) => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'E';
};

export const getScoreColor = (percentage) => {
  if (percentage >= 80) return 'text-green-600';
  if (percentage >= 60) return 'text-blue-600';
  if (percentage >= 40) return 'text-yellow-600';
  return 'text-red-600';
};
