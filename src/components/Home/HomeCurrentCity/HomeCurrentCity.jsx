import PropTypes from 'prop-types';

import { Entypo } from '@expo/vector-icons';
import { View, Text, ActivityIndicator } from 'react-native';
import style from '../Home.style';
import { COLORS, SIZES } from '../../../constants';

const HomeCurrentCity = ({ city, loading }) => (
  <View style={style.homeSectionContainer}>

    <Text style={style.homeSectionTitle}>
      <Entypo name="location" size={24} color={COLORS.lightBlue} style={{ padding: SIZES.medium }} />
      Ville
    </Text>

    {loading
      ? (<ActivityIndicator />)
      : (
        <Text style={style.homeSectionText}>{city}</Text>
      )}

  </View>
);

HomeCurrentCity.propTypes = {
  city: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default HomeCurrentCity;
