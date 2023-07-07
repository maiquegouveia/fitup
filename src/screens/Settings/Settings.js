import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import AppContext from '../../../AppContext';
import deleteUser from '../../../utilities/deleteUser';
import removeAsyncStorage from '../../../utilities/removeAsyncStorage';

const Settings = ({ navigation }) => {
  const { theme, setIsDarkMode } = useContext(ThemeContext);
  const { userObject, setUserIsAuthenticated } = useContext(AppContext);

  const onChangeTheme = () => setIsDarkMode((prev) => !prev);

  const onDeleteUser = async () => {
    await deleteUser(userObject.id);
    await removeAsyncStorage();
    setUserIsAuthenticated(false);
    navigation.goBack();
  };
  const AlertShow = () => {
    Alert.alert('', 'Deseja deletar sua conta?', [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Confirmar',
        onPress: () => {
          onDeleteUser();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <View style={styles.body}>
        <TouchableOpacity style={styles.container}>
          <AntDesign name="questioncircle" size={15} color={theme.iconColor} style={styles.icon} />
          <Text style={[styles.textBtn, { color: theme.fontColor.text }]}>Sobre</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.container}>
          <Ionicons name="ios-document-text" size={15} color={theme.iconColor} style={styles.icon} />
          <Text style={[styles.textBtn, { color: theme.fontColor.text }]}>Termo & Condições</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.container]} onPress={onChangeTheme}>
          <Ionicons name="color-fill" size={15} color={theme.iconColor} style={styles.icon} />
          <Text style={[styles.textBtn, { color: theme.fontColor.text }]}>Alterar cor de fundo</Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'rgba(250, 2, 2, 0.9)',
            marginTop: 70,
            width: 320,
            height: 40,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity onPress={AlertShow}>
            <Text style={[styles.textBtn, { color: 'white', marginLeft: 0 }]}>Excluir Conta</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text style={{ alignItems: 'center', marginTop: 12, color: theme.fontColor.text }}>Versão 1.0</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  container: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textBtn: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  icon: {
    marginLeft: 18,
  },
});
export default Settings;
