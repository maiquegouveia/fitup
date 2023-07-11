import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import AppContext from '../../../AppContext';
import deleteUser from '../../../utilities/deleteUser';
import removeAsyncStorage from '../../../utilities/removeAsyncStorage';
import { Portal, PaperProvider } from 'react-native-paper';
import TermsModal from './components/TermsModal';
import Modal from './components/Modal';

const Settings = ({ navigation }) => {
  const { theme, setIsDarkMode } = useContext(ThemeContext);
  const { userObject, setUserIsAuthenticated } = useContext(AppContext);

  const [termsModal, setTermsModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setTermsModal(true);
  const hideModal = () => setTermsModal(false);

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
    <PaperProvider>
      <TermsModal visible={termsModal} hideDialog={hideModal} />
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
        <Portal>
          <Modal visible={modalVisible} hideDialog={() => setModalVisible(false)} />
        </Portal>
        <View style={{ position: 'absolute' }}></View>
        <View style={styles.body}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.container}>
            <AntDesign name="questioncircle" size={15} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.textBtn, { color: theme.fontColor.text }]}>Sobre Nós</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.container} onPress={showModal}>
            <Ionicons name="ios-document-text" size={15} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.textBtn, { color: theme.fontColor.text }]}>Termo & Condições</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.container]} onPress={onChangeTheme}>
            <Ionicons name="color-fill" size={15} color={theme.iconColor} style={styles.icon} />
            <Text style={[styles.textBtn, { color: theme.fontColor.text }]}>Alterar cor de fundo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={AlertShow}
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
            <Text style={[styles.textBtn, { color: 'white', marginLeft: 0 }]}>Excluir Conta</Text>
          </TouchableOpacity>
          <View>
            <Text style={{ alignItems: 'center', marginTop: 12, color: theme.fontColor.text }}>Versão 1.0</Text>
          </View>
        </View>
      </SafeAreaView>
    </PaperProvider>
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
