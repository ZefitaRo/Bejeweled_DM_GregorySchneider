import React, { memo, useState } from 'react';
import {Text, StyleSheet, TouchableOpacity, Alert, TextInput, Button, View} from 'react-native';
import {emailValidator, passwordValidator} from '../core/utils';
import Header from '../Components/Header';
import { theme } from '../core/theme';
export default class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            newpassword: ""
        };
    }
    render(){
        function alert(){
            Alert.alert(
                'Erreur',
                'Pseudo ou mot de passe incorrect',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            );
        }
        function onSendPressed (state){
            const pseudoError = pseudoValidator(state.pseudo);
            const newpasswordError = passwordValidator(state.newpassword)

            if (pseudoError || newpasswordError) {
                alert()
                return;
            }
        };

        const {navigate} = this.props.navigation;
        return (
            <View>
                <Header>Reinitialiser son mot de passe</Header>

                <TextInput
                    label="Pseudo"
                    returnKeyType="next"
                    value={this.state.pseudo}
                    onChangeText={text => this.setState({ pseudo: text })}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                    autoCompleteType="pseudo"
                    textContentType="pseudo"
                />
                <View class={styles.view}></View>

                <TextInput
                    label="New password"
                    returnKeyType="done"
                    value={this.state.newpassword}
                    onChangeText={text => this.setState({ newpassword: text })}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                />
                <View class={styles.view}></View>

                <Button onPress={() => onSendPressed(this.state)} style={styles.button} title="Valider"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        width: '100%',
        marginTop: 12,
    },
    button: {
        marginTop: 12,
    },
    label: {
        color: theme.colors.secondary,
        width: '100%',
    },
    input: {
        backgroundColor: "#ffffff",
    },
    view: {
        height: 40
    }
});