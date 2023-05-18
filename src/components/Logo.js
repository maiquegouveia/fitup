import { ImageBackground, View } from "react-native";
import React from "react";
import { logo } from "../../constants/images";
import styles from "../styles/Logo.style";

const Logo = ({ style }) => {
  return (
    <View style={[styles.logoContainer, style]}>
      <ImageBackground source={logo} resizeMode="contain" style={styles.logo} />
    </View>
  );
};

export default Logo;
