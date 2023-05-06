import { StyleSheet, Image, View, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";

const ProfileImage = () => {
  const defaultImage = "https://i.ibb.co/k3F3bq4/default.png";
  const [image, setImage] = useState({
    uri: defaultImage,
    base64: "",
  });

  const postImage = async () => {
    let body = new FormData();
    body.append("key", "f0fbe7cb625f524b53d190796b79cbc3");
    body.append("image", image.base64);
    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: body,
    });
    const data = await response.json();
    console.log(data);
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Sem permissão!", "Você precisa permitar acesso a galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage({
        uri: result.assets[0].uri,
        base64: result.assets[0].base64,
      });
    }
  };

  return (
    <View style={styles.profileImageContainer}>
      <Button onPress={postImage}>Test</Button>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            style={[
              styles.image,
              {
                borderColor:
                  defaultImage === image.uri ? "transparent" : "black",
              },
            ]}
            resizeMode="contain"
            source={{
              uri: image.uri,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  profileImageContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {},
  image: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 2,
  },
});
