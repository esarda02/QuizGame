import React from 'react';
import { View } from 'react-native';

type ProgressBarProps = {
  progress: number; // 0 to 1
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <View 
        className="h-full bg-blue-500"
        style={{ width: `${progress * 100}%` }}
      />
    </View>
  );
};

export default ProgressBar;