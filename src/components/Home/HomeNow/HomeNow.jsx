import PropTypes from 'prop-types';

import { View, Text, ActivityIndicator } from 'react-native';
import style from '../Home.style';
import WeatherCard from '../../Common/WeatherCard/WeatherCard';

const HomeNow = ({ temperature, loading, weatherIcon, humidity }) => (
  <View style={style.homeSectionContainer}>
    <Text style={style.homeSectionTitle}>Météo actuelle</Text>
    {loading
      ? (<ActivityIndicator />)
      : (
        <View style={style.homeSectionText}>
          <WeatherCard
            weatherIcon={weatherIcon}
            temperature={temperature}
            humidity={humidity}
          />
        </View>
      )}

  </View>
);

HomeNow.propTypes = {
  loading: PropTypes.bool.isRequired,
  temperature: PropTypes.number.isRequired,
  weatherIcon: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
};

export default HomeNow;
