import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoggedIn from './screens/LoggedIn';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import GameMenu from "./screens/GameMenu";

const Stack = createNativeStackNavigator();
export default function App() {

    return(

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
                <Stack.Screen name="LoggedIn" component={LoggedIn}/>
                <Stack.Screen name="GameMenu" component={GameMenu}/>
            </Stack.Navigator>
        </NavigationContainer>


    );

};
