import React from 'react';

import {
  View,
  Text
} from 'react-native';

import styles from '../styles/homeStyles';

export default function TipsBox({
  tips
}) {

  if (tips.length === 0)
    return null;

  return (

    <View style={styles.tipsBox}>

      <Text style={styles.tipsTitle}>

        Recomendaciones de seguridad

      </Text>

      {
        tips.map((tip, index) => (

          <Text
            key={index}
            style={styles.tip}
          >

            ⚠️ {tip}

          </Text>
        ))
      }

    </View>
  );
}