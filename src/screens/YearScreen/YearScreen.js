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
import { pieDataFunc, typeValueYear } from '../utilFunc';

function YearScreen(props) {
  const [yearEntries, setYearEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const pieData = pieDataFunc(yearEntries);

  const monthOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const barData = monthOfYear.map(month => {
    const newEntry = {};
    newEntry.x = month;
    newEntry.y = typeValueYear(yearEntries, month);
    return newEntry;
  });

  useEffect(() => {
    const entriesRef = firebase.firestore().collection('poopEntries');
    const userId = props.user.id;
    const startOfYear = moment().startOf('year').toDate();

    entriesRef
      .where('userId', '==', userId)
      .where('date', '>', startOfYear)
      .onSnapshot(
        querySnapshot => {
          const newEntries = [];
          querySnapshot.forEach(doc => {
            const entry = doc.data();
            entry.id = doc.id;
            newEntries.push(entry);
          });
          setYearEntries(newEntries);
          setLoading(false);
        },
        error => {
          console.log(error);
        }
      );
  }, []);

  const screenTitle = moment().format('YYYY');

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
        {!yearEntries.length ? (
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

export default React.memo(YearScreen);
