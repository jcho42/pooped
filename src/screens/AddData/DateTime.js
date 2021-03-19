import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import styles from './styles';
import { FontAwesome } from '@expo/vector-icons';

export default function DateTime({ date, setDate }) {
  const [isVisible, setIsVisible] = useState(false);

  const showDatePicker = () => setIsVisible(true);
  const hideDatePicker = () => setIsVisible(false);
  const handleConfirm = date => {
    setDate(moment(date).format('MM-DD-YYYY h:mm a'));
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity style={styles.datePicker} onPress={showDatePicker}>
        <FontAwesome name="calendar" size={24} color="black" />
        <Text style={styles.datePickerText}>{date}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
