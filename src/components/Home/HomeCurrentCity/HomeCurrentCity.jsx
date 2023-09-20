import PropTypes from 'prop-types';

import { View, Text, ActivityIndicator } from 'react-native';
import style from '../Home.style';

const HomeCurrentCity = ({ city, loading }) => (
  <View style={style.homeSectionContainer}>

    <Text style={style.homeSectionTitle}>Ville</Text>

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
