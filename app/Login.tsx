import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); 

    const handleLogin = () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in both username and password');
            return;
        }

        console.log('Login button pressed');
        try {
            // Replace this with your actual API call for authentication
            // const response = await axios.post('your_auth_api_endpoint', { username, password });
    
            // For now, we'll just navigate to the Home screen
            navigation.navigate('Home');
        } catch (error) {
            console.error('Login failed:', error);
            Alert.alert('Error', 'Login failed. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Enter username" 
                        value={username} 
                        onChangeText={setUsername}
                        autoCapitalize="none"
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
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.linkText}>Don't have an account yet? Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE4E1',
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF91A4',
        marginVertical: 20,
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
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
