import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the types for route params
type RootStackParamList = {
  ProductDetail: {
    product: {
      id: number;
      title: string;
      price: number;
      description: string;
      image: string;
      category: string;
    };
  };
  Cart: undefined;
};

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;

type Props = {
  route: ProductDetailRouteProp;
  navigation: ProductDetailNavigationProp;
};

const ProductDetail: React.FC<Props> = ({ route, navigation }) => {
  const { product } = route.params;

  // States for product options, cart items, cart count, and related products
  const [selectedSize, setSelectedSize] = useState('100ml');
  const [selectedScent, setSelectedScent] = useState('Vanila');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  // Fetch related products when the component mounts
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${product.category}`);
        const data = await response.json();
        setRelatedProducts(data.filter((item: any) => item.id !== product.id)); // Exclude the current product
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();
  }, [product.category, product.id]);

  // Handle adding products to cart with selected options
  const handleAddToCart = () => {
    const newItem = {
      productId: product.id,
      title: product.title,
      size: selectedSize,
      scent: selectedScent,
      price: product.price,
      quantity: 1,
    };

    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.productId === product.id &&
        item.size === selectedSize &&
        item.scent === selectedScent
    );

    if (existingItemIndex > -1) {
      // Update quantity if the item already exists in the cart
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // Add new item to the cart
      setCartItems((prevItems) => [...prevItems, newItem]);
    }

    setCartCount((prevCount) => prevCount + 1); // Increment cart count
    console.log('Cart Items:', cartItems);
  };

  const buyNow = () => {
    console.log('Buy Now:', {
      ...product,
      size: selectedSize,
      scent: selectedScent,
    });
  };

  const renderRelatedProduct = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.relatedProduct} onPress={() => {/* Navigate to product detail */}}>
      <Image source={{ uri: item.image }} style={styles.relatedProductImage} />
      <Text style={styles.relatedProductTitle}>{item.title}</Text>
      <Text style={styles.relatedProductPrice}>{item.price.toLocaleString()} $</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header with Cart Icon */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ProductDetail</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View style={styles.cartIconContainer}>
            <Text style={styles.cartIcon}>🛒</Text>
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Product Image */}
      <Image source={{ uri: product.image }} style={styles.productImage} />

      {/* Product Details */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{product.title}</Text>
        <Text style={styles.productPrice}>{product.price.toLocaleString()} $</Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        {/* Picker for Color and Size */}
        <View style={styles.pickerRow}>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Color</Text>
            <Picker
              selectedValue={selectedScent}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedScent(itemValue)}
            >
              <Picker.Item label="Blue" value="Blue" />
              <Picker.Item label="White" value="White" />
              <Picker.Item label="Black" value="Black" />
              <Picker.Item label="Pink" value="Pink" />
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Size</Text>
            <Picker
              selectedValue={selectedSize}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedSize(itemValue)}
            >
              <Picker.Item label="S" value="S" />
              <Picker.Item label="M" value="M" />
              <Picker.Item label="L" value="L" />
              <Picker.Item label="XL" value="XL" />
            </Picker>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={buyNow}>
            <Text style={styles.addButtonText}>Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Related Products Section */}
      <Text style={styles.relatedProductsTitle}>Related Products</Text>
      <FlatList
        data={relatedProducts}
        renderItem={renderRelatedProduct}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.relatedProductsContainer}
      />
    </ScrollView>
  );
};

// Styles
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
  cartIconContainer: {
    position: 'relative',
  },
  cartIcon: {
    color: '#FF91A4',
    fontSize: 24,
  },
  cartBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  productDetails: {
    marginTop: 20,
    alignItems: 'center',
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 20,
    color: '#FF91A4',
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
    width: '50%',
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
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  addButton: {
    backgroundColor: '#FFC0CB',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFC0CB',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  relatedProductsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  relatedProductsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  relatedProduct: {
    marginRight: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    padding: 10,
    width: 170, // Fixed width for uniformity
    height: 220, // Set height for consistent card size
  },
  relatedProductImage: {
    width: '100%', // Use full width of the card
    height: 120, // Adjusted height for a better aspect ratio
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 5, // Added margin below image for spacing
  },
  relatedProductTitle: {
    fontSize: 14, // Adjusted font size for better readability
    textAlign: 'center',
    marginVertical: 3,
    fontWeight: 'bold',
    color: '#333',
  },
  relatedProductPrice: {
    fontSize: 14,
    color: '#FF91A4',
    textAlign: 'center',
  },


});

export default ProductDetail;
