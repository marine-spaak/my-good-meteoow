import { StyleSheet } from 'react-native';

import { COLORS, SIZES } from '../../constants';

const style = StyleSheet.create({

  homeSectionContainer: {
    backgroundColor: COLORS.darkBlue,
    padding: SIZES.medium,
    alignItems: 'center',
    marginBottom: SIZES.medium,
  },

  homeSectionText: {
    color: COLORS.white,
  },

});

export default style;
