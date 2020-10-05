import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../firebase/config';
import moment from 'moment'

export default function TodayScreen(props) {
  const [dayEntries, setDayEntries] = useState([]);

  useEffect(() => {
    const entriesRef = firebase.firestore().collection('poopEntries');
    const userId = props.user.id;
    const startOfDay = moment().startOf('day').toDate()

    entriesRef
      .where('userId', '==', userId)
      .where('date', '>', startOfDay)
      .onSnapshot(
        (querySnapshot) => {
          const newEntries = [];
          querySnapshot.forEach((doc) => {
            const entry = doc.data();
            entry.id = doc.id;
            newEntries.push(entry);
          });
          setDayEntries(newEntries);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  console.log('dayEntries --->', dayEntries)

  return (
    <SafeAreaView>
      <View>
        <Text>Today Screen</Text>
      </View>
    </SafeAreaView>
  );
}
