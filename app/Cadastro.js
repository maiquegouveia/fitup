import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Stack } from "expo-router";
import { leftArrow } from "../constants/icons";
import background from "../assets/home-img-3.png";
import Logo from "./components/UI/Logo";
import Form from "./components/UI/Form";
import { MaterialIcons } from "@expo/vector-icons";
import DatePicker from "./components/UI/DatePicker";
import InputEmail from "./components/UI/InputEmail";
import InputNome from "./components/UI/InputNome";
import InputNumber from "./components/UI/InputNumber";

const Cadastro = () => {
  const [date, setDate] = useState(new Date());

  const [nome, setNome] = useState({
    value: "",
    valid: false,
  });
  const [sobrenome, setSobrenome] = useState({
    value: "",
    valid: false,
  });
  const [telefone, setTelefone] = useState({
    value: "",
    valid: false,
  });
  const [peso, setPeso] = useState({
    value: "",
    valid: false,
  });
  const [altura, setAltura] = useState({
    value: "",
    valid: false,
  });
  const [email, setEmail] = useState({
    value: "",
    valid: false,
  });
  const [senha, setSenha] = useState({
    value: "",
    valid: false,
  });

  const [confSenha, setConfSenha] = useState("");

  const [data, setData] = useState({});

  const [currentPage, setCurrentPage] = useState(0);

  const onNextHandler = function () {
    if (currentPage < 2) {
      setCurrentPage((prev) => prev + 1);
    }
  };

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
        <Form style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
          {currentPage === 0 && (
            <>
              <InputNome
                label="Primeiro nome"
                setState={setNome}
                state={nome}
              />
              <InputNome
                label="Sobrenome"
                setState={setSobrenome}
                state={sobrenome}
              />
              <DatePicker state={date} setState={setDate} />
            </>
          )}

          {currentPage === 1 && (
            <>
              <InputNumber
                label="Telefone"
                setState={setTelefone}
                state={telefone}
                allowedLength={11}
                icon="phone"
              />
              <InputNumber
                label="Altura"
                setState={setAltura}
                state={altura}
                allowedLength={1}
                icon="inches"
              />
              <InputNumber
                label="Peso"
                setState={setPeso}
                state={peso}
                allowedLength={1}
                icon="weight"
              />
            </>
          )}

          {/* <InputEmail setState={setEmail} state={email} /> */}
        </Form>
        <View style={styles.nextBtnContainer}>
          <TouchableOpacity style={styles.nextBtn} onPress={onNextHandler}>
            <MaterialIcons name="navigate-next" size={70} color="black" />
          </TouchableOpacity>
        </View>
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
  nextBtnContainer: {
    width: 315,
    alignItems: "flex-end",
    paddingRight: 20,
    paddingBottom: 20,
  },
  input: {},
});
