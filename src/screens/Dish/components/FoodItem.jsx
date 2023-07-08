import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, InputGroup, InputRightAddon } from 'native-base';
import FoodInfoCard from './FoodInfoCard';
import { FontAwesome } from '@expo/vector-icons';

const FoodItem = ({ food, theme, style, handlerRemove, addedFoods, setAddedFoods }) => {
  const [inputValue, setInputValue] = useState(food.amount);

  const validateInput = (text) => {
    const numberPattern = /^(?!0)\d*$/;
    if (numberPattern.test(text)) {
      if (text.length <= 3) {
        const updatedAddedFoods = addedFoods.slice();
        updatedAddedFoods[updatedAddedFoods.findIndex((curr) => curr.id === food.id)].amount = +text || 0;
        setAddedFoods(updatedAddedFoods);
        setInputValue(text);
      }
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.createDish.foodCard.backgroundColor }, style]}>
      <View style={styles.wrapper}>
        <View style={{ width: '80%' }}>
          <Text
            style={[styles.foodName, { fontFamily: theme.font.semiBold, color: theme.createDish.foodCard.fontColor }]}
          >
            {food.name}
          </Text>
          <Text
            style={[
              styles.foodCategory,
              { fontFamily: theme.font.regular, color: theme.createDish.foodCard.fontColor },
            ]}
          >
            {food.category}
          </Text>
        </View>
        <View style={{ width: '15%', alignItems: 'center' }}>
          <FontAwesome onPress={() => handlerRemove(food.id)} name="window-close" size={26} color="red" />
        </View>
      </View>
      <View style={styles.wrapper}>
        <FoodInfoCard theme={theme} food={food} amount={inputValue} />
      </View>
      <InputGroup
        marginTop={15}
        w={{
          base: '70%',
          md: '285',
        }}
      >
        <Input
          style={{ backgroundColor: 'white' }}
          onChangeText={validateInput}
          keyboardType="decimal-pad"
          value={`${inputValue}`}
          w={50}
        />
        <InputRightAddon children={'g'} />
      </InputGroup>
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  container: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 10,
  },
  foodName: {
    fontSize: 18,
  },
  foodCategory: {
    fontSize: 14,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
