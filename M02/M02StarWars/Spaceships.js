import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, Button, Modal } from 'react-native';
import styles from './styles';

export default function Spaceships({ navigation }) {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleSearch = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      
      {/* Search */}
      <TextInput
      style={styles.input}
      placeholder='Search Spaceships'
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
            <Text>Searching for: {searchText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

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