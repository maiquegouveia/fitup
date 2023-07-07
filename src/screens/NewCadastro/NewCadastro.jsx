import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button, NativeBaseProvider } from 'native-base';
import { useEffect, useState, useContext } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import Form from './components/Form';
import { Ionicons } from '@expo/vector-icons';
import validateEmail from '../../../utilities/validateEmail';
import generateRandomCode from '../../../utilities/generateRandomCode';
import sendCodeConfirmation from '../../../utilities/AccountRecovery/sendCodeConfirmation';
import createUser from '../../../utilities/NewCadastro/createUser';
import hasSymbolCharacters from '../../../utilities/NewCadastro/hasSymbolCharacters';
import AppContext from '../../../AppContext';
import storeAsyncStorage from '../../../utilities/Login/storeAsyncStorage';
import checkEmailRegistered from '../../../utilities/NewCadastro/checkEmailRegistered';

const NewCadastro = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const [finalStage, setFinalStage] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [randomCode, setRandomCode] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);
  const { userObject, setUserObject, setUserIsAuthenticated } = useContext(AppContext);

  const showAlert = (title, message) => Alert.alert(title, message);

  const handlerShowPassword = () => setHidePassword((prev) => !prev);

  const handlerNextFirstStage = async () => {
    const nameInput = name.trim();
    const emailInput = email.trim();

    if (nameInput.length < 6) {
      showAlert('Nome Inválido!', 'Por favor digite um nome com pelo menos 6 caracteres!');
      return;
    }
    if (hasSymbolCharacters(nameInput)) {
      showAlert('Nome Inválido!', 'Por favor digite um nome sem caracteres especiais!');
      return;
    }
    if (!validateEmail(emailInput)) {
      showAlert('Email Inválido!', 'Por favor digite um email válido!');
      return;
    } else {
      setIsLoading(true);
      const result = await checkEmailRegistered(emailInput);
      if (result?.error) {
        showAlert('Email Inválido!', 'Este email já está cadastrado!');
      } else {
        const random = generateRandomCode();
        setRandomCode(random);
        const result = await sendCodeConfirmation(emailInput, random);
        if (!result?.error) {
          setFinalStage((prev) => prev + 1);
        } else {
          showAlert('Erro no Servidor!', result.error);
        }
      }
    }
    setIsLoading(false);
  };

  const handlerNextSecondStage = () => {
    if (+code !== +randomCode) {
      showAlert('Código Inválido!', 'Por favor informe o código de confirmação válido!');
      return;
    }
    setFinalStage((prev) => prev + 1);
  };

  const handlerCreateAccount = async () => {
    const passwordInput = password.trim();
    const confPasswordInput = confPassword.trim();

    if (passwordInput.length < 6) {
      showAlert('Senha Inválida!', 'Digite uma senha de no mínimo 6 dígitos!');
      return;
    }
    if (passwordInput !== confPasswordInput) {
      showAlert('Senha Inválida!', 'As senhas não coincidem!');
      return;
    }
    const userData = {
      name,
      email,
      password,
      type: 1,
    };
    setIsLoading(true);
    const result = await createUser(userData);
    if (result?.errorCode) {
      showAlert(`ERROR ${errorCode}`, result.message);
      setIsLoading(false);
    } else {
      userObject.id = result.user_id;
      userObject.name = result.name;
      userObject.username = result.username;
      userObject.email = result.email;
      userObject.profilePicture = result.profile_picture;
      userObject.type = result.type;
      userObject.weight = null;
      userObject.height = null;
      userObject.phone = null;
      userObject.createdAt = result.createdAt;
      const clonedObject = userObject.clone();
      setUserObject(clonedObject);
      setUserIsAuthenticated(true);
      await storeAsyncStorage({ userId: clonedObject.id, isDarkMode: false });
      navigation.replace('DrawerStack', { screen: 'Home' });
    }
  };

  const handlerBackBtn = () => {
    const updatedStage = finalStage - 1;
    if (updatedStage >= 1) {
      if (updatedStage === 2) {
        setPassword('');
        setConfPassword('');
        setHidePassword(true);
      } else {
        setCode('');
      }
      setFinalStage(updatedStage);
    } else {
      navigation.goBack();
    }
  };

  const handlerBtn = () => {
    if (finalStage === 1) {
      handlerNextFirstStage();
    } else if (finalStage === 2) {
      handlerNextSecondStage();
    } else {
      handlerCreateAccount();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={handlerBackBtn}>
          <Ionicons name="arrow-back" size={28} color="#FF7900" />
        </TouchableOpacity>
      ),
    });
  }, [finalStage]);

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <NativeBaseProvider>
        <View style={[styles.container, { marginTop: headerHeight }]}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Crie seu cadastro no FITUP!</Text>
          </View>
          <Form
            finalStage={finalStage}
            setNameInput={setName}
            setEmailInput={setEmail}
            setPasswordInput={setPassword}
            setConfPasswordInput={setConfPassword}
            setCodeInput={setCode}
            nameValue={name}
            emailValue={email}
            codeValue={code}
            passwordValue={password}
            confPasswordValue={confPassword}
            hidePassword={hidePassword}
            handlerShowPassword={handlerShowPassword}
          />

          <Button isLoading={isLoading} onPress={handlerBtn} marginTop={5} width="100%" backgroundColor="green.700">
            {finalStage !== 3 ? 'Próximo' : 'Finalizar'}
          </Button>
        </View>
      </NativeBaseProvider>
    </ScrollView>
  );
};

export default NewCadastro;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    width: '100%',
  },
  title: {
    fontSize: 35,
    fontFamily: 'PoppinsBold',
    color: '#FF7900',
  },
});
