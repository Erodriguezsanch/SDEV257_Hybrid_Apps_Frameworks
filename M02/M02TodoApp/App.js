 import React from 'react';
 import { Text, View } from 'react-native';
 import styles from './styles';
 import Task from './components/Task';


export default function App() {
  return (
    <View style={styles.container}>
    <View style={styles.tasksWrapper}>
      <Text style={styles.sectionTitle}>Today's Tasks</Text>

      <View style={styles.items}>
        {/* Where the tasks will go*/}
        <Task text="First Task" />
      </View>

    </View>
    </View>
  );
}