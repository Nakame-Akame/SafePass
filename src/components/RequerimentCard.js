import React from 'react';

import {
  View,
  Text
} from 'react-native';

import styles from '../styles/homeStyles';

export default function RequirementCard({
  text
}) {

  return (

    <View style={styles.requirement}>

      <Text style={styles.requirementText}>

        {text}

      </Text>

    </View>
  );
}