/****************************************************************************
** Registration Page 
** contain:  registration form
**
**
****************************************************************************/
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { formatPhoneNumber } from '../utils/util';

type RegistrationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Registration'
>;

type Props = {
    navigation: RegistrationScreenNavigationProp;
};

const RegistrationScreen: React.FC<Props> = ({ navigation }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        mobile: '',
    });

    const userInfo = [
        { id: "name", text: 'Name', placeholder: 'Enter name', field: 'name', keyboardType: 'default', pattern: /^[A-Za-z]+$/ },
        { id: "lastname", text: 'Last Name', placeholder: 'Enter last name', field: 'lastname', keyboardType: 'default', pattern: /^[A-Za-z]+$/ },
        { id: "phone", text: 'Phone number', placeholder: '+33 222 111 2222', field: 'mobile', keyboardType: 'phone-pad', pattern: /^\+\d{2} \d{3} \d{3} \d{4}$/ },
    ];

    const handleChange = (field: keyof typeof formData, value: string) => {
        if (field === 'mobile') {
            value = formatPhoneNumber(value);
        }
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRegister = async () => {
        const { name, lastname, mobile } = formData;

        for (const item of userInfo) {
            const { field, pattern } = item;
            if (!formData[field].trim()) {
                Alert.alert('Validation Error', 'All fields are required!');
                return;
            }
            if (!pattern.test(formData[field])) {
                Alert.alert('Validation Error', `${item.text} is not in the correct format!`);
                return;
            }
        }
        //test without post
        navigation.navigate('SmsCode');
        setFormData({
            name: '',
            lastname: '',
            mobile: '',
        })
        //
        try {
            await axios.post('https://demo.mockable.io/register', { formData });
            navigation.navigate('SmsCode');
            setFormData({
                name: '',
                lastname: '',
                mobile: '',
            })
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred during registration.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Welcome to App</Text>
                <Text style={styles.subtitle}>Please enter your details.</Text>
            </View>

            {userInfo.map((item) => (
                <React.Fragment key={item.id}>
                    <Text style={styles.label}>{item.text}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={item.placeholder}
                        value={formData[item.field]}
                        onChangeText={(text) => handleChange(item.field, text)}
                        keyboardType={item.keyboardType}
                    />
                </React.Fragment>
            ))}

            <TouchableOpacity style={styles.btnLogin} onPress={handleRegister}>
                <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Do you have an account?</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Login');
                    setFormData({
                        name: '',
                        lastname: '',
                        mobile: '',
                    })
                }}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 120,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        paddingBottom: 40,
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

export default RegistrationScreen;
