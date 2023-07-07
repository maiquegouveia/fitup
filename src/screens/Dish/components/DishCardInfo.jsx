import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../../../contexts/ThemeProvider';

const DishCardInfo = ({ label, value, suffix }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <Text style={[styles.dishProperties, { fontFamily: theme.font.semiBold }]}>{label}: </Text>
      <Text style={[styles.dishDescription, { fontFamily: theme.font.regular }]}>
        {value}
        {suffix}
      </Text>
    </View>
  );
};

export default DishCardInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dishProperties: {
    fontSize: 14,
  },
  dishDescription: {
    fontSize: 14,
  },
});
