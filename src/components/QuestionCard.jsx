export const QuestionCard = ({ 
  question, 
  questionNumber, 
  selectedAnswer, 
  onSelectAnswer,
  disabled = false,
  showCorrectAnswer = false,
  userAnswer = null,
}) => {
  const optionLabels = ['A', 'B', 'C', 'D'];

  const getOptionClassName = (index) => {
    let className = 'option-button';
    
    if (showCorrectAnswer) {
      // Review mode
      if (index === question.answerIndex) {
        className += ' review-correct';
      } else if (index === userAnswer && userAnswer !== question.answerIndex) {
        className += ' review-incorrect';
      }
    } else {
      // Exam mode
      if (selectedAnswer === index) {
        className += ' selected';
      }
    }
    
    if (disabled) {
      className += ' cursor-not-allowed opacity-75';
    }
    
    return className;
  };

  return (
    <div className="card">
      <div className="mb-4">
        <span className="text-sm font-semibold text-gray-500">
          Soal #{questionNumber}
        </span>
        {question.subject && (
          <span className="ml-2 text-sm text-blue-600 font-medium">
            {question.subject}
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-semibold mb-6 text-gray-800">
        {question.question}
      </h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !disabled && onSelectAnswer(index)}
            className={getOptionClassName(index)}
            disabled={disabled}
            aria-label={`Option ${optionLabels[index]}`}
          >
            <div className="flex items-start gap-3">
              <span className="font-bold text-gray-600 min-w-[24px]">
                {optionLabels[index]}.
              </span>
              <span className="flex-1 text-gray-800">{option}</span>
              {showCorrectAnswer && index === question.answerIndex && (
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {showCorrectAnswer && index === userAnswer && userAnswer !== question.answerIndex && (
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {showCorrectAnswer && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-sm font-semibold text-blue-900 mb-1">Penjelasan:</p>
          <p className="text-sm text-blue-800">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
