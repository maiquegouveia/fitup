import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export default async (setImage) => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false) {
    Alert.alert('Sem permissão!', 'Você precisa permitar acesso a galeria.');
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
    return result.assets[0].base64;
  }
};
