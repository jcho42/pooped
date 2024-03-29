import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, FlatList } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../firebase/config';
import moment from 'moment';

const Item = ({ date, type }) => (
  <View style={styles.item}>
    <Text style={styles.entry}>
      {moment(date.toDate()).format('MM-DD-YYYY h:mm a')} Type {type}
    </Text>
  </View>
);

function TodayScreen(props) {
  const [dayEntries, setDayEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderItem = ({ item }) => <Item {...item} />;

  useEffect(() => {
    const entriesRef = firebase.firestore().collection('poopEntries');
    const userId = props.user.id;
    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();

    entriesRef
      .where('userId', '==', userId)
      .where('date', '>', startOfDay)
      .where('date', '<', endOfDay)
      .onSnapshot(
        querySnapshot => {
          const newEntries = [];
          querySnapshot.forEach(doc => {
            const entry = doc.data();
            entry.id = doc.id;
            newEntries.push(entry);
          });
          setDayEntries(newEntries);
          setLoading(false);
        },
        error => {
          console.log(error);
        }
      );
  }, []);

  const screenTitle = moment(new Date()).format('dddd');

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
        {!dayEntries.length ? (
          <View style={styles.screenView}>
            <Text style={styles.screenTitle}>No Data Entries</Text>
          </View>
        ) : (
          <View style={styles.screenView}>
            <Text style={styles.screenTitle}>{screenTitle}</Text>
            <FlatList
              data={dayEntries}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default React.memo(TodayScreen);
