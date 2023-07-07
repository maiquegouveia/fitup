import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from 'react';
import DishCardInfo from './DishCardInfo';
import { ThemeContext } from '../../../../contexts/ThemeProvider';

const DishCard = ({ style, dish, onDeleteDish }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const [seeMore, setSeeMore] = useState(false);

  const alertShow = () => {
    Alert.alert('', `Deseja deletar o prato (${dish.nome})?`, [
      {
        text: 'Cancelar',
        onPress: () => {},
      },

      {
        text: 'Deletar',
        onPress: () => onDeleteDish(dish.prato_id),
      },
    ]);
  };

  const handlerSeeMore = () => setSeeMore((prev) => !prev);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('EditDish', {
          dish,
        })
      }
      activeOpacity={1}
      style={[styles.dishContainer, style]}
    >
      <View style={{ paddingLeft: 5, paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: '90%' }}>
          <Text style={[styles.dishName, { fontFamily: theme.font.bold }]}>{dish.name}</Text>
          <Text style={{ fontFamily: theme.font.semiBold, fontSize: 12 }}>Qtd. Alimentos: {dish.dishItems.length}</Text>
        </View>
        <TouchableOpacity onPress={alertShow} activeOpacity={0.7}>
          <FontAwesome5 name="trash" size={24} color="#FF7900" />
        </TouchableOpacity>
      </View>
      <View style={styles.dishDetails}>
        <DishCardInfo label="Categoria" value={dish.category.name} />
        <DishCardInfo label="Carboidratos" value={dish.carbohydrates} suffix="g" />
        <DishCardInfo label="Proteínas" value={dish.protein} suffix="g" />
        <DishCardInfo label="Calorias" value={dish.kcal} suffix="kcal" />
        {seeMore && (
          <>
            <DishCardInfo label="Sódio" value={dish.sodium} suffix="g" />
            <DishCardInfo label="Ferro" value={dish.iron} suffix="g" />
            <DishCardInfo label="Cálcio" value={dish.calcium} suffix="g" />
            <DishCardInfo label="Potássio" value={dish.potassium} suffix="g" />
            <DishCardInfo label="Magnésio" value={dish.magnesium} suffix="g" />
            <DishCardInfo label="Zinco" value={dish.zinc} suffix="g" />
            <DishCardInfo label="Vitamina C" value={dish.vitaminC} suffix="g" />
            <DishCardInfo label="Gordura Saturada" value={dish.saturated} suffix="g" />
            <DishCardInfo label="Gordura Monosaturada" value={dish.monounsaturated} suffix="g" />
            <DishCardInfo label="Gordura Poli-insaturada" value={dish.polyunsaturated} suffix="g" />
          </>
        )}
        <TouchableOpacity style={styles.seeMoreContainer} activeOpacity={1} onPress={handlerSeeMore}>
          <Text style={[styles.seeMore, { fontFamily: theme.font.semiBold }]}>
            {!seeMore ? 'Ver Mais...' : 'Ver Menos...'}
          </Text>
        </TouchableOpacity>
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
  },
  dishDetails: {
    padding: 10,
    backgroundColor: '#DFD9E2',
  },
  dishControllerContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  seeMore: {
    fontSize: 16,
  },
  seeMoreContainer: {
    flex: 1,
    alignSelf: 'flex-start',
  },
});
