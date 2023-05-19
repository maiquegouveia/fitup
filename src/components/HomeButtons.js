import { View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import styles from '../styles/HomeButtons.style';
import { useNavigation } from '@react-navigation/native';

const HomeButtons = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.btnsContainer}>
      <Button style={styles.btn} labelStyle={styles.btnText} onPress={() => navigation.replace('Login')}>
        Entrar
      </Button>

      <Button style={styles.btn} labelStyle={styles.btnText} onPress={() => navigation.replace('Cadastro')}>
        Cadastrar-se
      </Button>
    </View>
  );
};

export default HomeButtons;
