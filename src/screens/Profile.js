import { View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Provider, Text } from 'react-native-paper';
import { useState, useContext } from 'react';
import EditProfileContainer from '../components/EditProfileContainer';
import styles from '../styles/ProfileScreen.style';
import ButtonComponent from '../components/ButtonComponent';
import Dialog from '../components/Dialog';
import AppContext from '../../AppContext';
import { useNavigation } from '@react-navigation/native';
import getImageAndPermissions from '../../utilities/getImageAndPermissions';
import removeUserCredentialsFromStorage from '../../utilities/removeUserCredentialsFromStorage';

const ProfileScreen = () => {
  const { params, setUserIsAuthenticated } = useContext(AppContext);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [showEditContainer, setShowEditContainer] = useState(false);

  const [image, setImage] = useState({
    base64: '',
  });

  const navigation = useNavigation();

  const onCancelEditHandler = () => {
    setShowEditContainer(prev => !prev);
  };

  const onSaveEditHandler = data => {
    setShowEditContainer(prev => !prev);
    console.log(data);
  };

  const onLogoutHandler = () => {
    setUserIsAuthenticated(false);
    removeUserCredentialsFromStorage();
    navigation.replace('InitialScreen');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Provider>
        <Dialog
          visible={visibleDialog}
          hideDialog={() => setVisibleDialog(false)}
          title="Dados alterados com sucesso!"
          content="Suas informações cadastradas foram alteradas com sucesso."
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.container]}>
            <View style={styles.profileImageContainer}>
              <TouchableOpacity onPress={() => getImageAndPermissions()}>
                <Image
                  source={{ uri: `https://i.ibb.co/${params.foto_perfil}` }}
                  resizeMode="contain"
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 0.5, alignItems: 'center' }}>
            {!showEditContainer && (
              <>
                <View
                  style={{
                    width: '70%',
                    alignItems: 'center',
                    marginBottom: 40,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      flexWrap: 'wrap',
                    }}
                  >
                    {params.nome}
                  </Text>
                </View>
                <ButtonComponent
                  styles={{ marginBottom: 20 }}
                  btnText="Editar Perfil"
                  onPress={() => setShowEditContainer(true)}
                />
                <ButtonComponent btnText="Sair" onPress={onLogoutHandler} />
              </>
            )}
            {showEditContainer && (
              <View style={{ width: '100%', padding: 20 }}>
                <EditProfileContainer
                  userData={{ ...params }}
                  onCancelEdit={onCancelEditHandler}
                  onSaveEdit={onSaveEditHandler}
                  setVisibleDialog={setVisibleDialog}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </Provider>
    </SafeAreaView>
  );
};

export default ProfileScreen;
