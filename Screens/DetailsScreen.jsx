import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.image?.original }} style={styles.image} />
      <Text style={styles.title}>{movie.name}</Text>
      <Text style={styles.summary}>{movie.summary?.replace(/<[^>]*>/g, '')}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  image: { width: '100%', height: 300 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', margin: 10 },
  summary: { color: '#aaa', margin: 10 },
});

export default DetailsScreen;
