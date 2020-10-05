import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, Text } from 'react-native';
import DateTime from './DateTime';
import Picker from './Picker';
import moment from 'moment';
import { firebase } from '../../firebase/config';

export default function AddData({route, navigation: { goBack }}) {
  const [date, setDate] = useState(moment().format('MM-DD-YYYY h:mm a'));
  const [type, setType] = useState('4');
  // const dateTime = moment(date, "MM-DD-YYYY h:mm a")
  // const dateTimeStr = moment(dateTime).format("h:mm a")
  // console.log('moment(date) ---->', dateTime)
  // console.log('moment(date) ---->', dateTimeStr)
  // console.log('type ---->', type)

  const addDataFireStore = () => {
    const userId = route.params.user.id
    const dateObj = moment(date, "MM-DD-YYYY h:mm a").toDate()
    const data = {userId, date: dateObj, type}
    const poopEntry = firebase.firestore().collection('poopEntries')
    poopEntry
      .add(data)
      .then(() => {
        goBack()
      })
      .catch(() => {
        alert('Access Denied!')
      })
  };

  return (
    <ScrollView>
      <DateTime date={date} setDate={setDate} />
      <Picker type={type} setType={setType} />
      <TouchableOpacity title="Add Data" onPress={addDataFireStore}>
        <Text>Add Data</Text>
      </TouchableOpacity>
      <Image
        style={{ width: 300, height: 800 }}
        source={require('../../../assets/bristol_stool_chart.jpg')}
      />
    </ScrollView>
  );
}
