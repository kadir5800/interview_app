import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../../../redux/actions/authActions';



const HomeScreen = ({ navigation }) => {
  const { authorize, clearSession, user, error, isLoading } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      if (user != null) {
        console.log(user);
        // Kullanıcı giriş yapmışsa, kullanıcı bilgilerini Redux store'a kaydet
        dispatch(setUserData(user));
        // Ardından ana sayfaya yönlendir
       navigation.replace('AppHome');
      }
    };

    checkAuthAndRedirect();
  }, [user,error, navigation, dispatch]);

  const handleLogin = async () => {
    try {
      await authorize();
    
      // Kullanıcı giriş yaptıktan sonra çalışacak kodlar
      dispatch(setUserData(user));
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  if (isLoading) {
    return <View style={styles.container}><Text>Loading</Text></View>;
  }
  const loggedIn = user !== undefined && user !== null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoş Geldiniz!</Text>
      <View style={styles.div}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}>
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
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    width: '80%',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  div: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default HomeScreen;
