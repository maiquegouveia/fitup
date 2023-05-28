import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import { Ionicons, AntDesign, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';

const Settings = () => {
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <TouchableOpacity style={styles.container}>
          <AntDesign name="questioncircle" size={15} color="black" style={styles.icon} />
          <Text style={styles.textBtn}>Sobre</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.container}>
          <Ionicons name="ios-document-text" size={15} color="black" style={styles.icon} />
          <Text style={styles.textBtn}>Termo & Condições</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.container}>
          <Ionicons name="color-fill" size={15} color="black" style={styles.icon} />
          <Text style={styles.textBtn}>Alterar cor de fundo</Text>
        </TouchableOpacity>
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
            <Text style={[styles.textBtn, { color: 'white', marginLeft: 0 }]}>Excluir conta</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text style={{ alignItems: 'center', marginTop: 12 }}>Versão 1.0</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textBtn: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  icon: {
    marginLeft: 18,
  },
});
export default Settings;
