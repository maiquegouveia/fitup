import { StyleSheet, View, SafeAreaView, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';
import { Text, NativeBaseProvider, Button } from 'native-base';
import { TextInput } from 'react-native-paper';
import { useContext, useEffect, useRef, useState } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import updatePassword from '../../../utilities/AccountRecovery/updatePassword';
import { ThemeContext } from '../../../contexts/ThemeProvider';

const ChangePassword = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const headerHeight = useHeaderHeight();
  const email = route.params.params;

  const [newPassword, setNewPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRef = useRef(null);
  const confPasswordRef = useRef(null);

  const handlerPressOutside = () => {
    passwordRef.current?.blur();
    confPasswordRef.current?.blur();
  };

  const showAlert = (title, message) => Alert.alert(title, message);
  const handlerNewPasswrod = (text) => setNewPassword(text);
  const handlerConfPassword = (text) => setConfPassword(text);
  const handlerShowPassword = () => setHidePassword((prev) => !prev);

  const handlerChangePassword = async () => {
    if (newPassword.length < 6 || confPassword.length < 6) {
      showAlert('Senha Inválida', 'Digite uma senha de no mínimo 6 dígitos!');
      return;
    }
    if (newPassword.includes(' ') || confPassword.includes(' ')) {
      showAlert('Senha Inválida', 'Digite uma senha válida!');
      return;
    }

    if (newPassword === '' || confPassword === '') {
      showAlert('Senha Inválida', 'Preencha os campos de senha!');
      return;
    }
    if (newPassword !== confPassword) {
      showAlert('Senha Inválida', 'As senhas não coincidem!');
      return;
    } else {
      setIsLoading(true);
      const result = await updatePassword(email, newPassword);
      if (result.status === 500) {
        showAlert('Error no Servidor', 'Tente novamente mais tarde!');
      } else if (result.status === 204) {
        showAlert('Sucesso', 'Senha alterada com sucesso!');
        navigation.replace('Login');
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTintColor: '#FF7900',
    });
  }, []);
  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress={handlerPressOutside}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={[styles.container, { marginTop: headerHeight }]}>
            <View style={styles.formContainer}>
              <Text fontSize={36} fontFamily={theme.font.bold} lineHeight="sm" marginBottom="5" color="#FF7900">
                Alterar Senha
              </Text>
              <View>
                <Text fontSize={16} fontFamily={theme.font.semiBold}>
                  Digite a sua nova senha
                </Text>
                <TextInput
                  ref={passwordRef}
                  secureTextEntry={hidePassword}
                  placeholder="Nova senha"
                  autoCapitalize="none"
                  style={{ width: 300 }}
                  mode="outlined"
                  onChangeText={handlerNewPasswrod}
                />

                <Text fontSize={16} fontFamily={theme.font.semiBold} marginTop={5}>
                  Confirme a sua nova senha
                </Text>
                <TextInput
                  ref={confPasswordRef}
                  secureTextEntry={hidePassword}
                  placeholder="Confirmação da senha"
                  autoCapitalize="none"
                  style={{ width: 300 }}
                  mode="outlined"
                  onChangeText={handlerConfPassword}
                />
                <TouchableOpacity style={{ alignItems: 'flex-start' }} onPress={handlerShowPassword}>
                  <Text marginTop={2} fontFamily={theme.font.semiBold}>
                    {hidePassword ? 'Mostrar senha' : 'Esconder senha'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnContainer}>
                <Button
                  style={styles.btn}
                  isLoading={isLoading}
                  backgroundColor="#FF7900"
                  onPress={handlerChangePassword}
                >
                  <Text fontFamily={theme.font.semiBold} color="white">
                    Alterar Senha
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 30,
    width: '100%',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: 20,
    width: '100%',
  },
  btn: {
    borderRadius: 5,
  },
});
