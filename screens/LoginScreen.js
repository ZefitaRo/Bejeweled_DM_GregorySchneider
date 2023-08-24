import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Alert, Dimensions, ImageBackground } from 'react-native';
import * as SQLite from 'expo-sqlite'
import {HomeScreenBackground, LoginButtonImage, MenuPanel, RegisterButtonImage} from "../tools/theme";
import * as Font from 'expo-font';

const screenWidth = Dimensions.get('window').width;

export default class LoginScreen extends React.Component {

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

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: ""
        };
    }

    handleLogIn = () => {
        const { name, password } = this.state;
        if (!name || !password) {
            Alert.alert(
                'Erreur',
                'Veuillez remplir tous les champs',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
            return;
        }

        const db = SQLite.openDatabase("database.db");
        db.transaction(
            tx => {
                tx.executeSql("select * from user", [], (_, { rows: { _array } }) => {
                    console.log("login")
                    console.log(_array)
                    var userConnect = false
                    for (var i = 0; i < _array.length; i++) {
                        if (_array[i].name === name && _array[i].mdp === password) {
                            userConnect = true;
                            this.props.navigation.navigate('LoggedIn', { username: _array[i].name });
                            break; // On sort de la boucle uen fois une correspondance trouvée
                        }
                    }
                    if (!userConnect) {
                        Alert.alert(
                            'Erreur',
                            'Le pseudo ou le mot de passe est incorrect',
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false },
                        );
                    }
                });
            }
        );
    };

    handleSignIn ()
    {
        console.log(`On s'inscrit'`);
        const {navigate} = this.props.navigation;
        navigate ('RegisterScreen');
    };

    render()
    {
        const  {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <ImageBackground source={HomeScreenBackground} resizeMode="cover" style={[styles.background, {width: screenWidth }]}>

                    <View style = {styles.titleContainer}>
                        <ImageBackground source={MenuPanel} style = {styles.TitleImage}>
                            {this.state.fontLoaded && ( // Vérifier si la police est chargée
                                <Text style={styles.MenuTitle}>LOGIN</Text>
                            )}
                        </ImageBackground>
                    </View>

                    <TextInput
                        style={styles.input}
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
                        placeholder="Pseudo"
                        placeholderTextColor="black"
                        returnKeyType={"next"}
                        onSubmitEditing={()=>this.passwordTextInput.focus()}/>

                    <Text></Text>

                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                        placeholder="Mot de passe"
                        placeholderTextColor="black"
                        ref={(input)=>this.passwordTextInput = input}
                        returnKeyType={"go"}/>

                    <View style = {styles.loginButtonContainer}>
                        <ImageBackground source={LoginButtonImage} style = {styles.loginButtonBackground} resizeMode = 'contain'>
                            {this.state.fontLoaded && ( // Vérifier si la police est chargée
                                <View style={styles.loginTextContainer}>
                                    <TouchableOpacity onPress={() => this.handleLogIn()} style={styles.loginButton}>
                                        <Text style={styles.loginText}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ImageBackground>
                    </View>

                    <Text></Text>

                    <View style = {styles.loginButtonContainer}>
                        <ImageBackground source={RegisterButtonImage} style = {styles.loginButtonBackground} resizeMode = 'contain'>
                            {this.state.fontLoaded && ( // Vérifier si la police est chargée
                                <View style={styles.loginTextContainer}>
                                    <TouchableOpacity onPress={() => this.handleSignIn()} style={styles.loginButton}>
                                        <Text style={styles.loginText}>S'inscrire</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ImageBackground>
                    </View>

                    <Text></Text>

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
        padding: 0,
    },
    input: {
        width: '90%',
        height: 48,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 15,
    },

    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginButtonContainer: {
        marginTop: 15,
    },

    loginButtonBackground: {
        width: 150,
        height: 50,
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

    loginText: {
        fontSize: 28,
        color: '#ffffff',
        marginBottom: 30,
        fontFamily: 'BubbleBobble',
        textAlign: 'center',
    },

    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    TitleImage: {
        width: 250,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    MenuTitle: {
        fontSize: 30,
        color: 'white',
        marginBottom: 20,
        fontFamily: 'BubbleBobble',
        textAlign: 'center',
    },
});

