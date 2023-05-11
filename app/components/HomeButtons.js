import { View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import styles from './HomeButtons.style';

const HomeButtons = () => {
  const router = useRouter();
  return (
    <View style={styles.btnsContainer}>
      <Button style={styles.btn} labelStyle={styles.btnText} onPress={() => router.push('/tabs/LoginScreen/Login')}>
        Entrar
      </Button>

      <Button
        style={styles.btn}
        labelStyle={styles.btnText}
        onPress={() => router.push('/tabs/CadastroScreen/Cadastro')}
      >
        Cadastrar-se
      </Button>
    </View>
  );
};

export default HomeButtons;
