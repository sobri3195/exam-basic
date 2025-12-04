export const Timer = ({ formatTime, timeLeft }) => {
  const isLowTime = timeLeft < 60;
  
  return (
    <div className={`flex items-center gap-2 font-mono text-lg font-semibold ${
      isLowTime ? 'text-red-600 animate-pulse' : 'text-gray-700'
    }`}>
      <svg 
        className="w-5 h-5" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{formatTime()}</span>
    </div>
  );
};
