import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';

import { ScrollView } from 'react-native';
import style from './Home.style';

import { HomeCurrentCity, HomeNow, HomeNextDays } from '..';

const Home = ({ temp, setTemp }) => {
  // TODO define APIkey as an environment variable
  const APIkey = 'fd398fa8f15a0f5c87e77b1a8b00e4e7';
  const [loading, setLoading] = useState(false);

  const [city, setCity] = useState('CURRENT CITY');

  const getWeatherFromApi = async (latitude, longitude) => {
    console.log('appel de getWeatherFromApi');
    try {
      // Appel à l'API météo
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`,
      );

      console.log(response.data);
      setCity(response.data.name);
      setTemp(response.data.main.temp);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const getPermissions = async () => {
    console.log('appel de getPermissions');
    try {
      setLoading(true);
      const status = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Please grant location permissions');
      }

      // Obtention de la position actuelle
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Appel de la méthode getWeatherFromApi avec les bonnes coordonnées
      console.log('avant l appel de getWeather from Api');
      await getWeatherFromApi(latitude, longitude);
      console.log('après l appel de getWeather from Api');
    } catch (error) {
      console.error('Error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // J'appelle la fonction que je viens de créer :
    getPermissions();
  }, []);

  return (
    <ScrollView>

      <HomeCurrentCity
        city={city}
        loading={loading}
      />

      <HomeNow
        temp={temp}
        loading={loading}
      />

      <HomeNextDays />
    </ScrollView>
  );
};

Home.propTypes = {
  temp: PropTypes.number.isRequired,
  setTemp: PropTypes.func.isRequired,
};

export default Home;
