import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';

export default function Films({ Navigation }) {
    return (
        <View style={styles.container}>
            <Text>Films Screen</Text>
            <Button title='The Phantom Menace' />
            <Button title='Attack of the Clones' />
            <Button title='Revenge of the Sith' />
            <Button title='The Force Awakens' />
        </View>
    );
};