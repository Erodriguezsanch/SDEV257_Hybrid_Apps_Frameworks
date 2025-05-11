import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';

export default function Spaceships({ navigation }) {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.swapi.tech/api/starships/')
      .then((res) => res.json())
      .then((json) => {
        setSpaceships(json.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('error fetching starships', err);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={spaceships}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
        )}
        />
      )}
    </View>
  );
}