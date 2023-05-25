import { Text, View, StyleSheet } from 'react-native';
import React from 'react';

const Settings = () => {
  return (
    <View style={style.body}>
      <View>
        <Text>Settings</Text>
        <Text>Termo & Condições</Text>
        <Text>Versão 1.0</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    padding: 0,
  },
});

export default Settings;
