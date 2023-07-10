import { StyleSheet, View, SafeAreaView, Alert, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button, NativeBaseProvider, Text } from 'native-base';
import { useContext, useState, useRef } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import validateEmail from '../../../utilities/validateEmail';
import getUserData from '../../../utilities/getUserData';
import sendRecoveryCode from '../../../utilities/AccountRecovery/sendRecoveryCode';
import generateRandomCode from '../../../utilities/generateRandomCode';
import { ThemeContext } from '../../../contexts/ThemeProvider';

const AccountRecovery = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const [isLoading, setIsLoading] = useState(false);
  const [emailInputDisabled, setEmailInputDisabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [codeInputValue, setCodeInputValue] = useState('');
  const [randomCode, setRandomCode] = useState('');
  const [userData, setUserData] = useState({});
  const emailRef = useRef(null);
  const codeRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  const handlerPressOutside = () => {
    emailRef.current?.blur();
    codeRef.current?.blur();
  };

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
      if (result?.error) {
        showAlert('Email Inválido', 'Este email não pertence a nenhuma conta!');
      } else {
        const randomNumber = generateRandomCode();
        const result = await sendRecoveryCode(inputValue, randomNumber);
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
      navigation.replace('ChangePassword', { params: inputValue });
    }
  };

  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress={handlerPressOutside}>
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
          <View style={[styles.mainContainer, { marginTop: headerHeight }]}>
            <View style={styles.formContainer}>
              <Text color="#FF7900" fontSize={36} fontFamily={theme.font.bold} lineHeight="sm" marginBottom="5">
                Recuperação de Conta
              </Text>
              <Text fontSize={16} fontFamily={theme.font.semiBold}>
                Digite o seu email
              </Text>
              <TextInput
                ref={emailRef}
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
                  <Text fontSize={16} fontFamily={theme.font.semiBold}>
                    Digite o código de confirmação
                  </Text>
                  <TextInput
                    ref={codeRef}
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
                <Button onPress={handlerNextBtn} marginTop={5} backgroundColor="#FF7900" isLoading={isLoading}>
                  <Text color="white" fontFamily={theme.font.semiBold}>
                    Próximo
                  </Text>
                </Button>
              )}
              {emailInputDisabled && (
                <Button onPress={handlerConfirmBtn} marginTop={5} backgroundColor="#FF7900" isLoading={isLoading}>
                  <Text color="white" fontFamily={theme.font.semiBold}>
                    Próximo
                  </Text>
                </Button>
              )}
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
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
