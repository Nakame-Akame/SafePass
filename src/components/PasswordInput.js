import React from 'react';

import {
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';

import styles from '../styles/homeStyles';

export default function PasswordInput({
  password,
  setPassword,
  showPassword,
  setShowPassword
}) {

  return (

    <View style={styles.inputWrapper}>

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Escribe tu contraseña..."
        placeholderTextColor="#64748b"
        secureTextEntry={!showPassword}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity
        style={styles.eyeButton}
        onPress={() =>
          setShowPassword(!showPassword)
        }
      >

        <Text style={styles.eyeText}>

          {
            showPassword
              ? '🙈'
              : '👁️'
          }

        </Text>

      </TouchableOpacity>

    </View>
  );
}