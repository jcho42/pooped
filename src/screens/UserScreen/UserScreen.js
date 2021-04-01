import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { logout } from '../utilFunc';
import { SafeAreaView } from 'react-native-safe-area-context';

function UserScreen(props) {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default React.memo(UserScreen);
