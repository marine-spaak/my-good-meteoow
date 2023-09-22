// Imports nécessaires pour faire tourner l'app
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Accès à la localisation de l'appareil
import * as Location from 'expo-location';

// Composants basiques, sous-composants et style
import { ScrollView } from 'react-native';
import { HomeCurrentCity, HomeNow, HomeNextDays } from '..';
import style from './Home.style';

const Home = ({ temperature, setTemperature }) => {
  // TODO define APIkey as an environment variable
  const APIkey = 'fd398fa8f15a0f5c87e77b1a8b00e4e7';

  // Le "loading" permet d'afficher un chargement le temps d'avoir la réponse de l'API
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('CURRENT CITY');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [humidity, setHumidity] = useState(-900);

  const getWeatherFromApi = async (latitude, longitude) => {
    try {
      // Appel à l'API météo
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`,
      );
      console.log('data', response.data);
      setCity(response.data.name);
      setTemperature(response.data.main.temp);
      setWeatherIcon(response.data.weather[0].icon);
      setHumidity(response.data.main.humidity);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getPermissions = async () => {
    try {
      setLoading(true);
      const status = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Please grant location permissions');
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
        weatherIcon={weatherIcon}
        humidity={humidity}
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
