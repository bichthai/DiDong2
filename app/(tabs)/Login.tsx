import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Register from './Register'
export default function LoginScreen() {
    const navigation = useNavigation(); 

    const handleLogin = () => {
        console.log('Đăng nhập được nhấn');
    };

    return (
        
        <View style={styles.container}>
            <View style={styles.formContainer}>
            <Text style={styles.title}>Đăng nhập</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Tên người dùng</Text>
                    <TextInput style={styles.input} placeholder="Nhập tên người dùng" />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Mật khẩu</Text>
                    <TextInput style={styles.input} secureTextEntry placeholder="Nhập mật khẩu" />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký</Text>
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
        justifyContent: 'center',  // Căn giữa theo chiều dọc
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
        width: '100%',  // Giới hạn chiều rộng của khung
        maxWidth: 400, // Đặt chiều rộng tối đa
        alignSelf: 'center', // Căn giữa khung theo chiều ngang
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
