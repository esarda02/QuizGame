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
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-2xl font-bold mb-4">Quiz Completed!</Text>
        <Text className="text-xl mb-4">Your Score: {score}</Text>
        <TouchableOpacity
          onPress={handleRestart}
          className="bg-blue-500 py-2 px-4 rounded-lg"
        >
          <Text className="text-white font-semibold">Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}