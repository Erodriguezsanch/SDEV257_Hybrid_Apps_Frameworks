import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import styles from './styles';

export default function FilmDetails({ route }) {
  const { film } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('./assets/StarWars.png')} // Placeholder for poster image
        style={styles.posterImage}
      />

      {/* Film Title */}
      <Text style={styles.title}>{film.properties.title}</Text>

      {/* Film Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Director:</Text>
        <Text style={styles.text}>{film.properties.director}</Text>

        <Text style={styles.label}>Producer:</Text>
        <Text style={styles.text}>{film.properties.producer}</Text>

        <Text style={styles.label}>Release Date:</Text>
        <Text style={styles.text}>{film.properties.release_date}</Text>

        <Text style={styles.label}>Opening Crawl:</Text>
        <Text style={styles.crawl}>{film.properties.opening_crawl}</Text>
      </View>
    </ScrollView>
  );
}