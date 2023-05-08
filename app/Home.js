import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter, useSearchParams } from 'expo-router'
import {Stack} from 'expo-router'
import { Button } from 'react-native-paper'

const Home = () => {
    const router = useRouter()
    const params = useSearchParams()

    
    const fetchUserData = async () => {
        const response = await fetch('https://fitup-b9b55-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
    }

  return (
    <View>
        <Stack.Screen />
      <Text>Home</Text>
      <Button onPress={fetchUserData}>Test</Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})