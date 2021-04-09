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
  VictoryAxis,
} from 'victory-native';
import { pieDataFunc, typeValueWeek } from '../utilFunc';

function WeekScreen(props) {
  const [weekEntries, setWeekEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const pieData = pieDataFunc(weekEntries);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const barData = daysOfWeek.map(day => {
    const newEntry = {};
    newEntry.x = day;
    newEntry.y = typeValueWeek(weekEntries, day);
    return newEntry;
  });

  useEffect(() => {
    const entriesRef = firebase.firestore().collection('poopEntries');
    const userId = props.user.id;
    const startOfWeek = moment().startOf('week').toDate();

    entriesRef
      .where('userId', '==', userId)
      .where('date', '>', startOfWeek)
      .onSnapshot(
        querySnapshot => {
          const newEntries = [];
          querySnapshot.forEach(doc => {
            const entry = doc.data();
            entry.id = doc.id;
            newEntries.push(entry);
          });
          setWeekEntries(newEntries);
          setLoading(false);
        },
        error => {
          console.log(error);
        }
      );
  }, []);

  const screenStart = moment().startOf('week').format('ddd MMM DD');
  const screenEnd = moment().endOf('week').format('ddd MMM DD');

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ fontSize: 20 }}>Fetching Data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {!weekEntries.length ? (
          <View style={styles.screenView}>
            <Text style={styles.screenTitle}>No Data Entries</Text>
          </View>
        ) : (
          <View>
            <View style={styles.screenView}>
              <Text style={styles.screenTitle}>
                {screenStart} to {screenEnd}
              </Text>
            </View>
            <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
              <VictoryAxis
                label="Day of the Week"
                style={{
                  axisLabel: { padding: 32, fontSize: 15 },
                  tickLabels: { padding: 3 },
                }}
              />
              <VictoryAxis
                dependentAxis
                tickValues={[1, 2, 3, 4, 5, 6, 7]}
                label="Avg Type"
                style={{
                  axisLabel: { padding: 32, fontSize: 15 },
                  tickLabels: { padding: 3 },
                }}
              />
              <VictoryBar
                style={{ data: { fill: '#c43a31' } }}
                data={barData}
                domain={{ y: [1, 7] }}
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

export default React.memo(WeekScreen);
