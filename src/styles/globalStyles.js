import {
  StyleSheet
} from 'react-native';

import colors from './colors';

const globalStyles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor:
        colors.background
    },

    centered: {
      justifyContent: 'center',
      alignItems: 'center'
    },

    title: {
      color: colors.white,
      fontSize: 32,
      fontWeight: '800'
    },

    text: {
      color: colors.text,
      fontSize: 15
    }
  });

export default globalStyles;