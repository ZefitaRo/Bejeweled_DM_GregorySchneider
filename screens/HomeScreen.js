import React from 'react';
import Header from '../Components/Header';
import { View, StyleSheet, Button } from 'react-native';


export default class HomeScreen extends React.Component {
    render(){
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Header title="HomePage"/>
                <Button
                    onPress={() => navigate('Loginscreen')}
                    title="Connexion"/>
                <View style={styles.espace}></View>
                <Button
                    onPress={() => navigate('Registerscreen')}
                    title="Inscription"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    espace: {
        height: 20,
    }
});