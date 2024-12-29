import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      axios
        .get(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then((response) => {
          setMovies(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setMovies([]);
    }
  }, [query]);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('Details', { movie: item })}
    >
      <Image
        source={
          item.show.image?.original
            ? { uri: item.show.image.original } // Use image from URI if available
            : require('../assets/splash2.jpg') // Use fallback image if URI is not available
        }
        style={styles.movieImage}
      />
      <Text style={styles.movieText}>{item.show.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for movies..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={(text) => setQuery(text)}
        autoCapitalize="words"
      />

      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
  },
  searchInput: {
    height: 50,
    backgroundColor: '#333',
    color: '#fff',
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 10,
    marginHorizontal: 10,
    fontSize: 16,
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  movieItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  movieImage: {
    width: width * 0.45,
    height: height * 0.3,
    borderRadius: 10,
  },
  movieText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default SearchScreen;
