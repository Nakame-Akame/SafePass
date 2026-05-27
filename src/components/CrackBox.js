import React from 'react';

import {
  View,
  Text
} from 'react-native';

import styles from '../styles/homeStyles';

export default function CrackBox({
  crackTime
}) {

  return (

    <View style={styles.crackBox}>

      <Text style={styles.crackLabel}>

        ⏳ Tiempo estimado de vulneración

      </Text>

      <Text style={styles.crackTime}>

        {crackTime}

      </Text>

    </View>
  );
}