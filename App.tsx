// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//import Component
import OnBoarding from './src/Authentication/OnBoarding/OnBoarding';
import Welcome from './src/Authentication/Welcome/Welcome';
import LoadAssets from './src/components/LoadAssets';


const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

const AuthenticationStack = createStackNavigator(); 
const AuthenticationNavigator = () => (
  <AuthenticationStack.Navigator headerMode="none">
    <AuthenticationStack.Screen name="OnBoarding" component={OnBoarding} />
    <AuthenticationStack.Screen name="Welcome" component={Welcome} />
  </AuthenticationStack.Navigator>
)

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <AuthenticationNavigator /> 
    </LoadAssets>
  );
}

