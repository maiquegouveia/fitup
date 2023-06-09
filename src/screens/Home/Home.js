import { useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import AppContext from '../../../AppContext';
import CardFeature from './components/CardFeature';
import { cardAguaFeature, cardAliments, cardBuscar, cardPratos } from '../../../constants/images';
import { ProgressBar, Avatar } from 'react-native-paper';
import CalculateRegistrationProgress from '../../../utilities/CalculateRegistrationProgress';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import getUserFavoriteFoods from '../../../utilities/FavoriteFoods/getUserFavoriteFoods';
import getUserDailyWaterConsume from '../../../utilities/getUserDailyWaterConsume';
import { ThemeContext } from '../../../contexts/ThemeProvider';

const Home = () => {
  const { params, userIsAuthenticated, setParams } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);

  const progressBar = CalculateRegistrationProgress(params);
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      const data = await getUserFavoriteFoods(params.usuario_id);
      const consumedWater = await getUserDailyWaterConsume(params.usuario_id);
      setParams((prev) => {
        return {
          ...prev,
          favoriteList: data,
          consumedWater: consumedWater,
          totalWater: prev.peso > 0 ? prev.peso * 35 : 2000,
        };
      });
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.welcomeText, { color: theme.fontColor.title }]}>Funcionalidades</Text>
            <TouchableOpacity>
              <Ionicons name="notifications" size={26} color={theme.iconColor} />
            </TouchableOpacity>
          </View>
          {progressBar !== 1 && (
            <View style={styles.registrationProgressContainer}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0B5563' }}>Complete o seu cadastro...</Text>
              <ProgressBar progress={progressBar} color="#E57A44" style={{ height: 5 }} />
            </View>
          )}
        </View>
        <CardFeature
          title="Buscar Alimentos"
          cardBackground={cardBuscar}
          onPress={() => navigation.navigate('SearchFood')}
        />
        <CardFeature
          title="Água Diária"
          cardBackground={cardAguaFeature}
          onPress={() => navigation.navigate('WaterAmount')}
        />
        <CardFeature
          title="Alimentos Favoritos"
          cardBackground={cardAliments}
          onPress={() => navigation.navigate('FavoriteFoods')}
        />
        <CardFeature
          title="Pratos Favoritos"
          cardBackground={cardPratos}
          onPress={() => navigation.navigate('FavoriteDishes')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  welcomeContainer: {
    padding: 5,
    marginBottom: '10%',
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#0B5563',
  },
  nutriContainer: {
    backgroundColor: 'green',
  },
  registrationProgressContainer: {
    backgroundColor: '#DFD9E2',
    padding: 10,
    borderRadius: 5,
    marginTop: '5%',
  },
});
