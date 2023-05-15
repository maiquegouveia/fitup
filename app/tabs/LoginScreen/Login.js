import { View, Text, SafeAreaView, ImageBackground, Alert } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import background from '../../../assets/home-img-2.png';
import { leftArrow } from '../../../constants/icons';
import { useHeaderHeight } from '@react-navigation/elements';
import Logo from '../../components/UI/Logo';
import { TextInput, Button, Provider } from 'react-native-paper';
import isValidEmail from '../../../utilities/isValidEmail';
import getUserData from '../../../utilities/getUserData';
import styles from './Login.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from '../../components/UI/Dialog';

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const headerHeight = useHeaderHeight();

  const [visible, setVisible] = useState(false);
  const [dialog, setDialog] = useState({
    title: '',
    content: '',
  });
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

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
      const data = await getUserData(email.value);
      const userData = data?.data;
      setIsLoading(false);

      if (userData && userData[0].senha === senha.value) {
        const success = await storeData(JSON.stringify(userData[0]));
        if (success) router.replace({ pathname: '/Home', params: userData[0] });
      } else {
        Alert.alert('Email ou senha inválidos!', 'Verifique os campos de email e senha e tente novamente.');
      }
    } else {
      if (email.isValid === false && senha.isValid === false) {
        setDialog({
          title: 'Email e senha inválidos!',
          content: 'Digite um email válido e uma senha maior que 8 digitos.',
        });
      } else if (!email.isValid) {
        setDialog({
          title: 'Email inválido!',
          content: 'Digite um email válido para fazer login.',
        });
      } else {
        setDialog({
          title: 'Senha inválida!',
          content: 'A senha deve ser maior que 8 digitos.',
        });
      }
      showDialog();
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerBackImageSource: leftArrow,
          headerTintColor: 'rgba(81, 242, 5, 1)',
        }}
      />
      <ImageBackground source={background} resizeMode="cover" style={styles.background}>
        <Provider>
          <Dialog visible={visible} title={dialog.title} content={dialog.content} hideDialog={hideDialog} />
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
                {isLoading ? '' : 'Entrar'}
              </Button>
            </View>
          </View>
        </Provider>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;
