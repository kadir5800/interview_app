import React, { useEffect } from 'react'
import { Text, View, Button, Image, StyleSheet, SafeAreaView } from 'react-native'
import { useAuth0 } from 'react-native-auth0';
import { useNavigation } from '@react-navigation/native';

const AppProfil = () => {
    const { user, getCredentials, clearSession } = useAuth0();
    const navigation = useNavigation();

    const handleLogout = async () => {
        await clearSession();
        navigation.replace('AuthHome');
      };

    useEffect(() => {
       if(user == null){
        navigation.replace('AuthHome');
       }
    }, [user]);
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                {user && (
                    <React.Fragment>
                        {user.picture && <Image source={{ uri: user.picture }} style={styles.profileImage} />}
                        <View style={styles.userInfoContainer}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.userEmail}>{user.email}</Text>
                        </View>
                    </React.Fragment>
                )}
            </View>
            <View style={styles.bottomContainer}>
                <Button style={styles.logoutBtn} title="Çıkış Yap" onPress={handleLogout} />
            </View>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    userInfoContainer: {
        alignItems: 'center',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userEmail: {
        fontSize: 16,
        color: 'gray',
    },
    bottomContainer: {
        width: '100%',
        marginBottom: 40,
        marginTop: -40,
        borderRadius: 40,
        padding: 10,
    },
    logoutBtn: {
        width: '100%',
        borderRadius: 40,
        backgroundColor: '#71bdb8',
        color: '#71bdb8',
    },
});
export default AppProfil;