import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const DishCard = ({ dishName, dishCategory, dishTotalCarbo, dishTotalProtein, dishTotalFat, style }) => {
  return (
    <View style={[styles.dishContainer, style]}>
      <View style={{ paddingLeft: 5, paddingBottom: 5 }}>
        <Text style={styles.dishName}>{dishName}</Text>
      </View>
      <View style={styles.dishDetails}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Categoria: </Text>
          <Text style={styles.dishDescription}>{dishCategory}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Carboidratos: </Text>
          <Text style={styles.dishDescription}>{dishTotalCarbo}g</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Proteínas: </Text>
          <Text style={styles.dishDescription}>{dishTotalProtein}g</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Gorduras: </Text>
          <Text style={styles.dishDescription}>{dishTotalFat}g</Text>
        </View>
      </View>
    </View>
  );
};

export default DishCard;

const styles = StyleSheet.create({
  dishContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dishProperties: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dishDescription: {
    fontSize: 14,
  },
  dishDetails: {
    padding: 10,
    backgroundColor: '#ccc',
  },
});
