import { useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import AppContext from '../../AppContext';
import CardFeature from '../components/CardFeature';
import { cardAguaFeature, cardAliments, cardPratos } from '../../constants/images';
import { ProgressBar, Avatar } from 'react-native-paper';
import CalculateRegistrationProgress from '../../utilities/CalculateRegistrationProgress';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import getUserFavoriteFoods from '../../utilities/getUserFavoriteFoods';

const Home = () => {
  const { params, userIsAuthenticated, setParams } = useContext(AppContext);
  const progressBar = CalculateRegistrationProgress(params);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Home',
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Profile')}>
          <Avatar.Image
            style={{ marginRight: 10 }}
            size={38}
            source={{ uri: `https://i.ibb.co/${params.foto_perfil}` }}
          />
        </TouchableOpacity>
      ),
    });
    const getData = async () => {
      const data = await getUserFavoriteFoods(params.usuario_id);
      setParams(prev => {
        return {
          ...prev,
          favoriteList: data,
        };
      });
    };
    getData();
  }, []);

  return (
    <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.welcomeContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.welcomeText}>Funcionalidades</Text>
          <TouchableOpacity>
            <Ionicons name="notifications" size={26} color="black" />
          </TouchableOpacity>
        </View>
        {progressBar !== 1 && (
          <View style={styles.registrationProgressContainer}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Complete o seu cadastro...</Text>
            <ProgressBar progress={progressBar} color="orange" />
          </View>
        )}
      </View>
      <CardFeature
        title="Alimentos Favoritos"
        cardBackground={cardAliments}
        onPress={() => navigation.navigate('FavoriteFoods')}
      />
      <CardFeature
        title="Água Diária"
        cardBackground={cardAguaFeature}
        onPress={() => navigation.navigate('WaterAmount')}
      />
      <CardFeature
        title="Pratos Favoritos"
        cardBackground={cardPratos}
        onPress={() => navigation.navigate('FavoriteDishes')}
      />
      <Button title="Teste" onPress={() => console.log('CLEAR')} />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  welcomeContainer: {
    padding: 5,
    marginBottom: '10%',
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  nutriContainer: {
    backgroundColor: 'green',
  },
  registrationProgressContainer: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginTop: '5%',
  },
});
