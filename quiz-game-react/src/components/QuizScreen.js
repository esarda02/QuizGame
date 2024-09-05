import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import ProgressBar from './ProgressBar';
import quizData from '../quizData.json';

export default function QuizScreen() {
  const [currentLevel, setCurrentLevel] = useState('easy');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [textInput, setTextInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setQuestions(quizData[currentLevel]);
    setCurrentQuestionIndex(0);
  }, [currentLevel]);

  const handleAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    let answerIsCorrect = false;

    if (currentQuestion.type === 'text-input') {
      answerIsCorrect = textInput.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    } else {
      answerIsCorrect = selectedAnswer === currentQuestion.correctAnswer;
    }

    setIsCorrect(answerIsCorrect);
    setShowFeedback(true);

    if (answerIsCorrect) {
      setScore(score + getPointsForLevel(currentLevel));
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (score >= getRequiredScoreForNextLevel()) {
        if (currentLevel === 'easy') {
          setCurrentLevel('medium');
        } else if (currentLevel === 'medium') {
          setCurrentLevel('hard');
        } else {
          navigate('/result', { state: { score: score } });
        }
      } else {
        navigate('/result', { state: { score: score } });
      }
    }
    setSelectedAnswer('');
    setTextInput('');
    setShowFeedback(false);
  };

  const getPointsForLevel = (level) => {
    switch (level) {
      case 'easy': return 10;
      case 'medium': return 20;
      case 'hard': return 30;
      default: return;
    }
  };

  const getRequiredScoreForNextLevel = () => {
    return questions.length * getPointsForLevel(currentLevel) * (2/3);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const getOptionClass = (option) => {
    if (!showFeedback) {
      return selectedAnswer === option
        ? 'border-blue-500 bg-blue-50 text-blue-700'
        : 'border-slate-300 bg-white text-slate-700';
    }
    if (option === currentQuestion.correctAnswer) {
      return 'border-green-500 bg-green-50 text-green-700';
    }
    if (selectedAnswer === option) {
      return 'border-red-500 bg-red-50 text-red-700';
    }
    return 'border-slate-300 bg-white text-slate-700';
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-4 max-w-3xl mx-auto">
      <div>
        <div className="flex justify-between mb-4">
          <span className="text-lg font-semibold">Level: {currentLevel}</span>
          <span className="text-lg font-semibold">Score: {score}</span>
        </div>
        <ProgressBar progress={(currentQuestionIndex + 1) / questions.length} />
        <div className="text-right text-sm mt-1">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>
      
      <div className="flex-grow mt-8 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-8">{currentQuestion.question}</h2>
        {(currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false') && (
          (currentQuestion.options || ['true', 'false']).map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && setSelectedAnswer(option)}
              className={`p-4 mb-3 rounded-lg w-full border flex justify-between items-center ${getOptionClass(option)}`}
              disabled={showFeedback}
            >
              <span>{option}</span>
              {showFeedback && option === currentQuestion.correctAnswer && (
                <CheckCircleFilled className="text-green-500 text-xl" />
              )}
              {showFeedback && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                <CloseCircleFilled className="text-red-500 text-xl" />
              )}
            </button>
          ))
        )}
        {currentQuestion.type === 'text-input' && (
          <input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type your answer here"
            className="border border-slate-300 rounded-lg p-4 mb-4 w-full"
            disabled={showFeedback}
          />
        )}
        {showFeedback && currentQuestion.type === 'text-input' && (
          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="font-semibold">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
            <p>The correct answer is: {currentQuestion.correctAnswer}</p>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        {!showFeedback ? (
          <button
            onClick={handleAnswer}
            className="bg-blue-500 w-full p-4 rounded-lg text-white text-xl font-semibold text-center"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={moveToNextQuestion}
            className="bg-blue-500 w-full p-4 rounded-lg text-white text-xl font-semibold text-center"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
}