import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ProductDetail = () => {
    const [selectedSize, setSelectedSize] = useState("100ml");
    const [selectedColor, setSelectedColor] = useState("Vanila");

    const addToCart = () => {
        // Function to handle adding to cart
        console.log('Added to cart');
    };

    const buyNow = () => {
        // Function to handle buy now
        console.log('Buy Now');
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header with Shopping Cart Icon */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}></Text>
                <TouchableOpacity onPress={() => console.log('Go to Cart')}>
                <Text >🛒</Text>
                </TouchableOpacity>
            </View>

            {/* Product Image */}
            <Image
                source={{ uri: 'https://vn-test-11.slatic.net/p/53a4c3473b26452d1e9826c4173b08ef.jpg' }}
                style={styles.productImage}
            />
            {/* Product Details */}
            <View style={styles.productDetails}>
                {/* Product Name */}
                <Text style={styles.productName}>Narciso Cristal Eau de Parfum</Text>
                {/* Product Price */}
                <Text style={styles.productPrice}>3.000.000 VND</Text>
                {/* Product Description */}
                <Text style={styles.productDescription}>
                    Nước hoa Narciso Cristal Eau de Parfum với hương thơm ​​sang trọng, phù hợp cho phụ nữ.
                </Text>
                <Text style={styles.productDescription}>
                    Dung tích 90ml, mang lại cảm giác quyến rũ.
                </Text>

                {/* Size and Color Picker Container */}
                <View style={styles.pickerRow}>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>Thể tích</Text>
                        <Picker
                            selectedValue={selectedSize}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedSize(itemValue)}
                        >
                            <Picker.Item label="100ml" value="100ml" />
                            <Picker.Item label="500ml" value="500ml" />
                            <Picker.Item label="1000ml" value="1000ml" />
                            <Picker.Item label="1500ml" value="1500ml" />
                        </Picker>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>Hương</Text>
                        <Picker
                            selectedValue={selectedColor}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedColor(itemValue)}
                        >
                            <Picker.Item label="Vanila" value="Vanila" />
                            <Picker.Item label="Hoa hồng" value="Hoa hồng" />
                            <Picker.Item label="Oải hương" value="Oải hương" />
                            <Picker.Item label="Violet" value="Violet" />
                        </Picker>
                    </View>
                </View>

                {/* Add to Cart and Buy Now Buttons Container */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={addToCart}>
                        <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={buyNow}>
                        <Text style={styles.buttonText}>Mua ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cartIcon: {
        color: '#FF91A4',
        fontSize: 24,
    },
    productImage: {
        width: '100%', // Make image responsive
        height: 300,
        borderRadius: 10,
        resizeMode: 'contain', // Ensures the image fits well
    },
    productDetails: {
        marginTop: 20,
        alignItems: 'center',
    },
    productName: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center', // Center the text
    },
    productPrice: {
        fontSize: 20,
        color: 'black',
        marginVertical: 10,
    },
    productDescription: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 15,
        fontStyle: 'italic',
    },
    pickerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%', // Adjusted width for full responsiveness
        marginVertical: 10,
    },
    pickerContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    label: {
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 5,
    },
    picker: {
        height: 50,
        width: '100%', // Make picker full width
    },
    buttonContainer: {
        flexDirection: 'row', // Align buttons horizontally
        justifyContent: 'space-between', // Space between buttons
        width: '70%', // Full width for the button container
    },
    button: {
        backgroundColor: '#FFC0CB', 
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        flex: 1, // Make buttons take equal space
        marginHorizontal: 5, // Add margin between buttons
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
    },
});

export default ProductDetail;
