import React from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import styles from './styles';

export default function DateTime(props) {
  const { date, setDate } = props;
  return (
    <View >
      <View>
        <DatePicker
          style={{ width: 300 }}
          date={date}
          mode="datetime"
          format="MM-DD-YYYY h:mm a"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => setDate(date)}
        />
      </View>
    </View>
  );
}
