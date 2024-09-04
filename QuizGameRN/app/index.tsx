import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center px-6 py-10">
      <Text className="text-5xl font-extrabold text-blue-700 mb-20 tracking-wide">
        Quiz Game
      </Text>
      <Link href="/quiz" asChild>
        <TouchableOpacity
          className="bg-blue-500 w-4/5 flex items-center px-12 py-5 rounded-xl shadow-lg shadow-blue-300 active:bg-blue-600 transition duration-200"
        >
          <Text className="text-2xl text-white font-semibold tracking-wide">
            Start Quiz
          </Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}
