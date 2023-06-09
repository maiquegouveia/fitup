import { View, StyleSheet } from 'react-native';
import { WarningOutlineIcon, Text } from 'native-base';

const WarningCreateDish = ({ message }) => {
  return (
    <View style={styles.warningContainer}>
      <WarningOutlineIcon color="danger.500" size="xs" />
      <Text fontSize="xs" color="danger.500" marginLeft={2}>
        {message}
      </Text>
    </View>
  );
};

export default WarningCreateDish;

const styles = StyleSheet.create({
  warningContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
});
