import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { leftArrow } from "../../constants/icons";
import Form from "../components/UI/Form";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { RadioButton } from "react-native-paper";
import ProfileImage from "../components/UI/ProfileImage";
import isValidEmail from "../../utilities/isValidEmail";

const Cadastro = () => {
  const router = useRouter();
  const [termoStatus, setTermoStatus] = useState("unchecked");

  const termoStatusHandler = function () {
    if (termoStatus === "unchecked") setTermoStatus("checked");
    else setTermoStatus("unchecked");
  };

  const [email, setEmail] = useState({
    value: "",
    isValid: false,
  });

  const [senha, setSenha] = useState({
    value: "",
    isValid: false,
  });

  const [confSenha, setConfSenha] = useState({
    value: "",
    isValid: false,
  });

  const [image, setImage] = useState({
    uri: "https://i.ibb.co/k3F3bq4/default.png",
    base64: "",
  });

  const [formIsValid, setFormIsValid] = useState(false);

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
    /// Este useEffect será executado toda vez que "confSenha.value" sofrer alteração
    /// Define se "confSenha.value" é uma valor válido
    if (confSenha.value === senha.value) {
      setConfSenha((prev) => {
        return {
          ...prev,
          isValid: true,
        };
      });
    } else {
      setConfSenha((prev) => {
        return {
          ...prev,
          isValid: false,
        };
      });
    }
  }, [confSenha.value]);

  useEffect(() => {
    /// Este useEffect será executado toda vez que "email.isValid","senha.isValid","confSenha.isValid" ou "termoStatus" sofrer alteração
    /// Define se o formulário é válido
    setFormIsValid(
      email.isValid &&
        senha.isValid &&
        confSenha.isValid &&
        termoStatus === "checked"
    );
  }, [email.isValid, senha.isValid, confSenha.isValid, termoStatus]);

  const postImage = async () => {
    let imageUrl;
    try {
      let body = new FormData();
      body.append("key", "f0fbe7cb625f524b53d190796b79cbc3");
      body.append("image", image.base64);
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: body,
      });
      const data = await response.json();
      imageUrl = data.data.display_url;
    } catch (error) {
      console.log(error);
    }
    return imageUrl;
  };

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

  const postUserFirebase = async (dataUser) => {
    try {
      const response = await fetch(
        "https://fitup-b9b55-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUser),
        }
      );

      if (!response.ok) throw new Error("ERROR_POST_FIREBASE");
    } catch (error) {
      console.log(error);
    }
  };
  //Botão de registro
  const registerBtnHandler = async function () {
    if (formIsValid) {
      const profileImageURL = await postImage();
      const imageUrl = profileImageURL.replace("https://i.ibb.co/", "");

      await postUserFirebase({
        email: email.value,
        senha: senha.value,
        profileImage: imageUrl,
      });
      router.replace("/Login");
    } else {
      let errorTitle;
      let errorMsg;
      if (
        email.isValid === false &&
        senha.isValid === false &&
        confSenha.isValid === false
      ) {
        errorTitle = "Campos inválidos!";
        errorMsg =
          "Digite um email válido, uma senha maior que 8 digitos e repita senha para confirmação.";
      } else if (!email.isValid) {
        errorTitle = "Email inválido!";
        errorMsg = "Digite um email válido para fazer o cadastro.";
      } else if (!senha.isValid) {
        errorTitle = "Senha inválida!";
        errorMsg = "A senha deve ser maior que 8 digitos.";
      } else if (!confSenha.isValid) {
        errorTitle = "Confirmação de senha inválida!";
        errorMsg =
          "A confirmação de senha deve ser igual a senha digitada anteriormente.";
      } else {
        errorTitle = "Aceitação de Termos & Condições!";
        errorMsg =
          "Você precisa concordar com os temos e condições para criar uma conta.";
      }
      Alert.alert(errorTitle, errorMsg);
    }
  };

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

      <ProfileImage image={image} setImage={setImage} />

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
