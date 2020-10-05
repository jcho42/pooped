import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../firebase/config';
import moment from 'moment';
import { VictoryPie } from 'victory-native';

export default function WeekScreen(props) {
  const [weekEntries, setWeekEntries] = useState([]);

  const typeCount = (type) => {
    return weekEntries.reduce((a, c) => {
      if (c.type === type) return a + 1;
      return a;
    }, 0);
  };

  const pieData = weekEntries.map((entry) => {
    const newEntry = {};
    newEntry.x = `Type ${entry.type}`;
    newEntry.y = typeCount(entry.type);
    return newEntry;
  });

  useEffect(() => {
    const entriesRef = firebase.firestore().collection('poopEntries');
    const userId = props.user.id;
    const startOfWeek = moment().startOf('week').toDate();
    console.log('startOfWeek ---->', startOfWeek);

    entriesRef
      .where('userId', '==', userId)
      .where('date', '>', startOfWeek)
      .onSnapshot(
        (querySnapshot) => {
          const newEntries = [];
          querySnapshot.forEach((doc) => {
            const entry = doc.data();
            entry.id = doc.id;
            newEntries.push(entry);
          });
          setWeekEntries(newEntries);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  console.log('weekEntries ---->', weekEntries);

  return (
    <SafeAreaView>
      <View>
        <Text>Week Screen</Text>
        <VictoryPie data={pieData} padding={100} colorScale="qualitative" />
      </View>
    </SafeAreaView>
  );
}
