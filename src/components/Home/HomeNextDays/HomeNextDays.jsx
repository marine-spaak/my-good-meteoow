import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import style from '../Home.style';
import { WeatherCard } from '../..';

const HomeNextDays = ({ nextDaysForecastData }) => (
  <View style={style.homeSectionContainer}>
    <Text style={style.homeSectionTitle}>À venir</Text>
    <FlatList
      data={nextDaysForecastData}
      renderItem={({ item }) => (
        <WeatherCard
          date={item.dt_txt}
          weatherIcon={item.weather[0].icon}
          temperature={item.main.temp}
          himidity={item.main.humidity}
        />
      )}
      horizontal
    />
  </View>
);

HomeNextDays.propTypes = {
  nextDaysForecastData: PropTypes.array.isRequired,
};

export default HomeNextDays;
