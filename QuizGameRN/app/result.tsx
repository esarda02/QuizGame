/*
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';

export default function ResultScreen() {
  const { score } = useLocalSearchParams<{ score: string }>();

  const handleRestart = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-2xl font-bold mb-16">Quiz Completed!</Text>
        <Text className="text-xl mb-16">Your Score: {score}</Text>
        <TouchableOpacity
          onPress={handleRestart}
          className="bg-blue-500 w-full p-4 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
*/
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function ResultScreen() {
  const { score } = useLocalSearchParams<{ score: string }>();
  const handleRestart = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center p-6">
      <Text className="text-4xl font-bold mb-16">Quiz Completed!</Text>
      <View className="bg-blue-100 rounded-full w-40 h-40 justify-center items-center mb-16">
        <Text className="text-5xl font-bold">{score}</Text>
        <Text className="text-xl">Score</Text>
      </View>
      <TouchableOpacity
        onPress={handleRestart}
        className="bg-blue-500 w-full p-4 rounded-lg shadow-md active:opacity-80"
      >
        <Text className="text-white text-center font-bold text-lg">Restart Quiz</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}