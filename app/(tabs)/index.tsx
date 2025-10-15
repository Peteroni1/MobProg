import ProfileCard from '@/components/ProfileCard';
import React from 'react';
import { View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <ProfileCard />
    </View>
  );
}
