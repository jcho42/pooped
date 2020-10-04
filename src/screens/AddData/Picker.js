import React from 'react';
import { Picker } from '@react-native-community/picker';

export default function PickerFunc (props) {
  const { type, setType } = props;
  return (
    <Picker
      selectedValue={type}
      style={{ height: 200, width: 300 }}
      onValueChange={(itemValue) => setType(itemValue)}
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
