import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';

export default function Planets({ navigation }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.swapi.tech/api/planets')
      .then((res) => res.json())
      .then((json) => {
        setPlanets(json.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching planets:', err);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={planets}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
        )}
        />
      )}
    </View>
  );
}