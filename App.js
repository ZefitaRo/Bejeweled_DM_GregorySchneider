import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Dashboard from "./screens/Dashboard";
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
const Stack = createNativeStackNavigator();
import { Provider } from 'react-redux'
import Store from './store/configStore'

const App = () => {
  return (
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name="Homescreen"
                component={HomeScreen}
            />
            <Stack.Screen name="Loginscreen" component={LoginScreen} />
            <Stack.Screen name="Registerscreen" component={RegisterScreen} />
            <Stack.Screen name="ForgotPasswordscreen" component={ForgotPasswordScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
};

export default App;
