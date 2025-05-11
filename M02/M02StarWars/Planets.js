import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TextInput, Button, Modal } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import styles from './styles';

export default function Planets({ navigation }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemText, setSelectedItemText] = useState('');

  useEffect(() => {
    fetch('https://www.swapi.tech/api/planets')
      .then((res) => res.json())
      .then((json) => {
        setPlanets(json.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('error fetching starships', err);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    setModalVisible(true);
    setSelectedItemText(`Searching for: ${searchText}`);
  };

  const handleSwipe = (title) => {
    setSelectedItemText(title);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Search */}
      <TextInput
      style={styles.input}
      placeholder='Search Planets'
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
          {planets.map((item) => (
            <Swipeable
              key={item.uid}
              onSwipeableRightOpen={() => handleSwipe(item.name)}
            >
              <Text style={styles.item}>{item.name}</Text>
            </Swipeable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}