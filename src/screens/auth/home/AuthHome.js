import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { useDispatch } from 'react-redux';
import { setUserData,setAuthToken } from '../../../redux/actions/authActions';



const AuthHome = ({ navigation }) => {
  const { authorize, user, error,getCredentials, isLoading } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      if (user != null) {
        dispatch(setUserData(user));
        const token = await getCredentials();
        dispatch(setAuthToken(token));
       navigation.replace('AppHome');
      }
    };

    checkAuthAndRedirect();
  }, [user,error, navigation, dispatch]);

  const handleLogin = async () => {
    try {
      await authorize();
    
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

export default AuthHome;
