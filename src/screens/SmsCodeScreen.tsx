/****************************************************************************
** Secure code Page 
** 
**
**
****************************************************************************/
import React, { Fragment, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { CodeField, useBlurOnFulfill, useClearByFocusCell, Cursor } from 'react-native-confirmation-code-field';

type SmsCodeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'SmsCode'
>;

type Props = {
    navigation: SmsCodeScreenNavigationProp;
};

const CELL_COUNT = 6;

const SmsCodeScreen: React.FC<Props> = ({ navigation }) => {
    const [value, setValue] = useState<string>('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const handleVerifyCode = () => {
        if (value === '222222') { // TEST Mock validation
            navigation.navigate('Welcome');
        } else {
            Alert.alert('Invalid code', 'The code you entered is incorrect.');
        }
    };

    const handleResendCode = () => {
        Alert.alert('Code Resent', 'A new code has been sent to your mobile number.');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Welcome to App</Text>
                <Text style={styles.subtitle}>Enter the confirmation code that was sent to you by SMS</Text>
            </View>
            <Text style={styles.label}>Secure Code</Text>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Fragment key={index}>
                        <View
                            key={index}
                            style={[
                                styles.cell,
                                isFocused && styles.focusCell,
                            ]}
                            onLayout={getCellOnLayoutHandler(index)}
                        >
                            <Text style={[
                                styles.cellText,
                                symbol === '' && styles.cellPlaceholder
                            ]}>
                                {symbol || (isFocused ? <Cursor /> : '0')}
                            </Text>
                        </View>
                        {index === 2 ? (
                            <View key={`separator-${index}`} style={styles.separator} />
                        ) : null}
                    </Fragment>
                )}
            />
            <TouchableOpacity style={styles.resend} onPress={handleResendCode}>
                <Text style={styles.resendText}>Resend the Code</Text>
            </TouchableOpacity>
            <TouchableOpacity
                disabled={value.length !== CELL_COUNT}
                style={[styles.signUpButton, { backgroundColor: value.length !== CELL_COUNT ? '#30b0c785' : '#30B0C7' }]}
                onPress={handleVerifyCode}
            >
                <Text style={styles.signUpButtonText}>Sign up</Text>
            </TouchableOpacity>
        </View>
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
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 11,
        marginVertical: 5,

    },

    codeFieldRoot: {
        marginBottom: 20,
        justifyContent: 'center',
        flexDirection: 'row', // Align cells in a row
    },
    separator: {
        height: 2,
        width: 10,
        backgroundColor: '#C4C5C6',
        alignSelf: 'center',
    },
    cell: {
        width: 52,
        height: 64,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#EEE8F0',
        textAlign: 'center',
        marginHorizontal: 5,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    focusCell: {
        borderColor: '#30B0C7',
    },
    cellText: {
        fontWeight: 'bold',
        fontSize: 38,
        textAlign: 'center',
        color: '#30B0C7'
    },
    cellPlaceholder: {
        color: '#C4C5C6',
    },
    resend: {
        width: '100%',
        alignItems: 'center'
    },
    resendText: {
        textAlign: '2',
        fontWeight: '600', fontSize: 14,
        color: '#00D1AC',
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    signUpButton: {
        width: '100%',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        marginVertical: 10,
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SmsCodeScreen;
