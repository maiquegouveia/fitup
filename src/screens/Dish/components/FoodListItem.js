import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Input } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

const FoodListItem = ({ style, foodName, amount, foodId, onRemove }) => {
  return (
    <View style={[styles.mainContainer, style]}>
      <View style={{ width: '80%' }}>
        <Text>{foodName}</Text>
        <Input
          borderWidth={2}
          borderColor="black"
          focusOutlineColor="black"
          value={`${amount}`}
          width="30%"
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
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
