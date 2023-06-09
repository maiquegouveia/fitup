import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DishCard = ({ dishName, dishCategory, style, dishCarbo, dishProtein, dishKcal, dishId, onDeleteDish }) => {
  const navigation = useNavigation();
  const alertShow = () => {
    Alert.alert('', `Deseja deletar o prato (${dishName})?`, [
      {
        text: 'Cancelar',
        onPress: () => {},
      },

      {
        text: 'Deletar',
        onPress: () => onDeleteDish(dishId),
      },
    ]);
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('EditDish', {
          dishId: dishId,
          dishName: dishName,
          dishCategory: dishCategory,
        })
      }
      activeOpacity={1}
      style={[styles.dishContainer, style]}
    >
      <View style={{ paddingLeft: 5, paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: '90%' }}>
          <Text style={styles.dishName}>{dishName}</Text>
        </View>
        <TouchableOpacity onPress={alertShow} activeOpacity={0.7}>
          <FontAwesome5 name="trash" size={20} color="#228B22" />
        </TouchableOpacity>
      </View>
      <View style={styles.dishDetails}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Categoria: </Text>
          <Text style={styles.dishDescription}>{dishCategory}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Calorias: </Text>
          <Text style={styles.dishDescription}>{dishKcal.toFixed(2)}kcal</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Carboidratos: </Text>
          <Text style={styles.dishDescription}>{dishCarbo.toFixed(2)}g</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.dishProperties}>Proteínas: </Text>
          <Text style={styles.dishDescription}>{dishProtein.toFixed(2)}g</Text>
        </View>
      </View>
    </TouchableOpacity>
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
    backgroundColor: '#DFD9E2',
  },
  dishControllerContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
});
