import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Text, Button, NativeBaseProvider } from 'native-base';
import { useEffect, useState } from 'react';
import CustomBackButtonHeader from '../../components/CustomBackButtonHeader';
import { useHeaderHeight } from '@react-navigation/elements';
import Form from './components/Form';
import { Ionicons } from '@expo/vector-icons';
import validateEmail from '../../../utilities/validateEmail';
import getUserData from '../../../utilities/getUserData';
import generateRandomCode from '../../../utilities/generateRandomCode';
import sendCodeConfirmation from '../../../utilities/AccountRecovery/sendCodeConfirmation';
import createUser from '../../../utilities/NewCadastro/createUser';

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

  const showAlert = (title, message) => Alert.alert(title, message);

  const handlerShowPassword = () => setHidePassword((prev) => !prev);

  const hasSymbolCharacters = (str) => {
    const regex = /[!@#$%^&*()+\-=[\]{};':"\\|,.<>/?]+/;
    return regex.test(str);
  };

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
      const result = await getUserData(emailInput);
      if (!result?.error) {
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
      profilePicture: '',
      type: 1,
    };
    setIsLoading(true);
    const result = await createUser(userData);
    if (result?.errorCode) {
      showAlert(`ERROR ${errorCode}`, result.message);
      setIsLoading(false);
    } else {
      showAlert('Sucesso!', 'Conta criada com sucesso!');
      navigation.replace('Login');
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
      navigation.replace('InitialScreen');
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
          <Ionicons name="arrow-back" size={28} color="#51F205" />
        </TouchableOpacity>
      ),
    });
  }, [finalStage]);

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <NativeBaseProvider>
        <View style={[styles.container, { marginTop: headerHeight }]}>
          <Text fontSize={40} fontWeight="bold" lineHeight="sm">
            Crie seu cadastro no FITUP!
          </Text>
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
            Próximo
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
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
});
