import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions, Image} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {HomeScreenBackground, LoginButtonImage, RegisterButtonImage} from "../tools/theme";
import * as Font from 'expo-font';

const screenWidth = Dimensions.get('window').width;


export default class HomeScreen extends React.Component {

    state = {
        fontLoaded: false, // Ajouter un état pour vérifier si la police est chargée
    };

    async componentDidMount(){
        const db = SQLite.openDatabase("database.db");
        db.transaction(tx => {
            tx.executeSql("create table if not exists user (id integer primary key not null, name text, mdp text);");
        });

        // Charger la police ici
        await Font.loadAsync({
            'BubbleBobble': require('../assets/fonts/BubbleBobble.otf'),
        });

        this.setState({ fontLoaded: true }); // Mettre à jour l'état une fois que la police est chargée
    }

    handleSignIn ()
    {
        console.log(`direction la page de connexion`);
        const {navigate} = this.props.navigation;
        navigate ('LoginScreen');
    };

    handleSignUp ()
    {
        console.log(`direction la page d'inscription`);
        const {navigate} = this.props.navigation;
        navigate ('RegisterScreen');
    };

    render()
    {
        return (

            <View style={styles.container}>
                <ImageBackground source={HomeScreenBackground} resizeMode="cover" style={[styles.background, {width: screenWidth }]}>

                    <View style = {styles.loginButtonContainer}>
                        <ImageBackground source={LoginButtonImage} style = {styles.loginButtonBackground} resizeMode = 'contain'>
                            {this.state.fontLoaded && ( // Vérifier si la police est chargée
                                <View style={styles.loginTextContainer}>
                                    <TouchableOpacity onPress={() => this.handleSignIn()} style={styles.loginButton}>
                                        <Text style={styles.loginText}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ImageBackground>
                    </View>

                    <View style = {styles.loginButtonContainer}>
                        <ImageBackground source={RegisterButtonImage} style = {styles.loginButtonBackground} resizeMode = 'contain'>
                            {this.state.fontLoaded && ( // Vérifier si la police est chargée
                                <View style={styles.loginTextContainer}>
                                    <TouchableOpacity onPress={() => this.handleSignUp()} style={styles.loginButton}>
                                        <Text style={styles.loginText}>Inscription</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ImageBackground>
                    </View>

                    <StatusBar style="auto" />

                </ImageBackground>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 42,
        color: '#007cff',
        marginBottom: 10,
        fontFamily: 'BubbleBobble',
        textAlign: 'center',
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    },

    loginTextContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginButton: {
        width: 150,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },

    loginButtonContainer: {
        marginTop: 40,
    },

    loginText: {
        fontSize: 28,
        color: '#ffffff',
        marginBottom: 30,
        fontFamily: 'BubbleBobble',
        textAlign: 'center',
    },

    image: {
        width: 300,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
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

    loginButtonBackground: {
        width: 150,
        height: 50,
    },

    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
});