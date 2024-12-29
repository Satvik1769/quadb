import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator, // For loading spinner
} from 'react-native';
import axios from 'axios';
import SplashScreen from "./SplashScreen"

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

   const { width, height } = Dimensions.get('window');
    const isPortrait = width < height;

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then((response) => {
        setMovies(response.data);
        setIsLoading(false); // Data loaded, hide loading screen
      })
      .catch(() => setIsLoading(false)); // Handle error and stop loading
  }, []);
  // Render each carousel item
  const renderCarouselItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.carouselItem}
        onPress={() => navigation.navigate('Details', { movie: item })}
      >
        <Image
          source={
            item.show.image?.original
              ? { uri: item.show.image.original }
              : require('../assets/splash2.jpg') // Fallback image
          }
          style={[
                    styles.carouselImage,
                    {
                      aspectRatio: isPortrait ? 3 / 4 : 16 / 9, // Adjust aspect ratio based on orientation
                    },
                  ]}
                  resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  // Render each item under the Popular section
  const renderPopularItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.popularItem}
        onPress={() => navigation.navigate('Details', { movie: item })}
      >
        <Image
          source={
            item.show.image?.original
              ? { uri: item.show.image.original }
              : require('../assets/splash2.jpg') // Fallback image
          }
          style={styles.popularImage}
        />
        <Text style={styles.popularText}>{item.show.name}</Text>
      </TouchableOpacity>
    );
  };

  return isLoading ? (
    // Show a splash screen or loading indicator while images/data are loading
   <SplashScreen />
  ) : (
    <ScrollView style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderCarouselItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        pagingEnabled
      />

      <Text style={styles.header}>Popular</Text>

      <FlatList
        data={movies}
        renderItem={renderPopularItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.popularList}
      />
    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
  },
  carouselItem: {
    width,
    alignItems: 'center',
  },
  carouselImage: {
    width,
    height: height * 0.6,
    borderRadius: 10,
  },
  popularList: {
    paddingLeft: 10,
  },
  popularItem: {
    width: width * 0.45,
    marginRight: 10,
    alignItems: 'center',
  },
  popularImage: {
    width: '100%',
    height: height * 0.3,
    borderRadius: 10,
  },
  popularText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  // Styles for loading screen
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 18,
  },
});

export default HomeScreen;
