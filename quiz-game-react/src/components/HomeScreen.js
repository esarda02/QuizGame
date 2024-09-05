import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 py-10">
      <img 
        src="/images/quiz.png"
        alt="Quiz"
        className="w-48 h-48 mb-10 object-contain"
      />
      <h1 className="text-5xl font-extrabold text-blue-700 mb-20 tracking-wide">
        Quiz Game
      </h1>
      <Link 
        to="/quiz" 
        className="bg-blue-500 w-4/5 max-w-md flex items-center justify-center px-12 py-5 rounded-xl shadow-lg shadow-blue-300 hover:bg-blue-600 transition duration-200 text-white text-2xl font-semibold tracking-wide"
      >
        Start Quiz
      </Link>
    </div>
  );
}