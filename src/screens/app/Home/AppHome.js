import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profil from '../Profil/AppProfil';
import Characters from '../Characters/Characters';
import Series from '../Series/Series';

const SettingsScreen = () => {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();
const AppHome = ({ navigation }) => {
  const { user } = useAuth0();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Characters"
        tabBarOptions={{
          activeTintColor: '#524F72',
          inactiveTintColor: 'white',
        }}
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: '#71bdb8',
            position: 'absolute',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Profil') {
              iconName = 'user';
            } else if (route.name === 'Settings') {
              iconName = 'cog';
            } else if (route.name === 'Characters') {
              iconName = 'list';
            } else if (route.name === 'Series') {
              iconName = 'book';
            }

            // İkona uygun bir FontAwesome ikonu ekleyin
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen options={{ headerShown: false }} name="Characters" component={Characters} />
        <Tab.Screen options={{ headerShown: false }} name="Series" component={Series} />
        <Tab.Screen options={{ headerShown: false }} name="Profil" component={() => <Profil navigation={navigation} />} />
        <Tab.Screen options={{ headerShown: false }} name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default AppHome;
