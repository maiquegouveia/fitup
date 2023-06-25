import { View, Text, SafeAreaView, ImageBackground, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import background from '../../../assets/home-img-2.png';
import { useHeaderHeight } from '@react-navigation/elements';
import Logo from '../../components/Logo';
import { TextInput, Button, Provider } from 'react-native-paper';
import validateEmail from '../../../utilities/validateEmail';
import styles from './Login.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from '../../components/Dialog';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../../../AppContext';
import CustomBackButtonHeader from '../../components/CustomBackButtonHeader';
import User from '../../../models/User';
import authenticateUser from '../../../utilities/Login/authenticateUser';

const Login = () => {
  const navigation = useNavigation();
  const { setParams, userIsAuthenticated, setUserIsAuthenticated, userObject, setUserObject } = useContext(AppContext);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: 'papayawhip' },
      headerTitle: '',
      headerLeft: () => <CustomBackButtonHeader navigation={navigation} screenName="InitialScreen" />,
    });
  }, []);

  useEffect(() => {
    if (userIsAuthenticated) navigation.replace('DrawerStack', { screen: 'Home' });
  }, []);

  const navigateToDrawerScreen = async (userCredentials) => {
    console.log(userCredentials);
    const updatedUserObject = new User(
      userCredentials.usuario_id,
      userCredentials.nome,
      userCredentials.email,
      userCredentials.senha,
      userCredentials.altura,
      userCredentials.peso,
      userCredentials.telefone,
      userCredentials.username,
      userCredentials.tipo_usuario,
      userCredentials.foto_perfil
    );
    setUserObject(updatedUserObject);
    setParams(userCredentials);
    setUserIsAuthenticated(true);
    await storeData(userCredentials.usuario_id);
    navigation.replace('DrawerStack', { screen: 'Home' });
  };

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

  const [email, setEmail] = useState('');

  const [senha, setSenha] = useState('');

  const onChangeEmail = (text) => setEmail(text);
  const onChangeSenha = (text) => setSenha(text);

  const storeData = async (userId) => {
    let success;
    try {
      await AsyncStorage.setItem('fitUpUserId', JSON.stringify(userId));
      success = true;
    } catch (error) {
      success = false;
      Alert.alert('ERROR!', 'Erro no login!');
    }
    return success;
  };

  const showAlert = (title, message) => Alert.alert(title, message);

  const onEntrarHandler = async () => {
    const emailInput = email;
    const senhaInput = senha;

    if (!validateEmail(emailInput)) {
      showAlert('Email Inválido!', 'Por favor digite um email válido!');
      return;
    }

    if (senhaInput.length === 0 || senhaInput.includes(' ')) {
      showAlert('Senha Inválida!', 'Por favor digite uma senha válida!');
      return;
    }

    if (senhaInput.length < 6) {
      showAlert('Senha Inválida!', 'Digite uma senha de no mínimo 6 dígitos!');
      return;
    }

    const body = {
      email: emailInput,
      password: senhaInput,
    };
    setIsLoading(true);
    const result = await authenticateUser(body);
    if (result?.errorCode) {
      showAlert('Erro no Login', result.message);
      setIsLoading(false);
      return;
    }
    navigateToDrawerScreen(result);
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <ImageBackground source={background} resizeMode="cover" style={styles.background}>
        <Provider>
          <Dialog visible={visible} title={dialog.title} content={dialog.content} hideDialog={hideDialog} />
          <Logo style={{ marginTop: headerHeight + 20 }} />
          <View style={styles.formContainer}>
            <View style={styles.form}>
              <TextInput
                autoCapitalize="none"
                underlineStyle={{ width: 0 }}
                mode="flat"
                label="Email"
                style={styles.input}
                value={email}
                onChangeText={onChangeEmail}
              />
              <TextInput
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
              <TouchableOpacity style={styles.esqueceuContainer} onPress={() => navigation.replace('AccountRecovery')}>
                <Text style={styles.esqueceuText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
              <Button loading={isLoading} style={styles.btn} labelStyle={styles.btnText} onPress={onEntrarHandler}>
                {isLoading ? '' : 'Entrar'}
              </Button>
            </View>
          </View>
        </Provider>
      </ImageBackground>
    </ScrollView>
  );
};

export default Login;
