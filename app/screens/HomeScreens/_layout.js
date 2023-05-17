// import { Drawer } from 'expo-router/drawer';

// export default () => {
//   return (
//     <Drawer>
//       <Drawer.Screen
//         name="ProfileScreen"
//         options={{
//           title: 'Meu Perfil',
//           headerTransparent: false,
//         }}
//       />
//     </Drawer>
//   );
// };

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import ProfileScreen from './ProfileScreen';

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            title: 'Meu Perfil',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
