import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import HTML from "react-native-render-html";
import StarRating from "../utils/StarRating";

const DetailsScreen = ({ route }) => {
  const { movie } = route.params || {}; // Receive the movie data passed from SearchScreen
  console.log(movie)
 if (!movie || !movie.show) {
   return (
     <View style={styles.container}>
       <Text style={styles.errorMessage}>Nothing to Show For Now</Text>
     </View>
   );
 }


  return (
    <ScrollView style={styles.container}>
      <Image
        source={movie.show.image?.original ? { uri: movie.show.image.original } : require('../assets/splash2.jpg')}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{movie.show.name}</Text>
        <StarRating score={movie.score} />
       <HTML
             source={{ html: movie.show.summary }} // Pass the HTML content here
             contentWidth={Dimensions.get('window').width} // Adjust content width to the screen
             tagsStyles={{
               p: { color: '#fff', fontSize: 16, lineHeight: 24, marginVertical: 8, marginLeft:10 }, // Styles for <p>
               b: { fontWeight: 'bold' }, // Styles for <b>
             }}
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
  movieImage: {
    width: width,
    height: height * 0.6,
    borderRadius: 10,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  movieDescription: {
    color: '#fff',
    fontSize: 16,
    margin: 10,

  },
   errorMessage: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
    },
});

export default DetailsScreen;
