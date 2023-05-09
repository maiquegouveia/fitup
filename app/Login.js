import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Stack, useRouter } from "expo-router";

import background from "../assets/home-img-2.png";
import { leftArrow } from "../constants/icons";

import { useHeaderHeight } from "@react-navigation/elements";
import Logo from "./components/UI/Logo";
import Button from "./components/UI/Button";
import { TextInput } from "react-native-paper";
import isValidEmail from "../utilities/isValidEmail";

const Login = () => {
  const router = useRouter();

  const [hidePassword, setHidePassword] = useState(true);
  const headerHeight = useHeaderHeight();

  const emailRef = useRef();

  const [email, setEmail] = useState({
    value: "",
    isValid: false,
  });

  const senhaRef = useRef();

  const [senha, setSenha] = useState({
    value: "",
    isValid: false,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const onChangeEmail = function (text) {
    setEmail((prev) => {
      return {
        ...prev,
        value: text,
      };
    });
  };

  const onChangeSenha = function (text) {
    setSenha((prev) => {
      return {
        ...prev,
        value: text,
      };
    });
  };

  useEffect(() => {
    /// Este useEffect será executado toda vez que "email.value" sofrer alteração
    /// Define se "email.value" é uma valor válido

    if (isValidEmail(email.value)) {
      setEmail((prev) => {
        return {
          ...prev,
          isValid: true,
        };
      });
    } else {
      setEmail((prev) => {
        return {
          ...prev,
          isValid: false,
        };
      });
    }
  }, [email.value]);

  useEffect(() => {
    /// Este useEffect será executado toda vez que "senha.value" sofrer alteração
    /// Define se "senha.value" é uma valor válido
    if (senha.value.length > 8) {
      setSenha((prev) => {
        return {
          ...prev,
          isValid: true,
        };
      });
    } else {
      setSenha((prev) => {
        return {
          ...prev,
          isValid: false,
        };
      });
    }
  }, [senha.value]);

  useEffect(() => {
    /// Este useEffect será executado toda vez que "email.isValid" ou "senha.isValid" sofrer alteração
    /// Define se o formulário é válido
    setFormIsValid(email.isValid && senha.isValid);
  }, [email.isValid, senha.isValid]);

  const getDataFirebase = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      //Conectando com o banco de dados do firebase, selecionando o email como chave para consulta
      const response = await fetch(
        `https://fitup-b9b55-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${email.value}"`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const onEntrarHandler = async () => {
    if (formIsValid) {
      const data = await getDataFirebase();
      let dataUser = Object.values(data);
      dataUser = dataUser[0];
      if (dataUser && dataUser.senha === senha.value) {
        router.replace({ pathname: "/Home", params: dataUser });
      } else {
        Alert.alert(
          "Email ou senha inválidos!",
          "Verifique os campos de email e senha e tente novamente."
        );
      }
    } else {
      let errorTitle;
      let errorMsg;
      if (email.isValid === false && senha.isValid === false) {
        errorTitle = "Email e senha inválidos!";
        errorMsg = "Digite um email válido e uma senha maior que 8 digitos.";
      } else if (!email.isValid) {
        errorTitle = "Email inválido!";
        errorMsg = "Digite um email válido para fazer login.";
      } else {
        errorTitle = "Senha inválida!";
        errorMsg = "A senha deve ser maior que 8 digitos.";
      }
      Alert.alert(errorTitle, errorMsg);
    }
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
              ref={emailRef}
              underlineStyle={{ width: 0 }}
              mode="flat"
              label="Email"
              style={styles.input}
              value={email.value}
              onChangeText={onChangeEmail}
            />
            <TextInput
              ref={senhaRef}
              underlineStyle={{ width: 0 }}
              mode="flat"
              label="Senha"
              style={[styles.input, { marginTop: 10 }]}
              secureTextEntry={hidePassword}
              value={senha.value}
              onChangeText={onChangeSenha}
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
