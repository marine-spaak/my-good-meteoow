import PropTypes from 'prop-types';

import { View, Text, ActivityIndicator } from 'react-native';
import style from '../Home.style';

const HomeNow = ({ temp, loading }) => (
  <View style={style.homeSectionContainer}>
    <Text style={style.homeSectionTitle}>Météo actuelle</Text>
    <Text style={style.homeSectionText}>Température</Text>

    {loading
      ? (<ActivityIndicator />)
      : (
        <Text style={style.homeSectionText}>{temp}</Text>
      )}

  </View>
);

HomeNow.propTypes = {
  temp: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default HomeNow;
