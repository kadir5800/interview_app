import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {useAuth0, Auth0Provider} from 'react-native-auth0';

const AppHome = ({ navigation }) => {

    const {user} = useAuth0();
    return (
      <View>
        <Text>{user ? `Merhaba, ${user.name}!` : 'Hoş geldiniz!'}</Text>
      </View>
    );
  
}
export default AppHome;