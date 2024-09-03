import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text className="text-4xl font-bold mb-8">Quiz Game</Text>
      <Link href="/quiz" asChild>
        <TouchableOpacity className="bg-blue-500 px-10 py-4 rounded-lg">
          <Text className="text-xl text-white font-semibold">Start Quiz</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}