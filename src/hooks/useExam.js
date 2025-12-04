import { useState, useEffect } from 'react';
import { saveToStorage, getFromStorage } from '../utils/storage';

export const useExam = (questions) => {
  // Load saved state from localStorage on mount
  const savedAnswers = getFromStorage('examAnswers');
  const savedIndex = getFromStorage('currentQuestionIndex');
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(savedIndex !== null ? savedIndex : 0);
  const [answers, setAnswers] = useState(savedAnswers || {});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(answers).length > 0 || currentQuestionIndex > 0) {
      saveToStorage('examAnswers', answers);
      saveToStorage('currentQuestionIndex', currentQuestionIndex);
    }
  }, [answers, currentQuestionIndex]);

  const setAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const getUnansweredCount = () => {
    return questions.filter(q => answers[q.id] === undefined).length;
  };

  const submitExam = () => {
    setIsSubmitted(true);
  };

  return {
    currentQuestionIndex,
    answers,
    isSubmitted,
    setAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    getUnansweredCount,
    submitExam,
  };
};
