import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import AppContext from "./AppContext";
import { useState } from "react";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Settings from "./src/screens/Settings";
import InitialScreen from "./src/screens/InitialScreen";
import Cadastro from "./src/screens/Cadastro";

import { leftArrow } from "./constants/icons";

function RootStack() {
  const [params, setParams] = useState({});

  return (
    <AppContext.Provider value={{ params, setParams }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="InitialScreen"
          screenOptions={{
            headerTransparent: true,
            title: "",
          }}
        >
          <Stack.Screen
            name="InitialScreen"
            component={InitialScreen}
            options={{}}
          />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{
              headerBackImageSource: leftArrow,
              headerTintColor: "rgba(81, 242, 5, 1)",
              title: "",
            }}
          />
          <Stack.Screen
            name="Login"
            options={{
              headerBackImageSource: leftArrow,
              headerTintColor: "rgba(81, 242, 5, 1)",
              title: "",
            }}
          >
            {() => <Login setParams={setParams} />}
          </Stack.Screen>
          <Stack.Screen
            name="DrawerStack"
            options={{
              headerShown: false,
            }}
          >
            {() => (
              <AppContext.Provider value={{ params, setParams }}>
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
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

export default RootStack;
