import PropTypes from 'prop-types';

import { View, Text } from 'react-native';
import style from '../Home.style';

const HomeCurrentCity = ({ city }) => (
  <View style={style.homeSectionContainer}>
    <Text style={style.homeSectionTitle}>Ville</Text>
    <Text style={style.homeSectionText}>{city}</Text>
  </View>
);

HomeCurrentCity.propTypes = {
  city: PropTypes.string.isRequired,
};

export default HomeCurrentCity;
