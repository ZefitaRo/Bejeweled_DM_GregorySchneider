import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import { BejeweledBackgroundImage } from '../tools/theme';

export default class RegisterScreen extends React.Component
{


    handleSignUp ()
    {
        console.log(`On s'inscrit'`);
        const {navigate} = this.props.navigation;
        navigate ('LoggedIn');
    };
    handleSignIn ()
    {
        console.log(`On retourne sur la page de connexion'`);
        const {navigate} = this.props.navigation;
        navigate ('LoginScreen');
    };



    render()
    {
        return (
            <View style={styles.container}>

                <ImageBackground source={BejeweledBackgroundImage} resizeMode="cover" style={styles.background}>

                <Text style={styles.header}>Inscription</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    /*value={this.email}
                    onChangeText={setEmail}*/
                    keyboardType="email-address"
                />
                <Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="E-Mail"
                    /*value={this.email}
                    onChangeText={setEmail}*/
                    /*keyboardType="password"*/
                />
                <Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    /*value={this.email}
                    onChangeText={setEmail}*/
                    /*keyboardType="password"*/
                />
                <Text></Text>
                <Text></Text>
                <TouchableOpacity style={styles.button_co} onPress={() => this.handleSignUp()}>
                    <Text style={styles.buttonText_co}>Inscription</Text>
                </TouchableOpacity>
                <Text></Text>
                <Text style={styles.buttonText_in}>Déjà inscrit? </Text>
                <TouchableOpacity style={styles.button_in} onPress={() => this.handleSignIn()}>
                    <Text style={styles.buttonText_in}>Connectez-vous</Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
                </ImageBackground>

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
    background: {
        width : "100%",
        height : "100%",
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
    button_co: {
        width: '100%',
        height: 48,
        backgroundColor: 'blue',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_in: {
        width: '100%',
        height: 48,
        backgroundColor: 'white',
        color: "",
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText_co: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonText_in: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },


});