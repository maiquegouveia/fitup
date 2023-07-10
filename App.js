import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AppContext from './AppContext';
import { useState, useCallback, useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider, ThemeContext } from './contexts/ThemeProvider';
import EditDish from './src/screens/Dish/EditDish';
import DrawerContent from './DrawerContent';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import SplashScreenComponent from './SplashScreenComponent';
import { Entypo } from '@expo/vector-icons';
import { NativeBaseProvider } from 'native-base';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';
import Profile from './src/screens/Profile/Profile';
import Settings from './src/screens/Settings/Settings';
import InitialScreen from './src/screens/InitialScreen';
import SearchFood from './src/screens/SearchFood/SearchFood';
import FavoriteFoods from './src/screens/FavoriteFoods/FavoriteFoods';
import FavoriteDishes from './src/screens/Dish/FavoriteDishes';
import WaterAmount from './src/screens/WaterAmount/WaterAmount';
import CreateDish from './src/screens/Dish/CreateDish';
import AccountRecovery from './src/screens/AccountRecovery/AccountRecovery';
import ChangePassword from './src/screens/AccountRecovery/ChangePassword';
import NewCadastro from './src/screens/NewCadastro/NewCadastro';
import SearchUser from './src/screens/SearchUsers/SearchUser';
import ProfileSearch from './src/screens/SearchUsers/ProfileSearch';
import ChatScreen from './src/screens/Dish/ChatScreen';

import User from './models/User';

function RootStack() {
  const [params, setParams] = useState({});
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [userObject, setUserObject] = useState(new User());
  const [activeScreen, setActiveScreen] = useState('');
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);

  const [fontsLoaded] = useFonts({
    DMBold: require('./assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('./assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('./assets/fonts/DMSans-Regular.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('./assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsLight: require('./assets/fonts/Poppins-Light.ttf'),
    BelanosimaBold: require('./assets/fonts/Belanosima-Bold.ttf'),
    BelanosimaRegular: require('./assets/fonts/Belanosima-Regular.ttf'),
    BelanosimaSemiBold: require('./assets/fonts/Belanosima-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return <SplashScreenComponent />;

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
        isLoadingTheme,
        setIsLoadingTheme,
      }}
    >
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator
            onLayout={onLayoutRootView}
            initialRouteName="InitialScreen"
            screenOptions={{
              headerTransparent: true,
              headerTintColor: '#FF7900',
              title: '',
            }}
          >
            <Stack.Screen name="InitialScreen" component={InitialScreen} options={{}} />
            <Stack.Screen
              name="AccountRecovery"
              component={AccountRecovery}
              options={{
                title: '',
              }}
            />

            <Stack.Screen name="ChangePassword" component={ChangePassword} />

            <Stack.Screen name="NewCadastro" component={NewCadastro} />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{
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
                    setIsLoadingTheme,
                    isLoadingTheme,
                  }}
                >
                  <NativeBaseProvider>{!isLoadingTheme && <DrawerStack userObject={userObject} />}</NativeBaseProvider>
                </AppContext.Provider>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

function DrawerStack({ userObject }) {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerContent />}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#59CA6B' },
        headerTitle: () => (
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Home')}>
            <Text style={{ fontSize: 25, fontFamily: theme.font.bold }}>FitUP</Text>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Profile')}>
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
        }}
        component={Profile}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Configurações',
        }}
      />

      <Drawer.Screen
        name="SearchFood"
        options={{
          title: 'Buscar Alimentos',
        }}
      >
        {() => <SearchFood theme={theme} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="FavoriteFoods"
        options={{
          title: 'Alimentos Favoritos',
        }}
      >
        {() => <FavoriteFoods userObject={userObject} theme={theme} />}
      </Drawer.Screen>
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
        options={{
          title: 'Criar Prato',
        }}
      >
        {() => <CreateDish userObject={userObject} theme={theme} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="EditDish"
        component={EditDish}
        options={{
          title: '',
        }}
      />
      <Drawer.Screen
        name="SearchUser"
        options={{
          title: '',
        }}
      >
        {() => <SearchUser userObject={userObject} theme={theme} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="ProfileSearch"
        component={ProfileSearch}
        options={{
          title: '',
        }}
      />
      <Drawer.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: '',
        }}
      />
    </Drawer.Navigator>
  );
}

export default RootStack;
