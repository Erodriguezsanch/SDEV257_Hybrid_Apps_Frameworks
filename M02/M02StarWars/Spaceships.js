import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';

export default function Spaceships({ Navigation }) {
    return (
        <View style={styles.container}>
            <Text>Spaceships Screen</Text>
            <Button title='Star Destroyer' />
            <Button title='Razor Crest' />
            <Button title='Death Star' />
            <Button title='A-Wing' />
        </View>
    );
};