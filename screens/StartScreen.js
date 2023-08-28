import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions, Image} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {
    StartScreenBackground,
    GameTitleImage,
    ButtonImage,
    StartScreenMenuButton,
    DisconnectButton
} from "../tools/theme";
import * as Font from 'expo-font';

const screenWidth = Dimensions.get('window').width;


export default class StartScreen extends React.Component {

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
        const {navigate} = this.props.navigation;
        navigate ('HomeScreen');
    };

    render()
    {
        return (

            <View style = {styles.container}>
                <ImageBackground source={StartScreenBackground} resizeMode="cover" style={[styles.background, {width: screenWidth }]}>

                <View style = {styles.titleContainer}>
                    <ImageBackground source={GameTitleImage} style = {styles.TitleImage}>
                    {this.state.fontLoaded && ( // Vérifier si la police est chargée
                        <Text style={styles.header}>Fruits Party</Text>
                    )}
                    </ImageBackground>
                </View>

                <View style = {styles.menuButtonContainer}>
                    <ImageBackground source={StartScreenMenuButton} style = {styles.simpleButtonBackground} resizeMode = 'contain'>
                        {this.state.fontLoaded && ( // Vérifier si la police est chargée
                            <View style={styles.simpleButtonTextContainer}>
                                <TouchableOpacity onPress={() => this.handleSignIn()} style={styles.simpleButton}>
                                    <Text style={styles.simpleButtonText}>Menu</Text>
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
        fontSize: 48,
        color: '#007cff',
        marginBottom: 30,
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

    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    TitleImage: {
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

    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuButtonContainer: {
        marginTop: 20,
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