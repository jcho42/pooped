import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { logout } from '../utilFunc';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function YearScreen(props) {
  return (
    <SafeAreaView>
      <View>
        <Text>Year Screen</Text>
        <TouchableOpacity style={styles.button} onPress={() => logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
