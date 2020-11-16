import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../firebase/config';
import moment from 'moment';
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryTheme,
} from 'victory-native';
import { pieDataFunc, typeValueMonth } from '../utilFunc';

export default function MonthScreen(props) {
  const [monthEntries, setMonthEntries] = useState([]);

  const pieData = pieDataFunc(monthEntries);

  const daysOfMonth = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,
  ];
  const barData = daysOfMonth.map((day) => {
    const newEntry = {};
    newEntry.x = day;
    newEntry.y = typeValueMonth(monthEntries, day);
    return newEntry;
  });

  useEffect(() => {
    const entriesRef = firebase.firestore().collection('poopEntries');
    const userId = props.user.id;
    const startOfMonth = moment().startOf('month').toDate();

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

  const screenTitle = moment().format('MMMM');

  return (
    <SafeAreaView>
      <ScrollView>
        {!monthEntries.length ? (
          <View style={styles.screenView}>
            <Text style={styles.screenTitle}>No Data Entries</Text>
          </View>
        ) : (
          <View>
            <View style={styles.screenView}>
              <Text style={styles.screenTitle}>{screenTitle}</Text>
            </View>
            <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
              <VictoryBar
                style={{ data: { fill: '#c43a31' } }}
                data={barData}
              />
            </VictoryChart>
            <VictoryPie
              data={pieData}
              padding={100}
              colorScale="qualitative"
              labels={({ datum }) => `${datum.x}\n(${datum.percent}%)`}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
