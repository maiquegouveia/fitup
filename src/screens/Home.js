import { useContext } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native";
import AppContext from "../../AppContext";

const Home = () => {
  const { params } = useContext(AppContext);
  return (
    <View>
      <Text>Home</Text>
      <Button title="Click" onPress={() => console.log(params)} />
    </View>
  );
};

export default Home;
