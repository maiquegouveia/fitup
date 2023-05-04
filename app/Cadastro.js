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
import Input from "./components/UI/Input";
import { MaterialIcons } from "@expo/vector-icons";

const Cadastro = () => {
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const inputsPlaceAndRef = [
    {
      place1: "Primeiro nome",
      state1: setPrimeiroNome,
      place2: "Sobrenome",
      state2: setSobrenome,
      place3: "Data de nascimento",
      state3: setDataNascimento,
    },
    {
      place1: "Telefone",
      state1: setTelefone,
      place2: "Altura",
      state2: setAltura,
      place3: "Peso",
      state3: setPeso,
    },
    {
      place1: "E-mail",
      state1: setEmail,
      place2: "Senha",
      state2: setSenha,
      place3: "Confirmação da Senha",
      state3: setConfSenha,
    },
  ];

  const onNextHandler = function () {
    setData({
      primeiroNome: primeiroNome,
      sobrenome: sobrenome,
      dataNascimento: dataNascimento,
      telefone: telefone,
      peso: peso,
      altura: altura,
      email: email,
      senha: senha,
      confSenha: confSenha,
    });
    if (currentPage < 2) {
      setCurrentPage((prev) => prev + 1);
    } else {
      console.log(data);
    }
  };

  const firstInputRef = useRef();

  useEffect(() => {
    firstInputRef.current.focus();
  }, [currentPage]);

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
            ref={firstInputRef}
            place={inputsPlaceAndRef[currentPage].place1}
            placeColor="#787373"
            style={styles.inputContainer}
            onFocusStyle={styles.onFocusStyle}
            selectionColor="rgba(81, 242, 5, 1)"
            onChangeHandler={(text) =>
              inputsPlaceAndRef[currentPage].state1(text)
            }
          />
          <Input
            place={inputsPlaceAndRef[currentPage].place2}
            placeColor="#787373"
            style={styles.inputContainer}
            onFocusStyle={styles.onFocusStyle}
            selectionColor="rgba(81, 242, 5, 1)"
            onChangeHandler={(text) =>
              inputsPlaceAndRef[currentPage].state2(text)
            }
          />
          <Input
            place={inputsPlaceAndRef[currentPage].place3}
            placeColor="#787373"
            style={styles.inputContainer}
            onFocusStyle={styles.onFocusStyle}
            selectionColor="rgba(81, 242, 5, 1)"
            onChangeHandler={(text) =>
              inputsPlaceAndRef[currentPage].state3(text)
            }
          />
          <View style={styles.nextBtnContainer}>
            <TouchableOpacity style={styles.nextBtn} onPress={onNextHandler}>
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
  inputContainer: {
    borderWidth: 1,
    borderRadius: 100,
    marginTop: 30,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(255, 255, 255, 1)",
  },
  onFocusStyle: {
    borderWidth: 3,
    borderColor: "rgba(81, 242, 5, 1)",
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
