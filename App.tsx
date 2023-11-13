import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth0Provider } from 'react-native-auth0';
import { auth0Variables } from './src/auth0/auth0-variables';
import AuthHome from './src/screens/auth/home/AuthHome';
import AppHome from './src/screens/app/Home/AppHome'

import {
  Platform
} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Auth0Provider domain={auth0Variables.domain} clientId={auth0Variables.clientId}>
        <Stack.Navigator initialRouteName="AuthHome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AuthHome" component={AuthHome} />
          <Stack.Screen name="AppHome" component={AppHome} />
        </Stack.Navigator>
      </Auth0Provider>
    </NavigationContainer>
  );
};

export default App;
