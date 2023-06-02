import { View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Provider, Text, Button } from 'react-native-paper';
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
import CircularProgress from 'react-native-circular-progress-indicator';

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
  const getWaterProgress = () => {
    const progress = (params.consumedWater / params.totalWater) * 100;
    if (progress > 100) return 100;
    return progress;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Provider>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
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
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                flexWrap: 'wrap',
              }}
            >
              {params.nome}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.statsContainer}>
              <View style={{ width: '100%', marginBottom: 40, alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Estatísticas</Text>
              </View>
              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.statsWaterContainer}
                  onPress={() => navigation.navigate('WaterAmount')}
                >
                  <CircularProgress
                    value={getWaterProgress()}
                    radius={60}
                    progressValueColor={'black'}
                    activeStrokeColor={'blue'}
                    inActiveStrokeColor={'brown'}
                    inActiveStrokeOpacity={0.5}
                    inActiveStrokeWidth={10}
                    activeStrokeWidth={20}
                    valueSuffix="%"
                  />
                </TouchableOpacity>
                <View style={styles.statsWaterController}>
                  <Text>Água Consumida</Text>
                  <Button
                    textColor="white"
                    style={{ backgroundColor: 'orange', borderRadius: 5, marginTop: 5 }}
                    onPress={() => navigation.navigate('WaterAmount')}
                  >
                    Adicionar Água
                  </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
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
