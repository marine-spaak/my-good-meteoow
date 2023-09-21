import PropTypes from 'prop-types';

import { View, Text, ActivityIndicator } from 'react-native';
import style from '../Home.style';

const HomeNow = ({ temperature, loading }) => (
  <View style={style.homeSectionContainer}>
    <Text style={style.homeSectionTitle}>Météo actuelle</Text>
    <Text style={style.homeSectionText}>Température</Text>

    {loading
      ? (<ActivityIndicator />)
      : (
        <Text style={style.homeSectionText}>{temperature}</Text>
      )}

  </View>
);

HomeNow.propTypes = {
  temperature: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default HomeNow;
