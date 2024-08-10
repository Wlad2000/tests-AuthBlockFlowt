/****************************************************************************
** Main Page 
** contain:  redirecting AUTH button 
**
**
****************************************************************************/
import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type WelcomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Welcome'
>;

type Props = {
    navigation: WelcomeScreenNavigationProp;
};

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <Image source={require('../../assets/image.png')} style={styles.image} />
            <Text style={styles.title}>Welcome to AuthApp</Text>
            <Text style={styles.subtitle}>Lorem ipsum dolor sit amet consectetur. A ut pellentesque amet phasellus augue. Neque at
                felis pulvinar malesuada varius egestas dis cras.</Text>
            <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Login </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRegistration} onPress={() => navigation.navigate('Registration')}  >
                <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Registration </Text>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '4%'
    },
    image: {
        width: '100%',
    },
    title: {
        marginTop: 50,
        fontSize: 32,
        marginVertical: 10,
        fontWeight: '700'
    },
    subtitle: {
        fontSize: 14,
        width: '100%',
        marginVertical: 10,
        fontWeight: '400',
        lineHeight: 20,
    },
    btnLogin: {
        width: '100%',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#30B0C7',
        marginVertical: 10,
    },
    btnRegistration: {
        width: '100%',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'gray'
    },
});

export default WelcomeScreen;
