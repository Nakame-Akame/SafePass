import React from 'react';

import {
  View
} from 'react-native';

import styles from '../styles/homeStyles';

export default function StrengthMeter({
  progress,
  color
}) {

  return (

    <View style={styles.meter}>

      <View
        style={{
          ...styles.meterFill,
          width: `${progress}%`,
          backgroundColor: color
        }}
      />

    </View>
  );
}