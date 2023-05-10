import { View, Text, SafeAreaView, ImageBackground, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import background from '../../assets/home-img-2.png';
import { leftArrow } from '../../constants/icons';
import { useHeaderHeight } from '@react-navigation/elements';
import Logo from '../components/UI/Logo';
import { TextInput, Button } from 'react-native-paper';
import isValidEmail from '../../utilities/isValidEmail';
import getDataFirebase from '../../utilities/getDataFirebase';
import styles from './Login.style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const headerHeight = useHeaderHeight();

  const [email, setEmail] = useState({
    value: '',
    isValid: false,
  });

  const [senha, setSenha] = useState({
    value: '',
    isValid: false,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const onChangeEmail = function (text) {
    setEmail(prev => {
      return {
        ...prev,
        value: text,
      };
    });
  };

  const onChangeSenha = function (text) {
    setSenha(prev => {
      return {
        ...prev,
        value: text,
      };
    });
  };

  const storeData = async data => {
    let success;
    try {
      await AsyncStorage.setItem('userData', data);
      success = true;
    } catch (error) {
      success = false;
      Alert.alert('ERROR!', 'Erro no login!');
    }
    return success;
  };

  useEffect(() => {
    /// Este useEffect será executado toda vez que "email.value" sofrer alteração
    /// Define se "email.value" é uma valor válido

    if (isValidEmail(email.value)) {
      setEmail(prev => {
        return {
          ...prev,
          isValid: true,
        };
      });
    } else {
      setEmail(prev => {
        return {
          ...prev,
          isValid: false,
        };
      });
    }
  }, [email.value]);

  useEffect(() => {
    /// Este useEffect será executado toda vez que "senha.value" sofrer alteração
    /// Define se "senha.value" é uma valor válido
    if (senha.value.length > 8) {
      setSenha(prev => {
        return {
          ...prev,
          isValid: true,
        };
      });
    } else {
      setSenha(prev => {
        return {
          ...prev,
          isValid: false,
        };
      });
    }
  }, [senha.value]);

  useEffect(() => {
    /// Este useEffect será executado toda vez que "email.isValid" ou "senha.isValid" sofrer alteração
    /// Define se o formulário é válido
    setFormIsValid(email.isValid && senha.isValid);
  }, [email.isValid, senha.isValid]);

  const onEntrarHandler = async () => {
    if (formIsValid) {
      setIsLoading(true);
      const data = await getDataFirebase(email.value);
      setIsLoading(false);
      let dataUser = Object.values(data);
      dataUser = dataUser[0];
      if (dataUser && dataUser.senha === senha.value) {
        const success = await storeData(JSON.stringify(dataUser));
        if (success) router.replace({ pathname: '/Home', params: dataUser });
      } else {
        Alert.alert('Email ou senha inválidos!', 'Verifique os campos de email e senha e tente novamente.');
      }
    } else {
      let errorTitle;
      let errorMsg;
      if (email.isValid === false && senha.isValid === false) {
        errorTitle = 'Email e senha inválidos!';
        errorMsg = 'Digite um email válido e uma senha maior que 8 digitos.';
      } else if (!email.isValid) {
        errorTitle = 'Email inválido!';
        errorMsg = 'Digite um email válido para fazer login.';
      } else {
        errorTitle = 'Senha inválida!';
        errorMsg = 'A senha deve ser maior que 8 digitos.';
      }
      Alert.alert(errorTitle, errorMsg);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerBackImageSource: leftArrow,
          headerTintColor: 'rgba(81, 242, 5, 1)',
          headerTransparent: true,
        }}
      />
      <ImageBackground source={background} resizeMode="cover" style={styles.background}>
        <Logo style={{ marginTop: headerHeight }} />
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <TextInput
              underlineStyle={{ width: 0 }}
              mode="flat"
              label="Email"
              style={styles.input}
              value={email.value}
              onChangeText={onChangeEmail}
            />
            <TextInput
              underlineStyle={{ width: 0 }}
              mode="flat"
              label="Senha"
              style={[styles.input, { marginTop: 10 }]}
              secureTextEntry={hidePassword}
              value={senha.value}
              onChangeText={onChangeSenha}
              right={
                <TextInput.Icon
                  onPress={() => {
                    setHidePassword(prev => !prev);
                  }}
                  icon={hidePassword ? 'eye' : 'eye-off'}
                />
              }
            />
            <View style={styles.esqueceuContainer}>
              <Text style={styles.esqueceuText}>Esqueceu a senha?</Text>
            </View>
            <Button loading={isLoading} style={styles.btn} labelStyle={styles.btnText} onPress={onEntrarHandler}>
              Entrar
            </Button>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;
