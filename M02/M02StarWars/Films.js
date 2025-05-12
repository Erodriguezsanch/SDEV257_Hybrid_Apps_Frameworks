import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TextInput, Image } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://www.swapi.tech/api/films')
      .then((res) => res.json())
      .then((json) => {
        setFilms(json.result || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching films:", err);
        setLoading(false);
      });
  }, []);

  const handleSwipeLeft = (film) => {
    navigation.navigate('FilmDetails', { film });
  };

  
  const filteredFilms = films.filter((film) =>
    film.properties.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/StarWars.png')}
        style={{ width: 200, height: 80, resizeMode: 'contain', alignSelf: 'center', marginBottom: 20, paddingTop: 20 }}
      />

      {/* Search input */}
      <TextInput
        style={styles.input}
        placeholder='Search Films'
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Loading indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <ScrollView style={{ width: '100%' }}>
          {filteredFilms.length > 0 ? (
            filteredFilms.map((item) => (
              <GestureHandlerRootView key={item.uid}>
                <Swipeable
                  onSwipeableLeftOpen={() => handleSwipeLeft(item)}
                  renderLeftActions={() => (
                    <Animated.View style={{ backgroundColor: 'lightgrey', justifyContent: 'center', flex: 1 }} />
                  )}
                >
                  <Animated.View entering={FadeIn.duration(2000)}>
                    <Text style={styles.item}>{item.properties.title}</Text>
                  </Animated.View>
                </Swipeable>
              </GestureHandlerRootView>
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No films found.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}