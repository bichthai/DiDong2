import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Sample Product Data
const sampleProducts = [
  {
    id: 1,
    name: 'Narciso Cristal Eau de Parfum',
    price: 3000000,
    image: 'https://vn-test-11.slatic.net/p/53a4c3473b26452d1e9826c4173b08ef.jpg',
  },
  {
    id: 2,
    name: 'Versace Bright Crystal EDT',
    price: 2900000,
    image: 'https://product.hstatic.net/1000391653/product/anh003_d4394fabd3e140289a06414d469df53e.jpg',
  },
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState(sampleProducts.map(product => ({ ...product, quantity: 1 })));
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');

  // Handle quantity change
  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) } // Ensure quantity is at least 1
          : item
      )
    );
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Giỏ Hàng</Text>
      {cartItems.map(item => (
        <View key={item.id} style={styles.productContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price.toLocaleString()} VND</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* Total Price */}
      <Text style={styles.totalPrice}>Tổng Tiền: {totalPrice.toLocaleString()} VND</Text>

      {/* Payment Method Selection */}
            
      {/* Place Order Button */}
      <TouchableOpacity style={styles.placeOrderButton}>
        <Text style={styles.placeOrderText}>Thanh toán</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productDetails: {
    marginLeft: 10,
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign:'right',

  },
  productPrice: {
    fontSize: 14,
    color: '#d32f2f',
    marginVertical: 5,
textAlign:'right',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',

  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
    
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,

  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'flex-end',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#5D4037',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    
  },
  selectedPaymentButton: {
    backgroundColor: '#FFC0CB', // Color for selected payment method
  },
  placeOrderButton: {
    backgroundColor: '#FFC0CB', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: 150,
    height: 50,
    alignSelf: 'center',
  },
  placeOrderText: {
    color: 'black',
    fontSize: 18,
  },
});

export default Cart;
