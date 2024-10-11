import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Header component
const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.menuIcon}>☰</Text>
      <Text style={styles.title}>Bich Thai Shop</Text>
      <Text style={styles.cartIcon}>🛒</Text>
    </View>
  );
};

// Search Bar and Category Buttons
const SearchBar: React.FC = () => {
  return (
    <View>
      <TextInput
        placeholder="Tìm kiếm sản phẩm..."
        style={styles.input}
      />
    </View>
  );
};

const Bar: React.FC = () => {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonActive}>
        <Text style={styles.buttonTextActive}>BodyMist</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>BodyPerfume</Text>
      </TouchableOpacity>
    </View>
  );
};

// Featured Products Section
const ProductList: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Sản Phẩm Nổi Bật</Text>
      <View style={styles.productContainer}>
        {/* Individual Product */}
        <View style={styles.product}>
          <Image
            source={{ uri: 'https://mfparis.vn/wp-content/uploads/2022/08/nuoc-hoa-nu-narciso-cristal-eau-de-parfum-90ml-mfparis.jpg' }}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Narciso Cristal Eau de</Text>
            <Text style={styles.productPrice}>3.000.000 VND</Text>
          </View>
        </View>

        <View style={styles.product}>
          <Image
            source={{ uri: 'https://product.hstatic.net/1000025647/product/chance-eau-tendre-eau-de-parfum_1024x1024.png' }}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Chance Eau Vive</Text>
            <Text style={styles.productPrice}>5.700.000 VND</Text>
          </View>
        </View>

        <View style={styles.product}>
          <Image
            source={{ uri: 'https://perfume168.com/wp-content/uploads/2018/08/z4389573201102_42bd5bc28c2be70d336ba37b2b7d70e8-copy.png' }}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Victoria's Secret</Text>
            <Text style={styles.productPrice}>2.050.000 VND</Text>
          </View>
        </View>
        <View style={styles.product}>
           <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgGOQrjXvbDukMoopyYC703A-RhQJ9_BteCDjOZ1S1_4hOcvGVWbWDGe8fTRGrviQdR5A&usqp=CAU' }} 
           style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Givenchy Irresistible</Text>
               <Text style={styles.productPrice}>2.850.000 VND</Text> 
               </View>
                </View>
                 <View style={styles.product}> 
                  <Image source={{ uri: 'https://product.hstatic.net/1000391653/product/anh003_d4394fabd3e140289a06414d469df53e.jpg' }}
                   style={styles.productImage} /> 
                   <View style={styles.productInfo}>
                     <Text style={styles.productName}>Versace Bright Crystal</Text>
                     <Text style={styles.productPrice}>2.900.000 VND</Text>
                      </View>
                       </View>
                        <View style={styles.product}>
                           <Image source={{ uri: 'https://product.hstatic.net/1000340570/product/noade-naturelle_296d21fe26ad475b80916007ebfdce33.jpg' }}
                            style={styles.productImage} />
                             <View style={styles.productInfo}>
                               <Text style={styles.productName}>Chloe Nomade</Text> 
                               <Text style={styles.productPrice}>1.950.000 VND</Text>
                                </View> 
                                </View> 
                                </View>
                                 </View> 
                                 ); 
                                } 

        {/* More products */}
     

// Footer Component
const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        {/* Giới thiệu and Liên hệ sections in a row */}
        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>Giới thiệu</Text>
          <Text>Trần Nữ Bích Thái</Text>
          <Text>+84395539846</Text>
          <Text>bichthai@gmail.com</Text>
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>Liên hệ</Text>
          <Text>Giới thiệu</Text>
          <Text>Chính sách mua hàng</Text>
          <Text>Điều khoản dịch vụ</Text>
        </View>
        
      </View>
      

      <Text >Theo dõi BichThai từ các nền tảng khác nhau nhé!</Text>

      <View style={styles.socials}>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/facebook.svg?1710226595388' }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/instagram.svg?1710226595388' }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/tiktok.svg?1710226595388' }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


// Main App Component
const App: React.FC = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Header />
      <SearchBar />

      <Image
        source={{ uri: 'https://theperfumestore.vn/wp-content/uploads/2021/02/luxury-fragrances-banner-.jpg' }}
        style={styles.welcomeImage}
      />
      <Bar />
      <ProductList />
      <Footer />
    </ScrollView>
  );
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
  cartIcon: {
    color: '#FF91A4',
    fontSize: 24,
  },
  input: {
    width: '99%',
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttons: {
    alignSelf: 'flex-end',
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonActive: {
    padding: 10,
    borderColor: '#FF91A4',
    borderWidth: 1,
    backgroundColor: '#FFE4E1',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 14,
  },
  buttonTextActive: {
    fontSize: 14,
    color: 'black',
  },
  container: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  product: {
    width: 70,
    height: 140,
    flex: 1,
    margin: 3,
    borderWidth: 1,
    borderColor: '#FF91A4',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 5,
  },
  productName: {
    fontSize: 10,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 10,
    color: 'gray',
  },
  productInfo: {
    alignItems: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFE4E1',
  },
  footerContent: {
    flexDirection: 'row', // Align Giới thiệu and Liên hệ sections horizontally
    justifyContent: 'space-between', // Optional: to create space between the sections
  },
  footerSection: {
    flex: 1, // Adjusts the width of each section
    paddingHorizontal: 10,
  },
  footerTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  socials: {

    flexDirection: 'row',
    marginTop: 20,
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },

  welcomeImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

export default App;
