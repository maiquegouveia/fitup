import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AppContext from './AppContext';
import { EditProfileProvider } from './EditProfileContext';
import { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { header } from './constants/images';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Settings from './src/screens/Settings';
import InitialScreen from './src/screens/InitialScreen';
import Cadastro from './src/screens/Cadastro';
import { leftArrow } from './constants/icons';
import SearchFood from './src/screens/SearchFood';
import FavoriteFoods from './src/screens/FavoriteFoods';
import FavoriteDishes from './src/screens/FavoriteDishes';
import WaterAmount from './src/screens/WaterAmount';

function RootStack() {
  const [params, setParams] = useState({});
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  return (
    <AppContext.Provider value={{ params, setParams, userIsAuthenticated, setUserIsAuthenticated }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="InitialScreen"
          screenOptions={{
            headerTransparent: true,
            title: '',
          }}
        >
          <Stack.Screen name="InitialScreen" component={InitialScreen} options={{}} />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{
              headerBackImageSource: leftArrow,
              headerTintColor: 'rgba(81, 242, 5, 1)',
              title: '',
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerBackImageSource: leftArrow,
              headerTintColor: 'rgba(81, 242, 5, 1)',
              title: '',
            }}
          />

          <Stack.Screen
            name="DrawerStack"
            options={{
              headerShown: false,
            }}
          >
            {() => (
              <AppContext.Provider value={{ params, setParams, userIsAuthenticated, setUserIsAuthenticated }}>
                <DrawerStack params={params} />
              </AppContext.Provider>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

function DrawerStack({ params }) {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: '',
        headerBackgroundContainerStyle: { backgroundColor: '#1B818C' },
        headerBackground: () => <Image source={header} style={{ width: '100%', height: '100%' }} resizeMode="cover" />,
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Profile')}>
            <Avatar.Image
              style={{ marginRight: 10 }}
              size={38}
              source={{ uri: `https://i.ibb.co/${params.foto_perfil}` }}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="Profile"
        options={{
          title: 'Meu Perfil',
        }}
      >
        {() => (
          <EditProfileProvider>
            <Profile />
          </EditProfileProvider>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Configurações',
        }}
      />

      <Drawer.Screen
        name="SearchFood"
        component={SearchFood}
        options={{
          title: 'Buscar Alimentos',
        }}
      />
      <Drawer.Screen
        name="FavoriteFoods"
        component={FavoriteFoods}
        options={{
          title: 'Alimentos Favoritos',
        }}
      />
      <Drawer.Screen
        name="FavoriteDishes"
        component={FavoriteDishes}
        options={{
          title: 'Pratos Favoritos',
        }}
      />
      <Drawer.Screen
        name="WaterAmount"
        component={WaterAmount}
        options={{
          title: 'Água Diária',
        }}
      />
    </Drawer.Navigator>
  );
}

export default RootStack;
