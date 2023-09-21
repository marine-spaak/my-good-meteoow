import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Location from 'expo-location';
import PropTypes from 'prop-types';

import { ScrollView } from 'react-native';

import { HomeCurrentCity, HomeNow, HomeNextDays } from '..';
import style from './Home.style';

const Home = ({ temperature, setTemperature }) => {
  // TODO define APIkey as an environment variable
  const APIkey = 'fd398fa8f15a0f5c87e77b1a8b00e4e7';

  const [loading, setLoading] = useState(false);

  const [city, setCity] = useState('CURRENT CITY');

  const getWeatherFromApi = async (latitude, longitude) => {
    try {
      // Appel à l'API météo
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`,
      );

      console.log(response.data);
      setCity(response.data.name);
      setTemperature(response.data.main.temp);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const getPermissions = async () => {
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
      await getWeatherFromApi(latitude, longitude);
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
        temperature={temperature}
        loading={loading}
      />

      <HomeNextDays />
    </ScrollView>
  );
};

Home.propTypes = {
  temperature: PropTypes.number.isRequired,
  setTemperature: PropTypes.func.isRequired,
};

export default Home;
