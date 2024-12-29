import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StarRating = ({ score }) => {
  const filledStars = Math.round(score * 5); // Maximum 5 stars, rounded to nearest integer
  const emptyStars = 5 - filledStars;

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<Ionicons key={`filled-${i}`} name="star" size={20} color="#FFD700" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={20} color="#FFD700" />);
    }
    return stars;
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:10 }}>
      {renderStars()}
    </View>
  );
};

export default StarRating;
