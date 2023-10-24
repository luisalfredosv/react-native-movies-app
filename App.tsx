import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './src/navigation/Navigation';
import {GradientProvider} from './src/contexts/GradientContext';

const App = () => {
  return (
    <NavigationContainer>
      <GradientProvider>
        <Navigation />
      </GradientProvider>
    </NavigationContainer>
  );
};

export default App;
