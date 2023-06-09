import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Input } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

const FoodListItem = ({
  index,
  style,
  foodName,
  amount,
  foodId,
  onRemove,
  foodAddedList,
  setFoodAddedList,
  foodKcal,
  foodCarbo,
  foodProtein,
}) => {
  const [inputValue, setInputValue] = useState(amount);

  const validateInput = (text) => {
    const numberPattern = /^\d*\d*$/;

    if (numberPattern.test(text)) {
      if (text.length <= 3) {
        const updatedFoodAddedList = [...foodAddedList];
        updatedFoodAddedList[index].amount = +text || 0;
        setFoodAddedList(updatedFoodAddedList);
        setInputValue(text);
      }
    }
  };

  return (
    <View style={[styles.mainContainer, style]}>
      <View style={{ width: '80%' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{foodName}</Text>
        <View style={{ backgroundColor: '#ccc', padding: 10, marginVertical: 5 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold' }}>Calorias: </Text>
            <Text style={{}}>{((foodKcal * inputValue) / 100).toFixed(2)}kcal</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold' }}>Carboidratos: </Text>
            <Text style={{}}>{((foodCarbo * inputValue) / 100).toFixed(2)}g</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold' }}>Proteínas: </Text>
            <Text style={{}}>{((foodProtein * inputValue) / 100).toFixed(2)}g</Text>
          </View>
        </View>
        <Input
          onChangeText={validateInput}
          keyboardType="decimal-pad"
          borderWidth={2}
          borderColor="black"
          focusOutlineColor="black"
          value={`${inputValue}`}
          width="33%"
          height={10}
          variant="outline"
          rightElement={
            <View style={{ padding: 5 }}>
              <Text style={{ marginBottom: 3 }}>g</Text>
            </View>
          }
        />
      </View>

      <TouchableOpacity activeOpacity={0.7} style={{ padding: 10 }} onPress={() => onRemove(foodId)}>
        <FontAwesome name="window-close" size={26} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default FoodListItem;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
