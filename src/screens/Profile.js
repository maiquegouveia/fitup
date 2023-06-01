import { View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Provider, Text } from 'react-native-paper';
import { useState, useContext } from 'react';
import EditProfileContainer from '../components/EditProfileContainer';
import styles from '../styles/ProfileScreen.style';
import ButtonComponent from '../components/ButtonComponent';
import AppContext from '../../AppContext';
import { useNavigation } from '@react-navigation/native';
import getImageAndPermissions from '../../utilities/getImageAndPermissions';
import removeUserCredentialsFromStorage from '../../utilities/removeUserCredentialsFromStorage';
import EditProfileModal from '../components/EditProfileModal';
import { EditProfileContext } from '../../EditProfileContext';
import editUserCredentials from '../../utilities/editUserCredentials';

const ProfileScreen = () => {
  const { params, setParams, setUserIsAuthenticated } = useContext(AppContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const { modalContent } = useContext(EditProfileContext);
  const [showEditContainer, setShowEditContainer] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState({
    base64: '',
  });

  const navigation = useNavigation();

  const onShowEditModal = () => {
    setErrorMessage('');
    setShowEditModal(true);
  };

  const onCloseEditModal = () => {
    setShowEditModal(false);
  };

  const onSaveEditModal = async () => {
    setIsLoading(true);
    const response = await editUserCredentials(
      params.usuario_id,
      modalContent.field.name,
      modalContent.field.type,
      modalContent.value
    );
    setIsLoading(false);
    if (response.status === 204) {
      const updatedParams = { ...params };
      updatedParams[`${modalContent.field.name}`] = modalContent.value;
      if (modalContent.field.name === 'peso') {
        updatedParams.totalWater = updatedParams.peso * 35;
      }
      setParams(updatedParams);
      setShowEditModal(false);
    } else if (response.status === 500 && response?.errorCode === 'ER_DUP_ENTRY') {
      setErrorMessage(`${modalContent.inputLabel} já cadastrado!`);
    }
  };

  const onCloseEditHandler = () => {
    setShowEditContainer((prev) => !prev);
  };

  const onLogoutHandler = () => {
    setUserIsAuthenticated(false);
    removeUserCredentialsFromStorage();
    navigation.replace('InitialScreen');
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Provider>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'pink',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
              }}
            >
              <View style={styles.profileImageContainer}>
                <TouchableOpacity onPress={() => getImageAndPermissions()}>
                  <Image
                    source={{ uri: `https://i.ibb.co/${params.foto_perfil}` }}
                    resizeMode="contain"
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
              <Text
                onPress={() => navigation.navigate('WaterAmount')}
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginLeft: 12,
                }}
              >
                {params.nome}
              </Text>
            </View>
            <View style={{ width: '50%', backgroundColor: 'blue' }}></View>
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
                ></View>
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
                <EditProfileModal
                  isLoading={isLoading}
                  errorMessage={errorMessage}
                  showEditModal={showEditModal}
                  onCloseEditModal={onCloseEditModal}
                  onSaveEditModal={onSaveEditModal}
                />
                <EditProfileContainer onCloseEditHandler={onCloseEditHandler} onShowEditModal={onShowEditModal} />
              </View>
            )}
          </View>
        </ScrollView>
      </Provider>
    </SafeAreaView>
  );
};

export default ProfileScreen;
