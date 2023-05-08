import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter, useSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { Button } from "react-native-paper";

const Home = () => {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <View>
      <Stack.Screen />
      <Text>EMAIL: {params.email}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
