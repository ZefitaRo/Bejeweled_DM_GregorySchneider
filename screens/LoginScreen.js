import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';

export default class LoginScreen extends React.Component
{


    handleLogIn ()
    {
        console.log(`On se connecte`);
        const {navigate} = this.props.navigation;
        navigate ('LoggedIn');
    };
    handleSignIn ()
    {
        console.log(`On s'inscrit'`);
        const {navigate} = this.props.navigation;
        navigate ('LoginScreen');
    };



    render()
    {
        const  {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                <Text style={styles.header}>Connexion</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    /*value={this.email}
                    onChangeText={setEmail}*/
                    keyboardType="email-address"
                />
                <Text></Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Password"
                    /*value={this.email}
                    onChangeText={setEmail}*/
                    /*keyboardType="password"*/
                />
                <Text></Text>
                <TouchableOpacity style={styles.button_co} onPress={() => this.handleLogIn()}>
                    <Text style={styles.buttonText_co}>Connexion</Text>
                </TouchableOpacity>
                <Text></Text>
                <TouchableOpacity style={styles.button_in} onPress={() => this.handleSignIn()}>
                    <Text style={styles.buttonText_in}>S'inscrire</Text>
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