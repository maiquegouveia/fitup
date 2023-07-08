import { useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AppContext from '../../../AppContext';
import CardFeature from './components/CardFeature';
import { cardAguaFeature, cardAliments, cardBuscar, cardPratos } from '../../../constants/images';
import { ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../../contexts/ThemeProvider';

const Home = () => {
  const { userObject, setUserObject, setActiveScreen } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);

  const progressBar = userObject.getRegistrationProgress();
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      await userObject.getDailyWaterConsume();
      await userObject.getFavoriteFoods();
      await userObject.getDishes();
      const updatedUserObject = userObject.clone();
      updatedUserObject.setTotalWater();
      setUserObject(updatedUserObject);
    };
    getData();
  }, []);

  const onPressCard = (screen) => {
    setActiveScreen(screen);
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Text style={[styles.welcomeText, { color: theme.fontColor.title, fontFamily: theme.font.bold }]}>
              Home
            </Text>
            <TouchableOpacity onPress={() => console.log(userObject)}>
              <Ionicons name="notifications" size={26} color={theme.iconColor} />
            </TouchableOpacity>
          </View>
          {progressBar !== 1 && (
            <View style={styles.registrationProgressContainer}>
              <Text style={[styles.progressBarText, { fontFamily: theme.font.bold }]}>Complete o seu cadastro...</Text>
              <ProgressBar progress={progressBar} color="#E57A44" style={{ height: 5 }} />
            </View>
          )}
        </View>
        <CardFeature title="Buscar Alimentos" cardBackground={cardBuscar} onPress={() => onPressCard('SearchFood')} />
        <CardFeature title="Água Diária" cardBackground={cardAguaFeature} onPress={() => onPressCard('WaterAmount')} />
        <CardFeature
          title="Alimentos Favoritos"
          cardBackground={cardAliments}
          onPress={() => onPressCard('FavoriteFoods')}
        />
        <CardFeature
          title="Pratos Favoritos"
          cardBackground={cardPratos}
          onPress={() => onPressCard('FavoriteDishes')}
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
  },
  nutriContainer: {
    backgroundColor: 'green',
  },
  registrationProgressContainer: {
    backgroundColor: '#DFD9E2',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  progressBarText: {
    fontSize: 18,
    color: '#0B5563',
  },
});
