import { StyleSheet } from 'react-native';

import { COLORS, SIZES } from '../../../constants';

const style = StyleSheet.create({

  cardContainer: {
    backgroundColor: COLORS.lightBlue,
    padding: SIZES.large,
    alignItems: 'center',
    borderRadius: SIZES.medium,
    marginRight: SIZES.medium,
  },

  cardImage: {
    width: 100,
    height: 100,
  },

});

export default style;
