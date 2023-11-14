import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { useDispatch } from 'react-redux';
import { setUserData, setAuthToken } from '../../../redux/actions/authActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorPalette } from '../../../colorPalette';

const AuthHome = ({ navigation }) => {
  const { authorize, user, getCredentials, isLoading } = useAuth0();
  const dispatch = useDispatch();

  const checkAuthAndRedirect = async () => {
    if (user) {
      dispatch(setUserData(user));
      const token = await getCredentials();
      dispatch(setAuthToken(token));
      navigation.replace('AppHome');
    }
  };

  useEffect(() => {
    checkAuthAndRedirect();
    const unsubscribe = navigation.addListener('focus', checkAuthAndRedirect);
    return unsubscribe;
  }, [user, navigation, dispatch, getCredentials]);

  const handleLogin = async () => {
    try {
      await authorize();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colorPalette.background }]}>
        <Text style={{ color: colorPalette.text }}>Loading</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colorPalette.primary }]}>
      <Text style={[styles.title, { color: colorPalette.accent }]}>Hoş Geldiniz!</Text>
      <View style={styles.div}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Icon name={'sign-in'} color="#fff" size={20} style={styles.icon} />
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: colorPalette.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    width: '80%',
    borderRadius: 25,
    marginVertical: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginRight: 10,
  },
  div: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});


export default AuthHome;
