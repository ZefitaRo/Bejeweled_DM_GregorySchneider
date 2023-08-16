import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Button} from 'react-native';
import Header from '../Components/Header';
import {
    pseudoValidator,
    passwordValidator,
} from '../core/utils';
import { connect } from 'react-redux'

class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        //initialise les states
        this.state = {
            pseudo: "",
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

    onSignUpPressed (){
        console.log("click");
        console.log(this.props)
        const pseudoError = pseudoValidator(this.state.pseudo);
        const passwordError = passwordValidator(this.state.password);
        if (passwordError || pseudoError) {
            this.alerte()
            return;
        } else {
            const action = { type: "ADD_USER", value: {pseudo: this.state.pseudo, password: this.state.password} }
            this.props.dispatch(action)
            console.log(this.props)
            this.props.navigation.navigate('Loginscreen')
        }
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Header title="Inscription"/>
                <TextInput
                    label="Pseudo"
                    style={{ height: 40, borderColor: 'gray',  borderWidth: 1, margin: 10}}
                    returnKeyType="next"
                    value={this.state.pseudo}
                    onChangeText={text => this.setState({ pseudo: text })}
                />

                <View class={styles.view}></View>

                <TextInput
                    label="Mot de passe"
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                    returnKeyType="done"
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry
                />
                <View class={styles.view}></View>
                <Button onPress={() => this.onSignUpPressed() } title="Inscription" style={styles.button}/>
                <View style={styles.row}>
                    <Text style={styles.label}>Déja inscrit ? </Text>
                    <TouchableOpacity onPress={() => navigate('Loginscreen')}>
                        <Text style={styles.link}>Connectez-vous</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    label: {
        color: '#600EE6',
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: '#600EE6',
    },
    input: {
        backgroundColor: "#ffffff",
    },
    view: {
        height: 40
    }
});
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(RegisterScreen)