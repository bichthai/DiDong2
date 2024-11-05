import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function HomeScreen() {
    const navigation = useNavigation();
    
    // State variables for registration
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu không khớp!');
            return;
        }

        try {
            // Sending the registration request to the API
            const response = await axios.post('https://fakestoreapi.com/users', {
                username,
                password,
                // You may want to include other user details such as email if needed
            });

            // Handle successful registration
            console.log('Đăng ký thành công:', response.data);
            Alert.alert('Thành công', 'Tài khoản đã được đăng ký thành công!');

            // Navigate to the login screen after registration
            navigation.navigate('Login'); // Adjust according to your navigation flow
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error);
            Alert.alert('Lỗi', 'Đã xảy ra sự cố khi đăng ký. Vui lòng thử lại!');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Register</Text>
                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>User name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter username"
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                placeholder="Enter password"
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Confirm password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                placeholder="Re-enter the password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.linkText}>Already have an account? Log in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE4E1',
        justifyContent: 'center',
    },
    formContainer: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#cd853f',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: '85%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF91A4',
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        marginTop: 20,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#FF91A4', 
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#FFC0CB',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#FFC0CB',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
    },
    linkText: {
        marginTop: 15,
        textAlign: 'center',
        fontSize: 16,
        color: '#FF91A4',
        fontWeight: 'bold',
    },
});
