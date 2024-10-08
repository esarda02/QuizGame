import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';

export default function ResultScreen() {
  const { score } = useLocalSearchParams<{ score: string }>();
  const handleRestart = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center p-6">
      <Image 
        source={require('../assets/images/score.png')}
        className="w-48 h-48"
        resizeMode='contain'
      />
      <Text className="text-4xl text-blue-700 font-bold mb-8">Quiz Completed!</Text>
      <View className="bg-blue-100 rounded-xl w-40 h-40 justify-center items-center mb-16">
        <Text className="text-5xl font-bold">{score}</Text>
        <Text className="text-xl">Score</Text>
      </View>
      <TouchableOpacity
        onPress={handleRestart}
        className="bg-blue-500 w-3/4 p-4 rounded-lg shadow-md active:opacity-80"
      >
        <Text className="text-white text-center font-bold text-lg">Restart Quiz</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}