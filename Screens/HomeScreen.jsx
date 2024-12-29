import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all').then((response) => {
      setMovies(response.data);
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item.show })}>
      <View style={styles.movieItem}>
        <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
        <View style={styles.movieInfo}>
          <Text style={styles.title}>{item.show.name}</Text>
          <Text numberOfLines={2} style={styles.summary}>{item.show.summary?.replace(/<[^>]*>/g, '')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Movies..."
        onFocus={() => navigation.navigate('Search')}
      />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.show.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  searchBar: {
    height: 40,
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 15,
    margin: 10,
    color: '#fff',
  },
  movieItem: { flexDirection: 'row', margin: 10 },
  thumbnail: { width: 100, height: 150, borderRadius: 5 },
  movieInfo: { flex: 1, marginLeft: 10 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  summary: { color: '#aaa', marginTop: 5 },
});

export default HomeScreen;
