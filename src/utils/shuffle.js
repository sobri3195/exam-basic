// Shuffle utilities using Fisher-Yates algorithm

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const shuffleQuestions = (questions) => {
  return shuffleArray(questions);
};

export const shuffleOptions = (question) => {
  const optionsWithIndex = question.options.map((option, index) => ({
    text: option,
    originalIndex: index,
  }));
  
  const shuffled = shuffleArray(optionsWithIndex);
  
  return {
    ...question,
    options: shuffled.map(item => item.text),
    answerIndex: shuffled.findIndex(item => item.originalIndex === question.answerIndex),
  };
};
