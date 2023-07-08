import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DishCardInfo from './DishCardInfo';

const Container = ({ children }) => {
  return <View style={styles.mainContainer}>{children}</View>;
};

const DishCreateCard = ({ theme, addedFoods }) => {
  const [seeMore, setSeeMore] = useState(false);
  const handlerSeeMore = () => setSeeMore((prev) => !prev);

  const getTotal = (information) => {
    try {
      const total = addedFoods.reduce((acc, food) => acc + (food[information] * food.amount) / 100, 0);
      return total.toFixed(1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <DishCardInfo label="Carboidratos" value={getTotal('carbohydrates')} suffix="g" />
      <DishCardInfo label="Proteínas" value={getTotal('protein')} suffix="g" />
      <DishCardInfo label="Calorias" value={getTotal('kcal')} suffix="kcal" />
      <DishCardInfo label="Sódio" value={getTotal('sodium')} suffix="mg" />

      {seeMore && (
        <>
          <DishCardInfo label="Ferro" value={getTotal('iron')} suffix="mg" />
          <DishCardInfo label="Cálcio" value={getTotal('calcium')} suffix="mg" />
          <DishCardInfo label="Potássio" value={getTotal('potassium')} suffix="mg" />
          <DishCardInfo label="Magnésio" value={getTotal('magnesium')} suffix="mg" />
          <DishCardInfo label="Zinco" value={getTotal('zinc')} suffix="mg" />
          <DishCardInfo label="Vitamina C" value={getTotal('vitaminC')} suffix="mg" />
          <DishCardInfo label="Gordura Saturada" value={getTotal('saturated')} suffix="g" />
          <DishCardInfo label="Gordura Monosaturada" value={getTotal('monounsaturated')} suffix="g" />
          <DishCardInfo label="Gordura Poli-insaturada" value={getTotal('polyunsaturated')} suffix="g" />
        </>
      )}
      <TouchableOpacity style={styles.seeMoreContainer} activeOpacity={1} onPress={handlerSeeMore}>
        <Text style={[styles.seeMore, { fontFamily: theme.font.semiBold }]}>
          {!seeMore ? 'Ver Mais...' : 'Ver Menos...'}
        </Text>
      </TouchableOpacity>
    </Container>
  );
};

export default DishCreateCard;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: '#ccc',
    marginTop: 10,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
});
