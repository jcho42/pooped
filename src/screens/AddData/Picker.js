import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from './styles';
import { FontAwesome } from '@expo/vector-icons';

export default function Picker({ type, setType }) {
  return (
    <View style={styles.pickerContainer}>
      <RNPickerSelect
        value={type}
        style={{
          inputAndroid: styles.typePicker,
          iconContainer: {
            top: 30,
            right: 20,
          },
        }}
        useNativeAndroidPickerStyle={false}
        onValueChange={value => setType(value)}
        placeholder={{}}
        Icon={() => <FontAwesome name="caret-down" size={32} color="black" />}
        items={[
          { label: '    Type 1', value: '1' },
          { label: '    Type 2', value: '2' },
          { label: '    Type 3', value: '3' },
          { label: '    Type 4', value: '4' },
          { label: '    Type 5', value: '5' },
          { label: '    Type 6', value: '6' },
          { label: '    Type 7', value: '7' },
        ]}
      />
    </View>
  );
}
