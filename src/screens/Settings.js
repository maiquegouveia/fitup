import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const Settings = () => {
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.textBtn}>Sobre</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.textBtn}>Termo & Condições</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.textBtn}>Versão 1.0</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.textBtn}>Alterar cor de fundo</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: 'rgba(250, 2, 2, 0.9)',
          marginTop: 70,
          width: 320,
          height: 40,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity>
          <Text style={[styles.textBtn, { color: 'white' }]}>Excluir conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgb(130, 238, 93)',
    marginTop: 40,
    width: 320,
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtn: {
    color: 'black',
    fontWeight: 'bold',
  },
});
export default Settings;
