import React from 'react';
import { View, Image } from 'react-native';

export default function Icon({ viewStyles, iconStyles }) {
  return (
    <View style={viewStyles}>
      <Image source={require('../../assets/icon.png')} style={iconStyles} />
    </View>
  );
}
