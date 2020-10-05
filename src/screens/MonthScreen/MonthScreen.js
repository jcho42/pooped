import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../firebase/config';
import moment from 'moment'
import { VictoryPie } from 'victory-native'

export default function MonthScreen(props) {
  const [monthEntries, setMonthEntries] = useState([]);

  const typeCount = (type) => {
    return monthEntries.reduce((a,c) => {
      if (c.type === type) return a + 1
      return a
    }, 0)
  }

  const pieData = monthEntries.map(entry => {
    const newEntry = {}
    newEntry.x = `Type ${entry.type}`
    newEntry.y = typeCount(entry.type)
    return newEntry
  })

  useEffect(() => {
    const entriesRef = firebase.firestore().collection('poopEntries');
    const userId = props.user.id;
    const startOfMonth = moment().startOf('month').toDate()

    entriesRef
      .where('userId', '==', userId)
      .where('date', '>', startOfMonth)
      .onSnapshot(
        (querySnapshot) => {
          const newEntries = [];
          querySnapshot.forEach((doc) => {
            const entry = doc.data();
            entry.id = doc.id;
            newEntries.push(entry);
          });
          setMonthEntries(newEntries);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  console.log('monthEntries --->', monthEntries)

  return (
    <SafeAreaView>
      <View>
        <Text>Month Screen</Text>
        <VictoryPie data={pieData} padding={100} colorScale="qualitative" />
      </View>
    </SafeAreaView>
  );
}
