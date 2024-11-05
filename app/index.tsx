import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductDetail from './ProductDetails';
import Cart from './Cart';
import { CartProvider } from './CartContext';
import Login from './Login';
import Register from './Register';
import Payment from './Payment';
interface HeaderProps {
  navigation: {
    navigate: (screen: string) => void; // Defines the navigate function
  };
}
const Header: React.FC<HeaderProps> = ({ navigation }) => (
  <View style={styles.header}>
    <Text style={styles.menuIcon}>☰</Text>
    <Text style={styles.title}>Bich Thai Shop</Text>
    <View style={styles.headerButtons}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.headerButton}>
        <Text style={styles.buttonTextt}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.headerButton}>
        <Text style={styles.buttonTextt}>Register</Text>
      </TouchableOpacity>
    </View>
  </View>
);


// SearchBar Component
const SearchBar: React.FC<{ products: any[], onSearch: (filteredProducts: any[]) => void }> = ({ products, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    onSearch(filtered);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search..."
        style={styles.input}
        value={searchTerm}
        onChangeText={handleSearch}
      />
    </View>
  );
};

// Category Buttons
// Update your categories
const categories = ['All', 'jewelery', "men's clothing", "women's clothing"];

// Bar Component
interface BarProps {
  onSelectCategory: (category: string) => void;
}

const Bar: React.FC<BarProps> = ({ onSelectCategory }) => (
  <View style={styles.barContainer}>
    <ScrollView
      horizontal
      contentContainerStyle={styles.scrollContainer}
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, categoryStyles[category]]}
          onPress={() => onSelectCategory(category)}
        >
          <Text style={styles.buttonText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

// ProductList Component
const ProductList: React.FC<{ products: any[], navigation: any }> = ({ products, navigation }) => (
  <View style={styles.container}>
    <Text style={styles.sectionTitle}>Outstanding Products </Text>
    <View style={styles.productContainer}>
      {products.map(product => (
        <TouchableOpacity
          style={styles.product}
          key={product.id}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ProductDetail', { product })}
        >
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.title}</Text>
            <Text style={styles.productPrice}>{product.price} $</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

// Footer Component
const Footer: React.FC = () => (
  <View style={styles.footer}>
    <View style={styles.footerContent}>
      <View style={styles.footerSection}>
        <Text style={styles.footerTitle}>Introduce</Text>
        <Text>Tran Nu Bich Thai</Text>
        <Text>📞 +84395539846</Text>
        <Text>📧 bt@gmail.com</Text>
      </View>
      <View style={styles.footerSection}>
        <Text style={styles.footerTitle}>Contact</Text>
        <Text>Introduce</Text>
        <Text>Purchase policy</Text>
        <Text>Terms of service</Text>
      </View>
      <View style={styles.footerSection}>
        <Text style={styles.footerTitle}>Trademark</Text>
        <Text>Dior</Text>
        <Text>Chanel</Text>
        <Text>Ysl</Text>
      </View>
      <View style={styles.footerSection}>
        <Text style={styles.footerTitle}>Service</Text>
        <Text>Security</Text>
        <Text>Legal</Text>
        <Text>Maintenance</Text>
      </View>
    </View>
  </View>
);

// Stack Navigator
const Stack = createStackNavigator();

// Home Screen Component
const HomeScreen: React.FC<any> = ({ navigation }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setFilteredProducts(response.data); // Set initial products to display
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSelectCategory = (category: string) => {
    const filtered = category === 'All'
      ? products // If "All" is selected, show all products
      : products.filter(product => product.category === category); // Filter by selected category
    setFilteredProducts(filtered); // Update filtered products
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF91A4" style={styles.loader} />;
  }

  return (
    <ScrollView>
      <Header navigation={navigation} />
      <SearchBar products={products} onSearch={setFilteredProducts} />
      <Image
        source={{ uri: 'https://theperfumestore.vn/wp-content/uploads/2021/02/luxury-fragrances-banner-.jpg' }}
        style={styles.welcomeImage}
      />
      <Bar onSelectCategory={handleSelectCategory} /> {/* Pass the handler here */}
      <ProductList products={filteredProducts} navigation={navigation} />
      <Footer />
    </ScrollView>
  );
};



// Main App Component
const App: React.FC = () => {
  return (
    <CartProvider>
      <Stack.Navigator initialRouteName="Login">{/* Đổi trang chủ ở đây */}
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login', headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Register', headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
      </Stack.Navigator>
    </CartProvider>
  )
}
export default App;




const categoryStyles: Record<string, any> = {
  All: {
    backgroundColor: '#FFE4E1',
    height: 50,
    width: 100,
    border: 'none',

  },
  jewelery: {
    backgroundColor: '#FFE4E1',
    width: 120,
    height: 50,
    border: 'none',

  },
  "men's clothing": {
    backgroundColor: '#FFE4E1',
    width: 130,
    height: 50,
    border: 'none',
  },
  "women's clothing": {
    backgroundColor: '#FFE4E1',
    height: 50,
    width: 160,
    border: 'none',

  },
};

// Styles
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFE4E1',
    padding: 10,
    height: 50,
  },
  title: {
    fontWeight: 'bold',
    color: '#FF91A4',
    fontSize: 18,
  },
  menuIcon: {
    color: '#FF91A4',
    fontSize: 24,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 10,
  },
  buttonText: {
    color: '#FF91A4',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic', // Chữ in nghiêng

  },
  buttonTextt: {
    color: '#FF91A4',

  },

  searchContainer: {
    paddingHorizontal: 15,
  },
  input: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FF91A4',
    borderRadius: 5,
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align categories to the right
    alignItems: 'center',
    marginVertical: 10,
    paddingRight: 15, // Add padding to the right for spacing
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
  },
  barContainer: {
    width: '100%', // Take full width
    alignItems: 'flex-end', // Align items to the right
  },
  rightButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  button: {
    padding: 10,
    width: 130,
    borderColor: '#FF91A4',
    borderWidth: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonActive: {
    padding: 8,
    width: 140,
    backgroundColor: '#FF91A4',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  container: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF91A4',
  },
  product: {
    width: '30%',
    height: 260,
    margin: '1%',
    borderWidth: 1,
    borderColor: '#FF91A4',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: '82%',
    height: 150,
    borderRadius: 1,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 12,
    color: '#FF91A4',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#FF91A4',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
  productInfo: {
    alignItems: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFE4E1',
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerSection: {
    flex: 1,
    paddingHorizontal: 10,
  },
  footerTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialIcon: {
    width: 35,
    height: 35,
    marginHorizontal: 10,
  },
  welcomeImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
});

