import { TouchableOpacity, Image } from 'react-native';
import { leftArrow } from '../../constants/icons';

const CustomBackButtonHeader = ({ navigation, screenName }) => {
  const handleBackPress = () => {
    navigation.replace(screenName);
  };

  return (
    <TouchableOpacity style={{ width: 30, height: 30, marginLeft: 15 }} onPress={handleBackPress}>
      <Image style={{ width: 30, height: 30 }} resizeMode="contain" source={leftArrow} />
    </TouchableOpacity>
  );
};

export default CustomBackButtonHeader;
