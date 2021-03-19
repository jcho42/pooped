import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 16,
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
    margin: 10,
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  datePickerText: {
    fontSize: 20,
    marginLeft: 10,
  },
  typePicker: {
    height: 100,
    width: 300,
    backgroundColor: 'white',
  },
});
