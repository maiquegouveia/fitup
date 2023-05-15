import { StyleSheet, View, SafeAreaView, Image, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation, useRouter, useSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { Button, TextInput, Text, Provider } from 'react-native-paper';
import { useHeaderHeight } from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './ProfileScreen.style';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EditInputProfile from '../../components/UI/EditInputProfile';
import DialogEditInput from '../../components/UI/DialogEditInput';

const ProfileScreen = () => {
  const router = useRouter();
  const params = useSearchParams();
  const headerHeight = useHeaderHeight();
  const [visible, setVisible] = useState(false);
  const [titleDialog, setTitleDialog] = useState(null);
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerTitle: 'Meu Perfil',
          headerBackVisible: false,
          gestureEnabled: false,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Provider>
        <DialogEditInput title={titleDialog} visible={visible} setVisible={setVisible} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.container]}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: `https://i.ibb.co/${params.foto_perfil}` }}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
          </View>
          <View style={{ flex: 0.5, alignItems: 'center' }}>
            <View style={{ width: '70%', alignItems: 'center', marginBottom: 40 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', flexWrap: 'wrap' }}>Maique Gouveia de Souza</Text>
            </View>
            <View style={{ width: '100%', backgroundColor: '#ccc', padding: 20 }}>
              <View style={{ width: '100%', alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', flexWrap: 'wrap' }}>Informações Cadastradas</Text>
              </View>
              <EditInputProfile
                label="Nome Completo"
                value={params.nome}
                onPress={() => {
                  setTitleDialog('Nome Completo');
                  setVisible(prev => !prev);
                }}
              />
              <EditInputProfile
                label="Telefone"
                value={params.telefone}
                onPress={() => {
                  setTitleDialog('Telefone');
                  setVisible(prev => !prev);
                }}
              />
              <EditInputProfile
                label="Peso"
                value={params.peso}
                onPress={() => {
                  setTitleDialog('Peso');
                  setVisible(prev => !prev);
                }}
              />
              <EditInputProfile
                label="Altura"
                value={params.altura}
                onPress={() => {
                  setTitleDialog('Altura');
                  setVisible(prev => !prev);
                }}
              />
              <EditInputProfile
                label="Email"
                value={params.email}
                onPress={() => {
                  setTitleDialog('Email');
                  setVisible(prev => !prev);
                }}
              />
              <EditInputProfile
                label="Senha"
                value={params.senha}
                showText={true}
                onPress={() => {
                  setTitleDialog('Senha');
                  setVisible(prev => !prev);
                }}
              />
            </View>

            <Button
              textColor="white"
              style={{ width: 100, backgroundColor: 'green', marginVertical: 20 }}
              onPress={removeData}
            >
              Sair
            </Button>
          </View>
        </ScrollView>
      </Provider>
    </SafeAreaView>
  );
};

export default ProfileScreen;
