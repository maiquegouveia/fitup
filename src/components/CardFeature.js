import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

const CardFeature = props => {
  return (
    <View style={styles.cardFeature}>
      <ImageBackground resizeMode="cover" source={props.cardBackground} style={styles.image}>
        <View style={styles.cardInside}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CardFeature;

const styles = StyleSheet.create({
  cardFeature: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    backgroundColor: 'orange',
    borderRadius: 10,
    margin: 5,
    padding: 5,
  },
  cardInside: {
    backgroundColor: 'rgba(204,204,204, 0.8)',
    padding: 5,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'black',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
