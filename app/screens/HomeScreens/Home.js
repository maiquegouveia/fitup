import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSearchParams } from 'expo-router';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';

const Home = () => {
  const params = useSearchParams();
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
