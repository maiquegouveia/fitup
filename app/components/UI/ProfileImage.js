import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import getImageAndPermissions from '../../../utilities/getImageAndPermissions';
import { useHeaderHeight } from '@react-navigation/elements';

const ProfileImage = ({ image, setImage }) => {
  const defaultImage = 'https://i.ibb.co/k3F3bq4/default.png';
  const headerHeight = useHeaderHeight();
  return (
    <View style={[styles.profileImageContainer, { marginTop: headerHeight }]}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => getImageAndPermissions(setImage)}>
          <Image
            style={styles.image}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {},
  image: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#ccc',
  },
});
