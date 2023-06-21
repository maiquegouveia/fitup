import { StyleSheet, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Text, NativeBaseProvider, Button } from 'native-base';
import { TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import CustomBackButtonHeader from '../../components/CustomBackButtonHeader';
import CustomHelpButtonHeader from './components/CustomHelpButtonHeader';
import { useHeaderHeight } from '@react-navigation/elements';
import editUserCredentials from '../../../utilities/editUserCredentials';

const ChangePassword = ({ route, navigation }) => {
  const headerHeight = useHeaderHeight();
  const params = route.params.params;

  const [newPassword, setNewPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
      const result = await editUserCredentials(params.usuario_id, 'senha', 'string', newPassword);
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
      headerLeft: () => <CustomBackButtonHeader navigation={navigation} screenName="Login" />,
      headerRight: () => <CustomHelpButtonHeader onPress={() => {}} />,
    });
  }, []);
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.mainContainer}>
        <View style={[styles.container, { marginTop: headerHeight }]}>
          <View style={styles.formContainer}>
            <Text fontSize={36} fontWeight="bold" lineHeight="sm" marginBottom="5">
              Alterar Senha
            </Text>
            <View>
              <Text fontSize={16} fontWeight="semibold">
                Digite a sua nova senha
              </Text>
              <TextInput
                secureTextEntry={hidePassword}
                placeholder="Nova senha"
                autoCapitalize="none"
                style={{ width: 300 }}
                mode="outlined"
                onChangeText={handlerNewPasswrod}
              />

              <Text fontSize={16} fontWeight="semibold" marginTop={5}>
                Confirme a sua nova senha
              </Text>
              <TextInput
                secureTextEntry={hidePassword}
                placeholder="Confirmação da senha"
                autoCapitalize="none"
                style={{ width: 300 }}
                mode="outlined"
                onChangeText={handlerConfPassword}
              />
              <TouchableOpacity style={{ alignItems: 'flex-start' }} onPress={handlerShowPassword}>
                <Text marginTop={2} fontWeight="semibold">
                  {hidePassword ? 'Mostrar senha' : 'Esconder senha'}
                </Text>
              </TouchableOpacity>
            </View>
            <Button isLoading={isLoading} marginTop={10} backgroundColor="green.700" onPress={handlerChangePassword}>
              Alterar Senha
            </Button>
          </View>
        </View>
      </SafeAreaView>
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
  btn: {
    backgroundColor: 'green',
    borderRadius: 5,
    marginTop: 30,
    width: '100%',
  },
});
