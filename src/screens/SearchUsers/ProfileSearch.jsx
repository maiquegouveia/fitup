import { View, SafeAreaView, Image, ScrollView } from 'react-native';
import { Provider, Text, Button } from 'react-native-paper';
import { useState, useContext, useEffect } from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import ButtonComponent from '../../components/ButtonComponent';
import styles from './ProfileSearch.style';
import AppContext from '../../../AppContext';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import Card from './components/Card';
import FoodItem from './components/FoodItem';
import DishItem from './components/DishItem';

const ProfileSearch = ({ route, navigation }) => {
  const { userObject } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const { user } = route.params;

  const getWaterProgress = () => {
    if (user.consumedWater > 0) {
      const progress = (user.consumedWater / user.totalWater) * 100;
      if (progress > 100) return 100;
      else return progress;
    }
    return 0;
  };

  const [waterProgress, setWaterProgress] = useState(getWaterProgress());

  useEffect(() => {
    const progress = getWaterProgress();
    setWaterProgress(progress);
  }, [user.consumedWater]);

  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: theme.backgroundColor }]}>
      <Provider>
        <ScrollView contentContainerStyle={{ padding: 10 }} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.profileImageContainer}>
              <Image source={{ uri: `${user.profilePicture}` }} resizeMode="contain" style={styles.image} />
            </View>

            <Text style={[styles.nameText, { color: theme.fontColor.title }]}>{user.name}</Text>
            <Text style={[styles.nameText, { color: theme.fontColor.title }]}>{user.username}</Text>
          </View>

          <Card title="Estatísticas" style={{ marginTop: 50 }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: 100,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 20,
                marginTop: 30,
              }}
            >
              <View style={{ width: '55%' }}>
                <Text style={{ fontSize: 34, fontWeight: 'bold', color: theme.profile.card.fontColor }}>
                  Água Consumida
                </Text>
              </View>
              <CircularProgress
                value={waterProgress}
                radius={60}
                progressValueColor={theme.profile.card.fontColor}
                activeStrokeColor={'#16B6E9'}
                inActiveStrokeColor={'#D9D9D9'}
                inActiveStrokeOpacity={0.5}
                inActiveStrokeWidth={10}
                activeStrokeWidth={10}
                valueSuffix="%"
                duration={400}
              />
            </View>
          </Card>
          <Card title={`Pratos (${user.dishes.length})`}>
            {user.dishes.map((dish, index) => (
              <DishItem
                dish={dish}
                key={dish.id}
                user={user}
                style={{ marginTop: user.dishes.length !== index ? 10 : 0 }}
              />
            ))}
          </Card>

          <Card title={`Alimentos Favoritos (${user.favoriteFoods.length})`} style={{ marginBottom: 10 }}>
            {user.favoriteFoods.map((food, index) => (
              <FoodItem food={food} key={food.id} style={{ marginTop: user.favoriteFoods.length !== index ? 10 : 0 }} />
            ))}
          </Card>
        </ScrollView>
      </Provider>
    </SafeAreaView>
  );
};

export default ProfileSearch;
