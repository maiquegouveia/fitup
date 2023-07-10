import { StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default ({ onPress, iconColor, activeOpacity }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={activeOpacity} onPress={onPress}>
      <Entypo name="log-out" size={24} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
});
