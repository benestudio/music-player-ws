import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Player from './components/Player';

const App = () => (
  <SafeAreaProvider>
    <StatusBar hidden />
    <Player />
  </SafeAreaProvider>
);

export default App;
