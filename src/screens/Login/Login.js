import {
  View,
  Text,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useState, useContext, useRef } from 'react';
import background from '../../../assets/home-img-2.png';
import { useHeaderHeight } from '@react-navigation/elements';
import { TextInput, Button } from 'react-native-paper';
import validateEmail from '../../../utilities/validateEmail';
import styles from './Login.style';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../../../AppContext';
import authenticateUser from '../../../utilities/Login/authenticateUser';
import storeAsyncStorage from '../../../utilities/Login/storeAsyncStorage';

const Login = () => {
  const navigation = useNavigation();
  const { setUserIsAuthenticated, userObject, setUserObject } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const headerHeight = useHeaderHeight();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onChangeEmail = (text) => setEmail(text);
  const onChangeSenha = (text) => setSenha(text);

  const showAlert = (title, message) => Alert.alert(title, message);

  const navigateToDrawerScreen = async (userData) => {
    userObject.id = userData.user_id;
    userObject.name = userData.name;
    userObject.email = userData.email;
    userObject.password = userData.password;
    userObject.height = userData.height;
    userObject.weight = userData.weight;
    userObject.phone = userData.phone;
    userObject.username = userData.username;
    userObject.type = userData.type;
    userObject.createdAt = userData.createdAt;
    userObject.profilePicture = userData.profile_picture;
    const updatedUserObject = userObject.clone();
    setUserObject(updatedUserObject);
    setUserIsAuthenticated(true);
    await storeAsyncStorage({ userId: updatedUserObject.id, isDarkMode: false });
    navigation.replace('DrawerStack', { screen: 'Home' });
  };

  const onEntrarHandler = async () => {
    handlerPressOutside();
    const emailInput = email;
    const passwordInput = senha;

    if (!validateEmail(emailInput)) {
      showAlert('Email Inválido!', 'Por favor digite um email válido!');
      return;
    }

    if (passwordInput.length === 0 || passwordInput.includes(' ')) {
      showAlert('Senha Inválida!', 'Por favor digite uma senha válida!');
      return;
    }

    if (passwordInput.length < 6) {
      showAlert('Senha Inválida!', 'Digite uma senha de no mínimo 6 dígitos!');
      return;
    }

    const body = {
      email: emailInput,
      password: passwordInput,
    };
    setIsLoading(true);
    const result = await authenticateUser(body);
    if (result?.errorCode) {
      showAlert('Erro no Login', result.message);
      setIsLoading(false);
      return;
    }
    navigateToDrawerScreen(result.result);
  };

  const handlerPressOutside = () => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.blur();
      passwordRef.current.blur();
    }
  };

  return (
    <ImageBackground source={background} resizeMode="cover" style={styles.background}>
      <TouchableWithoutFeedback onPress={handlerPressOutside}>
        <View style={[styles.container, { marginTop: headerHeight }]}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Acesse já a sua conta do FitUP!</Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              ref={emailRef}
              autoCapitalize="none"
              underlineStyle={{ width: 0 }}
              mode="flat"
              label="Email"
              style={styles.input}
              value={email}
              onChangeText={onChangeEmail}
            />
            <TextInput
              ref={passwordRef}
              autoCapitalize="none"
              underlineStyle={{ width: 0 }}
              mode="flat"
              label="Senha"
              style={[styles.input, { marginTop: 10 }]}
              secureTextEntry={hidePassword}
              value={senha}
              onChangeText={onChangeSenha}
              right={
                <TextInput.Icon
                  onPress={() => {
                    setHidePassword((prev) => !prev);
                  }}
                  icon={hidePassword ? 'eye' : 'eye-off'}
                />
              }
            />
            <Button loading={isLoading} style={styles.btn} labelStyle={styles.btnText} onPress={onEntrarHandler}>
              {isLoading ? '' : 'Entrar'}
            </Button>
            <TouchableOpacity style={styles.esqueceuContainer} onPress={() => navigation.navigate('AccountRecovery')}>
              <Text style={styles.esqueceuText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default Login;
