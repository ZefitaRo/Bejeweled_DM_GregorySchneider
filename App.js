import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StartScreen from './screens/StartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoggedIn from './screens/LoggedIn';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import GameScreen from "./screens/GameScreen";

const Stack = createNativeStackNavigator();
export default function App() {

    return(

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="StartScreen" component={StartScreen}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
                <Stack.Screen name="LoggedIn" component={LoggedIn}/>
                <Stack.Screen name="GameScreen" component={GameScreen}/>
            </Stack.Navigator>
        </NavigationContainer>


    );

};
