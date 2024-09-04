import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import quizData from '../quizData.json';
import ProgressBar from '../components/ProgressBar';

type Question = {
  type: 'multiple-choice' | 'true-false' | 'text-input';
  question: string;
  options?: string[];
  correctAnswer: string;
};

export default function QuizScreen() {
  const [currentLevel, setCurrentLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [textInput, setTextInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Reset all states when the screen is visited
      setCurrentLevel('easy');
      setQuestions(quizData['easy']);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer('');
      setTextInput('');
      setShowFeedback(false);
      setIsCorrect(false);
    }, [])
  );

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
          router.push({ pathname: '/result', params: { score: score.toString() } });
        }
      } else {
        router.push({ pathname: '/result', params: { score: score.toString() } });
      }
    }
    setSelectedAnswer('');
    setTextInput('');
    setShowFeedback(false);
  };

  const getPointsForLevel = (level: 'easy' | 'medium' | 'hard') => {
    switch (level) {
      case 'easy': return 10;
      case 'medium': return 20;
      case 'hard': return 30;
    }
  };

  const getRequiredScoreForNextLevel = () => {
    return questions.length * getPointsForLevel(currentLevel) * (2/3);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <Text>Loading...</Text>;
  }


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <View>
          <View className="flex-row justify-between mb-4">
            <Text className="text-lg font-semibold">Level: {currentLevel}</Text>
            <Text className="text-lg font-semibold">Score: {score}</Text>
          </View>
          <ProgressBar progress={(currentQuestionIndex + 1) / questions.length} />
          <Text className="text-right text-sm mt-1">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
        </View>
        
        <ScrollView className="flex-1 mt-8">
          <Text className="text-xl font-semibold mb-8">{currentQuestion.question}</Text>
          {!showFeedback ? (
            <>
              {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                currentQuestion.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedAnswer(option)}
                    className={`p-4 mb-3 rounded-lg w-full border ${
                      selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    <Text className={selectedAnswer === option ? 'text-blue-700' : 'text-slate-700'}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
              {currentQuestion.type === 'true-false' && (
                ['true', 'false'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => setSelectedAnswer(option)}
                    className={`p-4 mb-3 w-full rounded-lg border ${
                      selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    <Text className={selectedAnswer === option ? 'text-blue-700' : 'text-slate-700'}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
              {currentQuestion.type === 'text-input' && (
                <TextInput
                  value={textInput}
                  onChangeText={setTextInput}
                  placeholder="Type your answer here"
                  className="border border-slate-300 rounded-lg p-4 mb-4 w-full"
                />
              )}
            </>
          ) : (
            <View className="w-full items-center mt-4 p-6 bg-blue-100 rounded-lg">
              <View className="flex-row items-center justify-center mb-4">
                {isCorrect ? (
                  <AntDesign name="check" size={24} color="#22c55e" />
                ) : (
                  <AntDesign name="close" size={24} color="#ef4444" />
                )}
                <Text className={`text-2xl font-bold ml-3 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </Text>
              </View>
              <View className="bg-white p-4 rounded-lg w-full">
                <Text className="text-md font-semibold mb-2">Correct Answer:</Text>
                <Text className="text-lg">{currentQuestion.correctAnswer}</Text>
              </View>
              {!isCorrect && (
                <Text className="text-sm text-slate-600 mt-4 text-center">
                  Review the correct answer and try to understand why it's right.
                  You'll do better on the next question!
                </Text>
              )}
            </View>
          )}
        </ScrollView>
        
        <View className="my-4">
          {!showFeedback ? (
            <TouchableOpacity
              onPress={handleAnswer}
              className="bg-blue-500 w-full p-4 rounded-lg"
            >
              <Text className="text-white text-xl font-semibold text-center">Submit Answer</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={moveToNextQuestion}
              className="bg-blue-500 w-full p-4 rounded-lg"
            >
              <Text className="text-white text-xl font-semibold text-center">Next Question</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}