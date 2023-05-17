import React from 'react';
import { Stack } from 'expo-router';
import { leftArrow } from '../constants/icons';

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="screens/MainScreens/Login"
        options={{
          headerBackImageSource: leftArrow,
          headerTintColor: 'rgba(81, 242, 5, 1)',
          title: '',
        }}
      />
      <Stack.Screen
        name="screens/MainScreens/Cadastro"
        options={{
          headerTitle: '',
          headerBackImageSource: leftArrow,
          headerTintColor: 'rgba(81, 242, 5, 1)',
        }}
      />
      <Stack.Screen
        name="screens/HomeScreens"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default _layout;
