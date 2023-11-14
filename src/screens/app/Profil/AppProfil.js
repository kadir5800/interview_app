import React, { useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native'
import { useAuth0 } from 'react-native-auth0';
import { useNavigation } from '@react-navigation/native';
import { colorPalette } from '../../../colorPalette';

const AppProfil = () => {
    const { user, getCredentials, clearSession } = useAuth0();
    const navigation = useNavigation();

    const handleLogout = async () => {
        await clearSession();
        navigation.replace('AuthHome');
    };

    useEffect(() => {
        if (user == null) {
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
                <TouchableOpacity style={styles.logoutBtn} title="Çıkış Yap" onPress={handleLogout} >
                    <Text style={styles.textt}>
                        Çıkış  Yap
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorPalette.placeholder,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentContainer: {
        marginTop: 30,
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
    },
    logoutBtn: {
        width: '100%',
        height: 50,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: colorPalette.accent,
    },
    textt: {
        color:colorPalette.lighter,
        fontSize:16,
    },
});
export default AppProfil;