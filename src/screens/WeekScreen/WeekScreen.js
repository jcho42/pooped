import React, { useState, useEffect } from 'react';
import { Text, ScrollView } from 'react-native';
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
import { pieDataFunc, typeValueWeek } from '../utilFunc';

export default function WeekScreen(props) {
  const [weekEntries, setWeekEntries] = useState([]);

  const pieData = pieDataFunc(weekEntries)

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const barData = daysOfWeek.map(day => {
    const newEntry = {}
    newEntry.x = day
    newEntry.y = typeValueWeek(weekEntries, day)
    return newEntry
  })

  useEffect(() => {
    const entriesRef = firebase.firestore().collection('poopEntries');
    const userId = props.user.id;
    const startOfWeek = moment().startOf('week').toDate();

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

  const screenStart = moment().startOf('week').format('ddd MMM DD');
  const screenEnd = moment().endOf('week').format('ddd MMM DD');

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>
          {screenStart} to {screenEnd}
        </Text>
        <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
          <VictoryBar style={{ data: { fill: '#c43a31' } }} data={barData} />
        </VictoryChart>
        <VictoryPie
          data={pieData}
          padding={100}
          colorScale="qualitative"
          labels={({ datum }) => `${datum.x}\n(${datum.percent}%)`}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
