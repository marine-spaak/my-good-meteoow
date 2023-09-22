import PropTypes from 'prop-types';

import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { View, Text, Image } from 'react-native';
import style from './WeatherCard.style';
import WeatherIcon from '../../../assets/images/logo.jpg';

const WeatherCard = ({
  date, weatherIcon, temperature, humidity,
}) => (
  <View style={style.cardContainer}>
    { (date !== '')
      ? (
        <View style={{ alignItems: 'center' }}>
          <Feather name="calendar" size={24} color="black" />
          <Text style={style.homeSectionText}>{date}</Text>
        </View>
      )
      : <View />}

    <Image
      source={{
        uri: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`,
      }}
      style={style.cardImage}
    />
    <Text style={style.homeSectionText}>
      <MaterialCommunityIcons name="temperature-celsius" size={24} color="black" /> {temperature}
    </Text>
    <Text style={style.homeSectionText}>
      <Ionicons name="water" size={24} color="black" /> {humidity}%
    </Text>
  </View>
);

WeatherCard.propTypes = {
  date: PropTypes.string.isRequired,
  weatherIcon: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
};

export default WeatherCard;
