import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';

const CardFeature = props => {
  return (
    <TouchableOpacity style={styles.cardFeature} activeOpacity={0.8} onPress={props.onPress}>
      <ImageBackground resizeMode="cover" source={props.cardBackground} style={styles.image}>
        <View style={styles.cardInside}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CardFeature;

const styles = StyleSheet.create({
  cardFeature: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    borderColor: '#256D1B',
    borderWidth: 3,
    borderRadius: 5,
    margin: 5,
  },
  cardInside: {
    backgroundColor: 'rgba(223, 217, 226, 0.9)',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#0B5563',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
