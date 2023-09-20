import { StyleSheet } from 'react-native';

import { COLORS, SIZES } from '../../../constants';

const style = StyleSheet.create({

  headerContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.large,
    alignItems: 'center',
  },

  logo: {
    height: 100,
    width: 300,
    resizeMode: 'contain',
  },

});

export default style;
