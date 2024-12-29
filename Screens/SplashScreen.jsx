import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("../assets/splash1.jpg")} // Add your image URL here

        style={styles.backgroundImage}
      />
      {/* Black Tint Overlay */}
      <View style={styles.tintOverlay} />

      {/* Netflix Logo in the center */}
      <Image
        source={require('../assets/N.jpg')} // Make sure you have the Netflix logo image in the assets folder
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Needed to position the overlay and logo above the background image
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // Cover the entire screen
    width: null,
    height: null,
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject, // Cover the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black tint with some transparency
  },
  logo: {
    width: 200, // Adjust the logo size as needed
    height: 100,
  },
});

export default SplashScreen;
