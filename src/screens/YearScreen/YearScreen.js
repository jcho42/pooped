import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../firebase/config';
import moment from 'moment'
import { VictoryPie } from 'victory-native'
import { percentage, typeCount } from '../utilFunc'

export default function YearScreen(props) {
  const [yearEntries, setYearEntries] = useState([]);

  const pieData = yearEntries.map(entry => {
    const newEntry = {}
    newEntry.x = `Type ${entry.type}`
    newEntry.y = typeCount(yearEntries, entry.type)
    newEntry.percent = percentage(yearEntries, entry.type)
    return newEntry
  })

  useEffect(() => {
    const entriesRef = firebase.firestore().collection('poopEntries');
    const userId = props.user.id;
    const startOfYear = moment().startOf('year').toDate()

    entriesRef
      .where('userId', '==', userId)
      .where('date', '>', startOfYear)
      .onSnapshot(
        (querySnapshot) => {
          const newEntries = [];
          querySnapshot.forEach((doc) => {
            const entry = doc.data();
            entry.id = doc.id;
            newEntries.push(entry);
          });
          setYearEntries(newEntries);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const screenTitle = moment().format("YYYY")

  return (
    <SafeAreaView>
      <View>
        <Text>{screenTitle}</Text>
        <VictoryPie data={pieData} padding={100} colorScale="qualitative" labels={({datum}) => `${datum.x}\n(${datum.percent}%)`} />
      </View>
    </SafeAreaView>
  );
}
