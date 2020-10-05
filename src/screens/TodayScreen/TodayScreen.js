import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { logout } from '../utilFunc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../firebase/config'

export default function TodayScreen(props) {
  const [todayEntries, setTodayEntries] = useState([])

  useEffect(() => {
    const entriesRef = firebase.firestore().collection('poopEntries')
    const userId = props.user.id
    let midnight = new Date()
    midnight.setHours(0,0,0,0)

    entriesRef
      .where('userId', '==', userId)
      .where('date', '>', midnight)
      .onSnapshot(querySnapshot => {
        console.log('quertySnapshot ---->', querySnapshot)
      })
  })

  return (
    <SafeAreaView>
      <View>
        <Text>Today Screen</Text>

      </View>
    </SafeAreaView>
  );
}
