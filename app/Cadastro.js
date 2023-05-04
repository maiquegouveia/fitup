import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { leftArrow } from "../constants/icons";
import { useHeaderHeight } from "@react-navigation/elements";
import background from "../assets/home-img-3.png";
import Logo from "./components/UI/Logo";
import Form from "./components/UI/Form";
import Input from "./components/UI/Input";
import { MaterialIcons } from "@expo/vector-icons";

const Cadastro = () => {
  const headerHeight = useHeaderHeight();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerBackImageSource: leftArrow,
          headerTintColor: "rgba(81, 242, 5, 1)",
        }}
      />
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.background}
      >
        <Logo />
        <Form style={{ backgroundColor: "" }}>
          <Input
            place="Primeiro nome"
            placeColor="#787373"
            style={styles.input}
          />
          <Input place="Sobrenome" placeColor="#787373" style={styles.input} />
          <Input
            place="Data de nascimento"
            placeColor="#787373"
            style={styles.input}
          />
          <View style={styles.nextBtnContainer}>
            <TouchableOpacity style={styles.nextBtn}>
              <MaterialIcons name="navigate-next" size={70} color="black" />
            </TouchableOpacity>
          </View>
        </Form>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Cadastro;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 100,
    marginTop: 30,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  nextBtn: {
    borderRadius: 100,
    backgroundColor: "rgba(81, 242, 5, 1)",
    padding: 5,
  },
  nextBtnContainer: {
    marginTop: 40,
    alignItems: "flex-end",
  },
});
