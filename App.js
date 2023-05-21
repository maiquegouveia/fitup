import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AppContext from './AppContext';
import { useState } from 'react';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Settings from './src/screens/Settings';
import InitialScreen from './src/screens/InitialScreen';
import Cadastro from './src/screens/Cadastro';
import Help from './src/screens/Help';
import { leftArrow } from './constants/icons';
import SearchFood from './src/screens/SearchFood';

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
                <DrawerStack />
              </AppContext.Provider>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

function DrawerStack() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'orange' },
        headerTitleAlign: 'center',
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Meu Perfil',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Configurações',
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          title: 'Ajuda',
        }}
      />
      <Drawer.Screen
        name="SearchFood"
        component={SearchFood}
        options={{
          title: 'Alimentos',
        }}
      />
    </Drawer.Navigator>
  );
}

export default RootStack;
