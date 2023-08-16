import React from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Header from '../Components/Header';
import InputText from '../Components/InputText'
import { theme } from '../core/theme';
import { pseudoValidator, passwordValidator } from '../core/utils';
import {connect} from "react-redux";

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            password: ""
        };
    }

    onLoginPressed () {
        const pseudoError = pseudoValidator(this.state.pseudo);
        const passwordError = passwordValidator(this.state.password);
        if (pseudoError || passwordError) {
            alert()
            return;
        }
        const {users} = this.props
        var userConnect = false
        for(var i=0; i<users.length; i++){
            if(users[i].pseudo == this.state.pseudo && users[i].password == this.state.password) {
                userConnect = true
                this.props.navigation.navigate('Dashboard', {username: users[i].name});
            }
        }
        if(userConnect == false){
            Alert.alert(
                'Erreur',
                'Le pseudo ou le mot de passe est incorrect',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            );
        }
    }

    render(){
        var data = null;
        var good = false



        const {navigate} = this.props.navigation;
        return (
            <View>
                <Header title="Connexion"/>

                <InputText
                    value={this.state.pseudo}
                    toto={text => this.setState({ pseudo: text })}
                />
                <View class={styles.view}></View>

                <TextInput
                    label="Password"
                    returnKeyType="done"
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry
                />
                <View class={styles.view}></View>

                <Button onPress={() => this.onLoginPressed()} style={styles.button} title="Connexion"/>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigate('Registerscreen')}>
                        <Text style={styles.link}>S'inscrire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('ForgotPasswordscreen')}>
                        <Text style={styles.link}>Mot de passe oublié</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }

};

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginLeft: 10
    },
    input: {
        backgroundColor: "white",
    },
    view: {
        height: 40
    }
});

const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(LoginScreen)