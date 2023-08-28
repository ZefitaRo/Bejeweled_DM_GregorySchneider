import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert, Dimensions} from 'react-native';
import {nameValidator, passwordValidator} from "../tools/loginVerificator";
import * as SQLite from 'expo-sqlite'
import {HomeScreenBackground, LoginButtonImage, RegisterButtonImage, MenuPanel} from "../tools/theme";
import * as Font from 'expo-font';

const screenWidth = Dimensions.get('window').width;

export default class RegisterScreen extends React.Component {

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
        //initialise les states
        this.state = {
            name: "",
            password: "",
        };
    }

    alerte(){
        Alert.alert(
            'Erreur',
            'Veuillez remplir correctement les champs',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }

    handleSignUp() {
        //console.log("enter handlesignup");
        const nameError = nameValidator(this.state.name);
        //console.log(nameError);
        const passwordError = passwordValidator(this.state.password);
        //console.log(passwordError);
        //console.log("const passée");

        console.log("Name:", this.state.name);
        console.log("Password:", this.state.password);

        if (passwordError || nameError) {
            console.log("Validation Error:", nameError, passwordError);
            this.alerte();
            return;
        } else {
            const db = SQLite.openDatabase("database.db");
            db.transaction(
                tx => {
                    /*// Permet la suppression des données existantes dans la table "user"

                    /!\Décommenter si vous souhaitez vider la table `user`

                    tx.executeSql(
                        "DELETE FROM user;",
                        [],
                        (_, resultSet) => {
                            console.log("Table 'user' vidée avec succès.");
                        },
                        (_, error) => {
                            console.error("Erreur lors de la vidange de la table 'user' :", error);
                            return true; // Rollback de la transaction
                        }
                    );*/

                    // Insertion des nouvelles données
                    tx.executeSql(
                        "INSERT INTO user (name, mdp) VALUES (?, ?)",
                        [this.state.name, this.state.password],
                        (_, { insertId, rows }) => {
                            // L'insertion a réussi
                            //console.log("Data inserted successfully, insertId:", insertId);

                            // Interrogation des données juste après l'insertion
                            tx.executeSql(
                                "SELECT * FROM user",
                                [],
                                (_, resultSet) => {
                                    //console.log("Selected data:", resultSet.rows._array);
                                }
                            );
                        },
                        (_, error) => {
                            // Gestionnaire d'erreur
                            console.error("Error inserting data:", error);
                            return true; // Will rollback the transaction
                        }
                    );
                },
                (error) => {
                    // Gestion des erreurs de transaction
                    console.error("Transaction error:", error);
                },
                () => {
                    // Gestionnaire de succès de transaction
                    //console.log("Navigating to LoginScreen");
                    this.props.navigation.navigate('LoginScreen');
                }
            );
        }
    }

    handleSignIn ()
    {

        const {navigate} = this.props.navigation;
        navigate ('LoginScreen');
    };
    render()
    {
        return (
            <View style={styles.container}>
                <ImageBackground source={HomeScreenBackground} resizeMode="cover" style={[styles.background, {width: screenWidth }]}>

                    <View style = {styles.titleContainer}>
                        <ImageBackground source={MenuPanel} style = {styles.TitleImage}>
                            {this.state.fontLoaded && ( // Vérifier si la police est chargée
                                <Text style={styles.MenuTitle}>INSCRIPTION</Text>
                            )}
                        </ImageBackground>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Pseudo"
                        placeholderTextColor="black"
                        returnKeyType={"next"}
                        onSubmitEditing={()=>this.passwordTextInput.focus()}
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}/>

                    <Text></Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        placeholderTextColor="black"
                        ref={(input)=>this.passwordTextInput = input}
                        returnKeyType={"go"}
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                        secureTextEntry/>

                    <Text></Text>

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

                    <Text></Text>

                    {this.state.fontLoaded && ( // Vérifier si la police est chargée
                        <Text style={styles.buttonTextInscription}>Déjà inscrit? </Text>
                    )}

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

    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
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

    buttonTextInscription: {
        fontSize: 22,
        color: '#0f00ff',
        fontFamily: 'BubbleBobble',
        textAlign: 'center',
        marginBottom: 5,

    },
});