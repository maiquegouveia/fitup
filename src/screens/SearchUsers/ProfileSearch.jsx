import { View, SafeAreaView, Image, ScrollView } from 'react-native';
import { Provider, Text } from 'react-native-paper';
import { useState, useContext, useEffect } from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import styles from './ProfileSearch.style';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import Card from './components/Card';
import FoodItem from './components/FoodItem';
import DishItem from './components/DishItem';

const ProfileSearch = ({ route, navigation }) => {
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

            <Text
              style={[styles.nameText, { lineHeight: 22, color: theme.fontColor.title, fontFamily: theme.font.bold }]}
            >
              {user.name}
            </Text>
            <Text
              style={[{ lineHeight: 22, color: theme.fontColor.title, fontFamily: theme.font.regular, fontSize: 14 }]}
            >
              {user.username}
            </Text>
          </View>

          <Card title="Estatísticas" style={{ marginTop: 50, padding: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                padding: 10,
              }}
            >
              <View style={styles.waterContainer}>
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
              <View style={styles.subWaterContainer}>
                <Text
                  style={[
                    styles.subWaterContainerTitle,
                    { fontFamily: theme.font.bold, color: theme.fontColor.textBlack },
                  ]}
                >
                  Água Consumida
                </Text>
              </View>
            </View>
          </Card>
          <Card style={{ marginTop: 10, padding: 10 }} title={`Pratos (${user.dishes.length})`}>
            {user.dishes.map((dish, index) => (
              <DishItem
                theme={theme}
                dish={dish}
                key={dish.id}
                user={user}
                style={{ marginTop: user.dishes.length !== index ? 10 : 0 }}
              />
            ))}
          </Card>

          <Card style={{ marginTop: 10, padding: 10 }} title={`Alimentos Favoritos (${user.favoriteFoods.length})`}>
            {user.favoriteFoods.map((food, index) => (
              <FoodItem
                theme={theme}
                food={food}
                key={food.id}
                style={{ marginTop: user.favoriteFoods.length !== index ? 10 : 0 }}
              />
            ))}
          </Card>
        </ScrollView>
      </Provider>
    </SafeAreaView>
  );
};

export default ProfileSearch;
