import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResultScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;

  const handleRestart = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white p-6">
      <img 
        src="/images/score.png"
        alt="Score"
        className="w-48 h-48 object-contain"
      />
      <h1 className="text-4xl text-blue-700 font-bold mb-8">Quiz Completed!</h1>
      <div className="bg-blue-100 rounded-xl w-40 h-40 flex flex-col justify-center items-center mb-16">
        <span className="text-5xl font-bold">{score}</span>
        <span className="text-xl">Score</span>
      </div>
      <button
        onClick={handleRestart}
        className="bg-blue-500 w-3/4 max-w-md p-4 rounded-lg shadow-md hover:bg-blue-600 text-white text-center font-bold text-lg"
      >
        Restart Quiz
      </button>
    </div>
  );
}