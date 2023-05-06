import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { useState, useRef, useEffect } from "react";
import { Stack } from "expo-router";
import { leftArrow } from "../constants/icons";

import Form from "./components/UI/Form";
import { MaterialIcons } from "@expo/vector-icons";
import DatePicker from "./components/UI/DatePicker";
import Input from "./components/UI/Input";
import Button from "./components/UI/Button";
import { RadioButton } from "react-native-paper";
import ProfileImage from "./components/UI/ProfileImage";

const Cadastro = () => {
  const [termoStatus, setTermoStatus] = useState("unchecked");

  const termoStatusHandler = function () {
    if (termoStatus === "unchecked") setTermoStatus("checked");
    else setTermoStatus("unchecked");
  };

  const [email, setEmail] = useState({
    value: "",
    valid: false,
  });
  const [senha, setSenha] = useState({
    value: "",
    valid: false,
  });

  const [confSenha, setConfSenha] = useState({
    value: "",
    valid: false,
  });

  const onChangeEmailHandler = function (text) {
    setEmail((prev) => {
      return {
        ...prev,
        value: text,
      };
    });
  };
  const onChangeSenhaHandler = function (text) {
    setSenha((prev) => {
      return {
        ...prev,
        value: text,
      };
    });
  };
  const onChangeConfSenhaHandler = function (text) {
    setConfSenha((prev) => {
      return {
        ...prev,
        value: text,
      };
    });
  };

  const registerBtnHandler = function () {};

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: false,
          headerBackImageSource: leftArrow,
          headerTintColor: "rgba(81, 242, 5, 1)",
        }}
      />

      <ProfileImage />

      <Form style={{ backgroundColor: "#ccc" }}>
        <Input
          label="Email"
          state={email.value}
          icon="email"
          onChangeTextHandler={onChangeEmailHandler}
        />
        <Input
          label="Senha"
          state={senha.value}
          icon="key"
          onChangeTextHandler={onChangeSenhaHandler}
          secureTextEntry={true}
        />
        <Input
          label="Confirmação de Senha"
          state={confSenha.value}
          icon="lock"
          onChangeTextHandler={onChangeConfSenhaHandler}
          secureTextEntry={true}
        />
        <View style={styles.radioContainer}>
          <RadioButton
            status={termoStatus}
            onPress={termoStatusHandler}
            color="#0094E6"
          />
          <Text style={styles.termoText}>
            Eu concordo com os Termos & Condições
          </Text>
        </View>
        <View style={styles.nextBtnContainer}>
          <Button title="Registrar" onPress={registerBtnHandler} />
        </View>
      </Form>
    </SafeAreaView>
  );
};

export default Cadastro;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  background: {
    flex: 1,
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 100,
    marginTop: 30,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(255, 255, 255, 1)",
  },
  onFocusStyle: {
    borderWidth: 2,
    borderColor: "rgba(81, 242, 5, 1)",
  },
  nextBtn: {
    borderRadius: 100,
    backgroundColor: "rgba(81, 242, 5, 1)",
    padding: 5,
  },
  nextBtnContainer: {},
  radioContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  termoText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
