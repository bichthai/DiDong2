import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation(); 

    const handleLogin = () => {
        console.log('Đăng nhập được nhấn');
    };

    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.formContainer}>
                    <Text style={styles.title}>Đăng ký tài khoản</Text>
                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tên người dùng</Text>
                            <TextInput style={styles.input} placeholder="Nhập tên người dùng" />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mật khẩu</Text>
                            <TextInput style={styles.input} secureTextEntry placeholder="Nhập mật khẩu" />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Xác nhận mật khẩu</Text>
                            <TextInput style={styles.input} secureTextEntry placeholder="Nhập lại mật khẩu" />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Đăng Ký</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập</Text>
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
        justifyContent: 'center', // Căn giữa nội dung theo chiều dọc
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
        width: '85%', // Giới hạn chiều rộng khung là 85% của màn hình
        maxWidth: 400, // Đặt chiều rộng tối đa là 400px
        alignSelf: 'center', // Căn giữa khung theo chiều ngang
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

