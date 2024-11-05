import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Cart: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState<{ productId: number; quantity: number }[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cart data from API
  const fetchCart = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/carts/1');
      const cartData = await response.json();
      return cartData.products;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return [];
    }
  };

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const cartProducts = await fetchCart();
      setCartItems(cartProducts);
      setIsLoading(false);
    };

    fetchData();
    fetchProducts(); // Fetch products when component mounts
  }, []);

  // Handle quantity change
  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.productId === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  // Handle removing an item
  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== id));
  };

  // Add product to cart
  const handleAddToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.productId === product.id);
    if (existingItem) {
      handleQuantityChange(product.id, 1);
    } else {
      setCartItems(prevItems => [...prevItems, { productId: product.id, quantity: 1 }]);
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>

      {cartItems.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return null;

        return (
          <View key={product.id} style={styles.productContainer}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.title}</Text>
              <Text style={styles.productPrice}>{product.price.toLocaleString()} $</Text>

              <View style={styles.actionRow}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => handleQuantityChange(product.id, -1)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(product.id, 1)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => handleRemoveItem(product.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}

      <Text style={styles.totalPrice}>Total: {totalPrice.toLocaleString()} $</Text>
      {/* Navigate to Payment page */}
      <TouchableOpacity 
        style={styles.placeOrderButton} 
        onPress={() => navigation.navigate('Payment', { totalPrice })}>
        <Text style={styles.placeOrderText}>Checkout</Text>
      </TouchableOpacity>

      {/* Add Product Section */}
      <Text style={styles.title}>Other Products</Text>
      {products.map(product => (
        <View key={product.id} style={styles.productContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.title}</Text>
            <Text style={styles.productPrice}>{product.price.toLocaleString()} $</Text>
            <TouchableOpacity onPress={() => handleAddToCart(product)} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
    color:'#FF91A4',
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
    alignItems: 'center',
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
    textAlign: 'right',
  },
  productPrice: {
    fontSize: 14,
    color: '#d32f2f',
    marginVertical: 5,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
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
  deleteButton: {
    backgroundColor: '#FFC0CB',
    padding: 10,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  placeOrderButton: {
    backgroundColor: '#FFC0CB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: 150,
    height: 50,
    alignSelf: 'flex-end',
  },
  placeOrderText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FFC0CB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: 150,
    height: 50,
    alignSelf: 'flex-end',
  },
  addButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Cart;
