import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../../../contexts/ThemeProvider';

const DishCardInfo = ({ label, value, suffix }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <Text style={[styles.dishProperties, { fontFamily: theme.font.semiBold }]}>
        {`${label}: `}
        <Text style={{ fontFamily: theme.font.regular }}>
          {value}
          {suffix}
        </Text>
      </Text>
    </View>
  );
};

export default DishCardInfo;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dishProperties: {
    fontSize: 14,
    lineHeight: 20,
  },
  dishDescription: {
    fontSize: 14,
  },
});
