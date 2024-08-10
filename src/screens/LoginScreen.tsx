/****************************************************************************
** Login Page 
** contain:  login form
**
**
****************************************************************************/
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { formatPhoneNumber } from '../utils/util';

type LoginScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Login'
>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [mobile, setMobile] = useState<string>('');

    const handleChange = (value: string) => {
        setMobile(formatPhoneNumber(value));
    };



    const handleLogin = async () => {
        try {
            await axios.post('https://demo.mockable.io/login', { mobile });
            navigation.navigate('Welcome');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred during login.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', paddingBottom: 40 }}>
                <Text style={styles.title}>Welcome to App</Text>
                <Text style={styles.subtitle}>Please enter your details.</Text>
            </View>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
                style={styles.input}
                placeholder="+33 222 111 2222"
                value={mobile}
                onChangeText={handleChange}
                keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't you have an account?</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('Registration'); setMobile('') }}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 120
    },
    input: {
        height: 40,
        borderColor: '#D0D5DD',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    btnLogin: {
        width: '100%',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#30B0C7',
        marginVertical: 10,
    },
    btnText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16
    },
    title: {
        fontSize: 24,
        marginVertical: 10,
        fontWeight: '600'
    },
    subtitle: {
        fontSize: 16,
        color: '#667085',
        fontWeight: '400',
    },
    label: {
        color: '#344054',
        fontWeight: '500',
        fontSize: 12,
        marginVertical: 5
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15,
        columnGap: 5
    },
    footerText: {
        color: '#727477',
        fontWeight: '400',
    },
    link: {
        color: '#00D1AC',
        fontWeight: '600',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",

    }
});

export default LoginScreen;
