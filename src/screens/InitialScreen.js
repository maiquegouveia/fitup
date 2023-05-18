import { SafeAreaView, ImageBackground } from "react-native";
import image from "../../assets/home-img-1.png";
import Logo from "../components/Logo";
import HomeButtons from "../components/HomeButtons";
import { useHeaderHeight } from "@react-navigation/elements";
import styles from "../styles/InitialScreen.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const HomePage = () => {
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data !== null) {
          // router.push({ pathname: '/screens/HomeScreens/Home', params: JSON.parse(data) });
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Logo style={{ marginTop: headerHeight + 100 }} />
        <HomeButtons />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomePage;
