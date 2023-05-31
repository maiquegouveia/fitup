import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Input } from 'native-base';

const CreateDishPopoverBody = () => {
  return (
    <View style={{ padding: 10 }}>
      <Text>Nome do Prato</Text>
      <Input variant="outline" />
    </View>
  );
};

export default CreateDishPopoverBody;

const styles = StyleSheet.create({});
