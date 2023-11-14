import React, { useState ,useRef } from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity,Animated,Dimensions  } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profil from '../Profil/AppProfil';
import Characters from '../Characters/Characters';
import Series from '../Series/Series';
import { colorPalette } from '../../../colorPalette';
import Statistics from '../Statistics/Statistics';


const SettingsScreen = () => {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const Tab = createBottomTabNavigator();

const AppHome = ({ navigation }) => {
  const { user } = useAuth0();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuOpen(true);
  };

  const closeMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuOpen(false));
  };

  const getTabBarIcon = (route, focused) => {
    let iconName;
    let iconColor = focused ? colorPalette.primary : colorPalette.darker;
    let backgroundColor = focused ? colorPalette.lighter : colorPalette.primary;

    if (route.name === 'Profil') {
      iconName = 'user';
    } else if (route.name === 'Ayarlar') {
      iconName = 'cog';
    } else if (route.name === 'Karekterler') {
      iconName = 'list';
    } else if (route.name === 'Seriler') {
      iconName = 'book';
    }else if (route.name === 'İstatistikler') {
      iconName = 'signal';
    }

    return (
      <View style={{ backgroundColor, borderRadius: 20, padding: 5, width: 35, height: 35, alignItems: 'center', marginTop: 5, }}>
        <Icon name={iconName} size={24} color={iconColor} />
      </View>
    );
  };
  const renderTabBarButton = () => {
    const buttonWidth = 40;
    const buttonHeight = 40;

    const menuPosition = menuAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.85], // Menü açıkken butonun sağa kayma oranı
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 55,
          right: menuPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [10,windowWidth * 0.85],
          }),
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: colorPalette.accent,
            borderRadius: 30,
            width: buttonWidth,
            height: buttonHeight,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
          }}
          onPress={isMenuOpen ? closeMenu : openMenu}
        >
          <Icon name="user" size={24} color={colorPalette.lighter} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colorPalette.background }}>
      <Tab.Navigator
        initialRouteName="Karekterler"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colorPalette.lighter,
          tabBarInactiveTintColor: colorPalette.lighter,
          tabBarStyle: {
            backgroundColor: colorPalette.primary,
            position: 'absolute',
            height: 50,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
          tabBarIcon: ({ color, size, focused }) => {
            return getTabBarIcon(route, focused);
          },
        })}
      >
        <Tab.Screen options={{ headerShown: false }} name="Karekterler" component={Characters} />
        <Tab.Screen options={{ headerShown: false }} name="Seriler" component={Series} />
        <Tab.Screen options={{ headerShown: false }} name="İstatistikler" component={Statistics} />
        <Tab.Screen options={{ headerShown: false }} name="Ayarlar" component={SettingsScreen} />
      </Tab.Navigator>
      {renderTabBarButton()}
      {isMenuOpen && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            right: menuAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ['-100%', '0%'],
            }),
            bottom: 0,
            width: '70%',
            backgroundColor: '#fff',
            zIndex: 1,
          }}
        >
          <Profil navigation={navigation} />
          <TouchableOpacity style={{ position: 'absolute', top: 5, right: 10, padding: 10 }} onPress={closeMenu}>
            <Icon name="times" size={24} color="#000" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default AppHome