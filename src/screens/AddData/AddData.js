import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import DateTime from './DateTime';
import Picker from './Picker';
import { firebase } from '../../firebase/config';
import styles from './styles';

export default function AddData({ route, navigation: { goBack } }) {
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState('4');

  const addDataFireStore = () => {
    const userId = route.params.user.id;
    const data = { userId, date, type };
    const poopEntry = firebase.firestore().collection('poopEntries');
    poopEntry
      .add(data)
      .then(() => {
        goBack();
      })
      .catch(() => {
        alert('Access Denied!');
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <DateTime date={date} setDate={setDate} />
        <Picker type={type} setType={setType} />
        <TouchableOpacity
          style={styles.button}
          title="Add Data"
          onPress={addDataFireStore}
        >
          <Text>Add Data</Text>
        </TouchableOpacity>
        <Image
          style={{ width: 300, height: 800 }}
          source={require('../../../assets/bristol_stool_chart.jpg')}
        />
      </View>
    </ScrollView>
  );
}
