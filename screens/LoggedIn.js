import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground} from 'react-native';
import * as SQLite from 'expo-sqlite'
import {HomeScreenBackground, StartGameButton, DisconnectButton } from "../tools/theme";
import * as Font from 'expo-font';

const screenWidth = Dimensions.get('window').width;

export default class LoggedIn extends React.Component
{
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


    handleLogOut ()
    {
        const {navigate} = this.props.navigation;
        navigate ('StartScreen');
    };

    handleLogIn ()
    {
        const {navigate} = this.props.navigation;
        navigate ('LoggedIn');
    };

    handleGameMenu ()
    {
        const {navigate} = this.props.navigation;
        navigate ('GameScreen');
    };

    render()
    {
        return (
            <View style={styles.container}>
                <ImageBackground source={HomeScreenBackground} resizeMode="cover" style={[styles.background, {width: screenWidth }]}>

                    <View style = {styles.startGameButtonContainer}>
                        <ImageBackground source={StartGameButton} style = {styles.simpleButtonBackground} resizeMode = 'contain'>
                            {this.state.fontLoaded && ( // Vérifier si la police est chargée
                                <View style={styles.simpleButtonTextContainer}>
                                    <TouchableOpacity onPress={() => this.handleGameMenu()} style={styles.simpleButton}>
                                        <Text style={styles.simpleButtonText}>Start Game</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ImageBackground>
                    </View>

                    <View style = {styles.disconnectButtonContainer}>
                        <ImageBackground source={DisconnectButton} style = {styles.simpleButtonBackground} resizeMode = 'contain'>
                            {this.state.fontLoaded && ( // Vérifier si la police est chargée
                                <View style={styles.simpleButtonTextContainer}>
                                    <TouchableOpacity onPress={() => this.handleLogOut()} style={styles.simpleButton}>
                                        <Text style={styles.simpleButtonText}>Quitter</Text>
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

    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },

    startGameButtonContainer: {
        marginBottom: -30,
    },

    disconnectButtonContainer: {
        marginTop: -40,
    },

    simpleButtonBackground: {
        width: 450,
        height: 200,
    },

    simpleButtonTextContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    simpleButton: {
        width: 150,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },

    startGameText: {
        fontSize: 28,
        color: '#ffffff',
        marginBottom: 30,
        fontFamily: 'BubbleBobble',
        textAlign: 'center',
    },

    simpleButtonText: {
        fontSize: 28,
        color: '#ffffff',
        marginBottom: 30,
        fontFamily: 'BubbleBobble',
        textAlign: 'center',
    },


});