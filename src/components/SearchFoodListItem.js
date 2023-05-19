import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SearchFoodListItem = props => {
  return (
    <View style={{ marginVertical: 5, backgroundColor: 'white', width: '100%', padding: 10, borderRadius: 10 }}>
      <Text style={{ color: 'black' }}>{props.foodName}</Text>
    </View>
  );
};

export default SearchFoodListItem;

const styles = StyleSheet.create({});
