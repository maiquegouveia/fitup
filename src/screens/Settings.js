import { Text, View, StyleSheet, TouchableOpacity, } from 'react-native';
import React from 'react';
import { Ionicons, AntDesign, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';

const Settings = () => {
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.textBtn}><AntDesign name="questioncircle" size={15} color="black" />Sobre</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.textBtn}><Ionicons name="ios-document-text" size={24} color="black" />Termo & Condições</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.textBtn}><Ionicons name="color-fill" size={24} color="black" />Alterar cor de fundo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.textBtn}>Versão 1.0</Text>
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
    marginTop: 40
  },
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtn: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
});
export default Settings;
