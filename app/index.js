import { StyleSheet, View, SafeAreaView, ImageBackground } from "react-native";
import { Stack, useRouter } from "expo-router";
import React from "react";
import image from "../assets/home-img-1.png";
import Button from "./components/UI/Button";
import Logo from "./components/UI/Logo";
import { useHeaderHeight } from "@react-navigation/elements";

const Page = () => {
  const router = useRouter();

  const onEntrarHandler = function () {
    router.push("/Login");
  };

  const onCadastrarHandler = function () {
    router.push("/Cadastro");
  };

  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Logo style={{ marginTop: headerHeight + 100 }} />
        <View style={styles.btnsContainer}>
          <Button title="Entrar" onPress={onEntrarHandler} />
          <Button title="Cadastrar-se" onPress={onCadastrarHandler} />
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

  btnsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
});
