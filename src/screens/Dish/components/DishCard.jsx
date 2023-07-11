import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from 'react';
import DishCardInfo from './DishCardInfo';
import { ThemeContext } from '../../../../contexts/ThemeProvider';

const DishCard = ({ style, dish, onDeleteDish, handlerOpenModalize }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const [seeMore, setSeeMore] = useState(false);

  const alertShow = () => {
    Alert.alert('', `Deseja deletar o prato (${dish.name})?`, [
      {
        text: 'Cancelar',
        onPress: () => {},
      },

      {
        text: 'Deletar',
        onPress: () => onDeleteDish(dish.id),
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
      <View style={styles.mainContainer}>
        <View style={{ width: '75%', marginVertical: 5 }}>
          <Text style={[styles.dishName, { fontFamily: theme.font.bold }]}>{dish.name}</Text>
          <Text style={[styles.dishOthers, { fontFamily: theme.font.semiBold }]}>
            Qtd. Alimentos: {dish.dishItems.length}
          </Text>
          <Text style={[styles.dishOthers, { fontFamily: theme.font.semiBold }]}>Criado em: {dish.getCreatedAt()}</Text>
          <Text style={[styles.dishOthers, { fontFamily: theme.font.semiBold }]}>
            Comentários: {dish.getCreatedAt()}
          </Text>
        </View>
        <View style={styles.dishFeatures}>
          <TouchableOpacity activeOpacity={0.5} onPress={alertShow}>
            <FontAwesome5 name="trash" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => handlerOpenModalize(dish)}>
            <Ionicons name="chatbox" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.dishDetails}>
        <DishCardInfo label="Categoria" value={dish.category.name} />
        <DishCardInfo label="Carboidratos" value={dish.carbohydrates} suffix="g" />
        <DishCardInfo label="Proteínas" value={dish.protein} suffix="g" />
        <DishCardInfo label="Calorias" value={dish.kcal} suffix="kcal" />
        {seeMore && (
          <>
            <DishCardInfo label="Sódio" value={dish.sodium} suffix="mg" />
            <DishCardInfo label="Ferro" value={dish.iron} suffix="mg" />
            <DishCardInfo label="Cálcio" value={dish.calcium} suffix="mg" />
            <DishCardInfo label="Potássio" value={dish.potassium} suffix="mg" />
            <DishCardInfo label="Magnésio" value={dish.magnesium} suffix="mg" />
            <DishCardInfo label="Zinco" value={dish.zinc} suffix="mg" />
            <DishCardInfo label="Vitamina C" value={dish.vitaminC} suffix="mg" />
            <DishCardInfo label="Gordura Saturada" value={dish.saturated} suffix="g" />
            <DishCardInfo label="Gordura Monoinsaturada" value={dish.monounsaturated} suffix="g" />
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
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dishContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  dishName: {
    fontSize: 18,
    lineHeight: 20,
  },
  dishOthers: {
    fontSize: 12,
    lineHeight: 17,
  },
  dishDetails: {
    padding: 10,
    backgroundColor: '#DFD9E2',
    borderRadius: 5,
  },
  dishControllerContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  seeMore: {
    fontSize: 16,
    lineHeight: 20,
  },
  seeMoreContainer: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  dishFeatures: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'space-between',
  },
});
