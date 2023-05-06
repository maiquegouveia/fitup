import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

const Logo = ({ style }) => {
  return (
    <View style={[styles.logoContainer, style]}>
      <ImageBackground
        source={{
          uri: "https://i.ibb.co/sWXJ5tm/logo.png",
        }}
        resizeMode="contain"
        style={styles.logo}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoContainer: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: 156,
    height: 176,
  },
});
