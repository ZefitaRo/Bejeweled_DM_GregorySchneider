import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native';


export default class HomeScreen extends React.Component
{

    handleSignIn ()
    {
        console.log(`direction la page de connexion`);
        const {navigate} = this.props.navigation;
        navigate ('LoginScreen');

    };
    handleSignUp ()
    {
        const {navigate} = this.props.navigation;
        console.log(`direction la page d'inscription`);
        navigate ('RegisterScreen');
    };

    render()
    {


        return (

            <View style={styles.container}>


                <Text style={styles.header}>Connexion / Inscription</Text>
                <TouchableOpacity style={styles.button_connexion} onPress={() => this.handleSignIn()}>
                    <Text style={styles.buttonText_connexion}>Connexion</Text>
                </TouchableOpacity>
                <Text></Text>
                <TouchableOpacity style={styles.button_inscription} onPress={() => this.handleSignUp()}>
                    <Text style={styles.buttonText_inscription}>Inscription</Text>
                </TouchableOpacity>
                <StatusBar style="auto" />



            </View>

        );
    }




}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },

    input: {
        width: '100%',
        height: 48,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 16,
    },
    button_connexion: {
        width: '100%',
        height: 48,
        backgroundColor: 'blue',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_inscription: {
        width: '100%',
        height: 48,
        backgroundColor: 'purple',
        color: "",
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText_connexion: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonText_inscription: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },


});