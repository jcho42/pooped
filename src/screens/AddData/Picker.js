import React from 'react';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';

export default function PickerFunc({ type, setType }) {
  return (
    <Picker
      selectedValue={type}
      style={styles.typePicker}
      onValueChange={itemValue => setType(itemValue)}
    >
      <Picker.Item label="Type 1" value="1" />
      <Picker.Item label="Type 2" value="2" />
      <Picker.Item label="Type 3" value="3" />
      <Picker.Item label="Type 4" value="4" />
      <Picker.Item label="Type 5" value="5" />
      <Picker.Item label="Type 6" value="6" />
      <Picker.Item label="Type 7" value="7" />
    </Picker>
  );
}
