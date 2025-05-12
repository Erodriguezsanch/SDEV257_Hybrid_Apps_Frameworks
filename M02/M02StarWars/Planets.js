import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TextInput, Image } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { FadeIn } from 'react-native-reanimated';
import styles from './styles';

export default function Planets({ navigation }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch('https://www.swapi.tech/api/planets')
      .then((res) => res.json())
      .then((json) => {
        setPlanets(json.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('error fetching planets', err);
        setLoading(false);
      });
  }, []);

  const handleSwipe = (planet) => {
    navigation.navigate('PlanetDetails', { planet });
  };

  // ✅ Filter planets based on searchText
  const filteredPlanets = planets.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/StarWars.png')}
        style={{ width: 200, height: 80, resizeMode: 'contain', alignSelf: 'center', marginBottom: 20, paddingTop: 20 }}
      />

      {/* Search */}
      <TextInput
        style={styles.input}
        placeholder='Search Planets'
        value={searchText}
        onChangeText={setSearchText}
      />

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <ScrollView style={{ width: '100%' }}>
          {filteredPlanets.length > 0 ? (
            filteredPlanets.map((item) => (
              <Swipeable
                key={item.uid}
                onSwipeableRightOpen={() => handleSwipe(item)}
              >
                <Animated.View entering={FadeIn.duration(2000)}>
                  <Text style={styles.item}>{item.name}</Text>
                </Animated.View>
              </Swipeable>
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No planets found.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}
