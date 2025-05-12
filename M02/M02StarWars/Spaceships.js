import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TextInput, Image } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Spaceships() {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://www.swapi.tech/api/starships')
      .then((res) => res.json())
      .then((json) => {
        setSpaceships(json.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching starships:', err);
        setLoading(false);
      });
  }, []);

  const handleSwipeLeft = (spaceship) => {
    navigation.navigate('SpaceshipDetails', { spaceship });
  };

  const filteredSpaceships = spaceships.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/StarWars.png')}
        style={{ width: 200, height: 80, resizeMode: 'contain', alignSelf: 'center', marginBottom: 20 }}
      />

      <TextInput
        style={styles.input}
        placeholder='Search Spaceships'
        value={searchText}
        onChangeText={setSearchText}
      />

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <ScrollView style={{ width: '100%' }}>
          {filteredSpaceships.length > 0 ? (
            filteredSpaceships.map((item) => (
              <GestureHandlerRootView key={item.uid}>
                <Swipeable
                  onSwipeableLeftOpen={() => handleSwipeLeft(item)}
                  renderLeftActions={() => (
                    <Animated.View style={{ backgroundColor: 'lightgrey', justifyContent: 'center', flex: 1 }} />
                  )}
                >
                  <Animated.View entering={FadeIn.duration(2000)}>
                    <Text style={styles.item}>{item.name}</Text>
                  </Animated.View>
                </Swipeable>
              </GestureHandlerRootView>
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No spaceships found.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}
