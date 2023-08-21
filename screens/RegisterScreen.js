import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground} from 'react-native';


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
                <TouchableOpacity style={styles.button_connexion} onPress={() => this.handleSignUp()}>
                    <Text style={styles.buttonText_connexion}>Inscription</Text>
                </TouchableOpacity>
                <Text></Text>
                <Text style={styles.buttonText_inscription}>Déjà inscrit? </Text>
                <TouchableOpacity style={styles.button_inscription} onPress={() => this.handleSignIn()}>
                    <Text style={styles.buttonText_connectez_vous}>Connectez-vous</Text>
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
    button_connexion: {
        width: '100%',
        height: 48,
        backgroundColor: 'purple',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_inscription: {
        width: '100%',
        height: 48,
        backgroundColor: 'white',
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
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonText_connectez_vous: {
        color: 'blue',
        fontSize: 16,
        fontWeight: 'bold',
    },


});