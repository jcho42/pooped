import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../firebase/config';
import moment from 'moment'
import { VictoryPie } from 'victory-native'

export default function YearScreen(props) {
  const [yearEntries, setYearEntries] = useState([]);

  const percentage = (type) => {
    const count = typeCount(type)
    return Math.round((count / yearEntries.length) * 100)
  }

  const typeCount = (type) => {
    return yearEntries.reduce((a,c) => {
      if (c.type === type) return a + 1
      return a
    }, 0)
  }

  const pieData = yearEntries.map(entry => {
    const newEntry = {}
    newEntry.x = `Type ${entry.type}`
    newEntry.y = typeCount(entry.type)
    newEntry.percent = percentage(entry.type)
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

  console.log('yearEntries --->', yearEntries)

  return (
    <SafeAreaView>
      <View>
        <Text>Year Screen</Text>
        <VictoryPie data={pieData} padding={100} colorScale="qualitative" labels={({datum}) => `${datum.x}\n(${datum.percent}%)`} />
      </View>
    </SafeAreaView>
  );
}
