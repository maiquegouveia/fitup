import { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../../contexts/ThemeProvider';
import { useNavigation } from '@react-navigation/native';

const DishItem = ({ style, dish, user }) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ChatScreen', { dish, user })}
      style={[styles.dishContainer, style, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={{ paddingLeft: 5, paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: '90%' }}>
          <Text style={[styles.dishName, { color: theme.fontColor.text }]}>{dish.name}</Text>
          <Text style={[styles.dishDescription, { color: theme.fontColor.text }]}>{dish.category}</Text>
        </View>
      </View>
      <View style={styles.dishDetails}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Calorias: </Text>
          <Text style={styles.dishDescription}>{dish.kcal.toFixed(2)}kcal</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Carboidratos: </Text>
          <Text style={styles.dishDescription}>{dish.carbohydrates.toFixed(2)}g</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Proteínas: </Text>
          <Text style={styles.dishDescription}>{dish.protein.toFixed(2)}g</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DishItem;

const styles = StyleSheet.create({
  dishContainer: {
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
    backgroundColor: 'skyblue',
  },
  dishControllerContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
});
