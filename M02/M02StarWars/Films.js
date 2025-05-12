import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TextInput, Button, Modal, Image } from 'react-native';
import Animated, { FadeIn, Easing, withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { GestureDetector, GestureHandlerRootView, GestureHandler, Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemText, setSelectedItemText] = useState('');
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

  const handleSearch = () => {
    setModalVisible(true);
    setSelectedItemText(`Searching for: ${searchText}`);
  };

  const handleSwipeLeft = (film) => {
    navigation.navigate('FilmDetails', { film });
  };

  const handleSwipe = (title) => {
    setSelectedItemText(title);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/StarWars.png')}
        style={{ width: 200, height: 80, resizeMode: 'contain', alignSelf: 'center', marginBottom: 20, paddingTop: 20 }}
      />

      {/* Search */}
      <TextInput
        style={styles.input}
        placeholder='Search Films'
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title='Search' onPress={handleSearch} />

      {/* Modal */}
      <Modal 
        visible={modalVisible}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{selectedItemText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <ScrollView style={{ width: '100%' }}>
          {films.map((item) => (
            <GestureHandlerRootView key={item.uid}>
              <Swipeable
                onSwipeableLeftOpen={() => handleSwipeLeft(item)}
                renderLeftActions={() => (
                  <Animated.View style={{ backgroundColor: 'lightgrey', justifyContent: 'center', flex: 1 }}>
                  </Animated.View>
                )}
              >
                <Animated.View entering={FadeIn.duration(2000)}>
                  <Text style={styles.item}>{item.properties.title}</Text>
                </Animated.View>
              </Swipeable>
            </GestureHandlerRootView>
          ))}
        </ScrollView>
      )}
    </View>
  );
}