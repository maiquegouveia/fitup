import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AppContext from './AppContext';
import { EditProfileProvider } from './EditProfileContext';
import { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider } from './contexts/ThemeProvider';
import EditDish from './src/screens/Dish/EditDish';
import DrawerContent from './DrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';
import Profile from './src/screens/Profile/Profile';
import Settings from './src/screens/Settings/Settings';
import InitialScreen from './src/screens/InitialScreen';
import { leftArrow } from './constants/icons';
import SearchFood from './src/screens/SearchFood/SearchFood';
import FavoriteFoods from './src/screens/FavoriteFoods/FavoriteFoods';
import FavoriteDishes from './src/screens/Dish/FavoriteDishes';
import WaterAmount from './src/screens/WaterAmount/WaterAmount';
import CreateDish from './src/screens/Dish/CreateDish';
import AccountRecovery from './src/screens/AccountRecovery/AccountRecovery';
import ChangePassword from './src/screens/AccountRecovery/ChangePassword';
import NewCadastro from './src/screens/NewCadastro/NewCadastro';
import SearchUser from './src/screens/SearchUsers/SearchUser';

import User from './models/User';

function RootStack() {
  const [params, setParams] = useState({});
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [userObject, setUserObject] = useState(new User());
  const [activeScreen, setActiveScreen] = useState('Home');

  return (
    <AppContext.Provider
      value={{
        params,
        setParams,
        userIsAuthenticated,
        setUserIsAuthenticated,
        userObject,
        setUserObject,
        activeScreen,
        setActiveScreen,
      }}
    >
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
            name="AccountRecovery"
            component={AccountRecovery}
            options={{
              headerBackImageSource: leftArrow,
              headerTintColor: 'rgba(81, 242, 5, 1)',
              title: '',
            }}
          />

          <Stack.Screen name="ChangePassword" component={ChangePassword} />

          <Stack.Screen name="NewCadastro" component={NewCadastro} />

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
              <AppContext.Provider
                value={{
                  params,
                  setParams,
                  userIsAuthenticated,
                  setUserIsAuthenticated,
                  userObject,
                  setUserObject,
                  activeScreen,
                  setActiveScreen,
                }}
              >
                <ThemeProvider>
                  <DrawerStack userObject={userObject} setActiveScreen={setActiveScreen} />
                </ThemeProvider>
              </AppContext.Provider>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

function DrawerStack({ userObject, setActiveScreen }) {
  const navigation = useNavigation();

  const handlerHeaderTitle = () => {
    setActiveScreen('Home');
    navigation.navigate('Home');
  };

  const handlerHeaderProfile = () => {
    setActiveScreen('Profile');
    navigation.navigate('Profile');
  };

  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerContent />}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#59CA6B' },
        headerTitle: () => (
          <TouchableOpacity activeOpacity={0.7} onPress={handlerHeaderTitle}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25 }}>FitUP</Text>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.7} onPress={handlerHeaderProfile}>
            <Avatar.Image style={{ marginRight: 10 }} size={38} source={{ uri: `${userObject.profilePicture}` }} />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="Profile"
        options={{
          title: 'Meu Perfil',
          headerRight: () => null,
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
      <Drawer.Screen
        name="CreateDish"
        component={CreateDish}
        options={{
          title: 'Criar Prato',
        }}
      />
      <Drawer.Screen
        name="EditDish"
        component={EditDish}
        options={{
          title: '',
        }}
      />
      <Drawer.Screen
        name="SearchUser"
        component={SearchUser}
        options={{
          title: '',
        }}
      />
    </Drawer.Navigator>
  );
}

export default RootStack;
