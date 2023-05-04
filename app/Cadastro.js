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

const Cadastro = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [primeiroNome, setPrimeiroNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [email, setEmail] = useState({
    value: "",
    valid: false,
  });
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

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

  // useEffect(() => {
  //   firstInputRef.current.focus();
  // }, [currentPage]);

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
          <InputEmail setState={setEmail} state={email} />
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
    marginTop: 40,
    alignItems: "flex-end",
    paddingRight: 20,
  },
  input: {},
});
