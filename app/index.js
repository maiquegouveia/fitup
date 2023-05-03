import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import React from "react";
import image from "../assets/home-img-1.png";
import logo from "../assets/logo.png";

const Page = () => {
  const router = useRouter();
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
        <View style={styles.btnsContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => router.push("/Login")}
          >
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => router.push("/Cadastro")}
          >
            <Text style={styles.btnText}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  btnsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  logo: {
    width: 156,
    height: 176,
  },
  btn: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: 250,
    padding: 5,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 24,
    color: "rgba(29, 29, 41, 0.6)",
    fontWeight: "bold",
  },
});
