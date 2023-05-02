import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Stack } from "expo-router";
import React from "react";
import image from "../assets/home-img-1.png";
import logo from "../assets/logo.png";

const Page = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.logoContainer}>
          <ImageBackground
            source={logo}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <Text>Page 1</Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  logoContainer: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 136,
    height: 156,
  },
});
