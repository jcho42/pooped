import React from 'react';
import { View, Image } from 'react-native';

export default function Icon() {
  return (
    <View>
      <Image
        source={require('../../assets/icon.png')}
        style={{
          width: 50,
          height: 50,
          marginLeft: 15,
        }}
      />
    </View>
  );
}
