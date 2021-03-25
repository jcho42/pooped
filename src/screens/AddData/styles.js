import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  pickerContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 20,
    height: 48,
    width: 100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePicker: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'grey',
  },
  datePickerText: {
    fontSize: 20,
    marginLeft: 10,
  },
  typePicker: {
    marginTop: 10,
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'grey',
    color: 'black',
    fontSize: 20,
  },
  itemStyle: {
    fontSize: 30,
  },
});
