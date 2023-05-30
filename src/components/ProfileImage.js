import { Image, View, TouchableOpacity, Animated, Keyboard, Easing } from 'react-native';
import getImageAndPermissions from '../../utilities/getImageAndPermissions';
import { useHeaderHeight } from '@react-navigation/elements';
import styles from '../styles/ProfileImage.style';

const ProfileImage = ({ image, setImage }) => {
  const headerHeight = useHeaderHeight();
  const viewScale = new Animated.Value(1);

  const keyboardWillShow = e => {
    Animated.timing(viewScale, {
      duration: 100,
      toValue: 0.7,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  const keyboardWillHide = e => {
    Animated.timing(viewScale, {
      duration: 100,
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  Keyboard.addListener('keyboardDidShow', keyboardWillShow);
  Keyboard.addListener('keyboardDidHide', keyboardWillHide);

  return (
    <View style={[styles.profileImageContainer, { marginTop: headerHeight }]}>
      <Animated.View style={[styles.imageContainer, { transform: [{ scale: viewScale }] }]}>
        <TouchableOpacity onPress={() => getImageAndPermissions(setImage)}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: image.uri,
            }}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default ProfileImage;
