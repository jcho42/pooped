import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../firebase/config';
import moment from 'moment'
import { VictoryPie } from 'victory-native'
import { percentage, typeCount } from '../utilFunc'

export default function MonthScreen(props) {
  const [monthEntries, setMonthEntries] = useState([]);

  const pieData = monthEntries.map(entry => {
    const newEntry = {}
    newEntry.x = `Type ${entry.type}`
    newEntry.y = typeCount(monthEntries, entry.type)
    newEntry.percent = percentage(monthEntries, entry.type)
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

  const screenTitle = moment().format("MMMM")

  return (
    <SafeAreaView>
      <View>
        <Text>{screenTitle}</Text>
        <VictoryPie data={pieData} padding={100} colorScale="qualitative" labels={({datum}) => `${datum.x}\n(${datum.percent}%)`} />
      </View>
    </SafeAreaView>
  );
}
