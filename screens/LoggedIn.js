import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';

export default class LoggedIn extends React.Component
{


    handleLogOut ()
    {
        console.log(`On se deconnecte`);
        const {navigate} = this.props.navigation;
        navigate ('HomeScreen');
    };

    handleLogIn ()
    {
        console.log(`On se connecte`);
        const {navigate} = this.props.navigation;
        navigate ('LoggedIn');
    };

    handleGameMenu ()
    {
        console.log(`On se dirige vers le menu du jeu`);
        const {navigate} = this.props.navigation;
        navigate ('GameMenu');
    };

    render()
    {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button_menu_du_jeu} onPress={() => this.handleGameMenu()}>
                    <Text style={styles.buttonText_Menu_du_jeu}>Menu du jeu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button_inscription} onPress={() => this.handleLogOut()}>
                    <Text style={styles.buttonText_inscription}>DÉCONNEXION</Text>
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
        backgroundColor: 'white',
        color: "",
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_menu_du_jeu: {
        width: '100%',
        height: 48,
        backgroundColor: 'green',
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
        color: 'blue',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonText_Menu_du_jeu: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },


});