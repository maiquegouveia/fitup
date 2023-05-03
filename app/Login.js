import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
} from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import leftArrow from "../assets/left-arrow.png";
import background from "../assets/home-img-2.png";
import logo from "../assets/logo.png";
import emailIcon from "../assets/email-icon.png";
import passwordIcon from "../assets/password-icon.png";
import view from "../assets/view.png";
import hide from "../assets/hide.png";
import { useHeaderHeight } from "@react-navigation/elements";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const headerHeight = useHeaderHeight();

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
        <View style={[styles.logoContainer, { marginTop: headerHeight }]}>
          <ImageBackground
            source={logo}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { marginLeft: 10 }]}
                placeholder="Email"
                placeholderTextColor="rgba(255, 255, 255, 1)"
              ></TextInput>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  placeholderTextColor="rgba(255, 255, 255, 1)"
                  secureTextEntry={!showPassword}
                ></TextInput>
              </View>
              <TouchableOpacity
                onPress={() =>
                  setShowPassword((prev) => {
                    return !prev;
                  })
                }
              >
                <Image
                  source={!showPassword ? view : hide}
                  resizeMode="contain"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.esqueceuContainer}>
              <Text style={styles.esqueceuText}>Esqueceu senha?</Text>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => router.push("/Cadastro")}
            >
              <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>
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
  logoContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: 156,
    height: 176,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: 315,
    height: 336,
    backgroundColor: "rgba(255, 255, 255, 0.34)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
  input: {
    width: 250,
    fontSize: 20,
    color: "rgba(255, 255, 255, 1)",
    marginTop: 20,
    marginLeft: 40,
    textDecorationLine: "none",
  },
  inputContainer: {
    width: 250,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(255, 255, 255, 1)",
    borderBottomWidth: 1,
  },
  inputWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 16,
    marginTop: 20,
    marginRight: 10,
  },
  esqueceuContainer: {
    alignItems: "flex-start",
    width: 250,
    marginTop: 20,
    marginBottom: 30,
  },
  esqueceuText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
  },
});
