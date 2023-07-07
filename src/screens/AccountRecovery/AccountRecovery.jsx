import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button, NativeBaseProvider, Text } from 'native-base';
import { useState } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import validateEmail from '../../../utilities/validateEmail';
import getUserData from '../../../utilities/getUserData';
import sendCodeConfirmation from '../../../utilities/AccountRecovery/sendCodeConfirmation';
import generateRandomCode from '../../../utilities/generateRandomCode';

const AccountRecovery = ({ navigation }) => {
  const headerHeight = useHeaderHeight();

  const [isLoading, setIsLoading] = useState(false);
  const [emailInputDisabled, setEmailInputDisabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [codeInputValue, setCodeInputValue] = useState('');
  const [randomCode, setRandomCode] = useState('');
  const [userData, setUserData] = useState({});

  const handlerChangeText = (text) => setInputValue(text);

  const handlerChangeCodeText = (text) => {
    const char = text[text.length - 1];
    if (char !== '.' && char !== ',' && char !== ' ' && char !== '-') {
      setCodeInputValue(text);
    }
  };

  const showAlert = (title, message) => Alert.alert(title, message);

  const handlerNextBtn = async () => {
    const isValid = validateEmail(inputValue);
    if (isValid) {
      setIsLoading(true);
      const result = await getUserData(inputValue);
      setUserData(result);
      if (result?.error) {
        showAlert('Email Inválido', 'Este email não pertence a nenhuma conta!');
      } else {
        const randomNumber = generateRandomCode();
        const result = await sendCodeConfirmation(inputValue, randomNumber);
        if (!result?.error) {
          setRandomCode(randomNumber);
          setEmailInputDisabled(true);
        } else {
          showAlert('Erro no Servidor', result.error);
        }
      }
      setIsLoading(false);
    } else {
      showAlert('Email Inválido', 'Para prosseguir na recuperação da conta, digite um email válido!');
    }
  };

  const handlerConfirmBtn = () => {
    if (+codeInputValue !== +randomCode) {
      showAlert('Código Inválido', 'Para recuperar a sua conta digite o código válido de recuperação!');
    } else {
      navigation.replace('ChangePassword', { params: userData });
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={[styles.mainContainer, { marginTop: headerHeight }]}>
          <View style={styles.formContainer}>
            <Text color="#FF7900" fontSize={36} fontWeight="bold" lineHeight="sm" marginBottom="5">
              Recuperação de Conta
            </Text>
            <Text fontSize={16} fontWeight="semibold">
              Digite o seu email
            </Text>
            <TextInput
              placeholder="Email"
              disabled={emailInputDisabled}
              left={<TextInput.Icon icon="account" size={24} />}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={handlerChangeText}
              value={inputValue}
              style={{ width: 300 }}
              mode="outlined"
            />
            {emailInputDisabled && (
              <View style={{ marginTop: 15 }}>
                <Text fontSize={16} fontWeight="semibold">
                  Digite o código de confirmação
                </Text>
                <TextInput
                  left={<TextInput.Icon icon="key" size={24} />}
                  keyboardType="numeric"
                  onChangeText={handlerChangeCodeText}
                  value={codeInputValue}
                  style={{ width: 300 }}
                  mode="outlined"
                />
              </View>
            )}
            {!emailInputDisabled && (
              <Button onPress={handlerNextBtn} marginTop={10} backgroundColor="green.700" isLoading={isLoading}>
                Próximo
              </Button>
            )}
            {emailInputDisabled && (
              <Button onPress={handlerConfirmBtn} marginTop={10} backgroundColor="green.700" isLoading={isLoading}>
                Recuperar Conta
              </Button>
            )}
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default AccountRecovery;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  formContainer: {
    padding: 30,
    width: '100%',
  },
  btn: {
    backgroundColor: 'green',
    borderRadius: 5,
    marginTop: 30,
  },
});
