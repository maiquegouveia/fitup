import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";

import background from "../assets/home-img-2.png";
import { leftArrow, view, hide } from "../constants/icons";

import { useHeaderHeight } from "@react-navigation/elements";
import Logo from "./components/UI/Logo";
import Button from "./components/UI/Button";
import Input from "./components/UI/InputEmail";
import { TextInput } from "react-native-paper";

const Login = () => {
  const router = useRouter();
  const [hidePassword, setHidePassword] = useState(true);
  const headerHeight = useHeaderHeight();

  const onEntrarHandler = function () {
    router.push("/Home");
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerBackImageSource: leftArrow,
          headerTintColor: "rgba(81, 242, 5, 1)",
          headerTransparent: true,
        }}
      />
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.background}
      >
        <Logo style={{ marginTop: headerHeight }} />
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <TextInput
              underlineStyle={{ width: 0 }}
              mode="flat"
              label="Email"
              style={styles.input}
            />
            <TextInput
              underlineStyle={{ width: 0 }}
              mode="flat"
              label="Senha"
              style={[styles.input, { marginTop: 10 }]}
              secureTextEntry={hidePassword}
              right={
                <TextInput.Icon
                  onPress={() => {
                    setHidePassword((prev) => !prev);
                  }}
                  icon={hidePassword ? "eye" : "eye-off"}
                />
              }
            />
            <View style={styles.esqueceuContainer}>
              <Text style={styles.esqueceuText}>Esqueceu a senha?</Text>
            </View>
            <Button title="Entrar" onPress={onEntrarHandler} />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: 315,
    height: 336,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  esqueceuContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  esqueceuText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
  },
  input: {
    width: 250,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderRadius: 10,
  },
});