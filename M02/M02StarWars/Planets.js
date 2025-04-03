import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';

export default function Planets ({  navigation }) {
    return (
        <View style={styles.container}>
            <Text>Planets Screen</Text>
            <Button title='Tatooine' />
            <Button title='Naboo' />
            <Button title='Coruscant' />
            <Button title='Mustafar' />  
        </View>
    );
};