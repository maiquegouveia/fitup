import { useContext } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native';
import AppContext from '../../AppContext';

const Home = () => {
  const { params, userIsAuthenticated } = useContext(AppContext);
  return (
    <View>
      <Text>Home Test</Text>
    </View>
  );
};

export default Home;
