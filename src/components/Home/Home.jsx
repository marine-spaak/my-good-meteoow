import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Location from 'expo-location';
import { Toast } from 'toastify-react-native';

import { ScrollView } from 'react-native';
import style from './Home.style';

import { HomeCurrentCity, HomeNow, HomeNextDays } from '..';

const Home = () => {
  // TODO define APIkey as an environment variable
  const APIkey = 'fd398fa8f15a0f5c87e77b1a8b00e4e7';
  const [loading, setLoading] = useState(false);

  const [city, setCity] = useState('CURRENT CITY');
  const [temp, setTemp] = useState(0);

  const getWeatherFromApi = async (latitude, longitude) => {
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

  // Renvoie true si la T° est au-dessus de 20°
  const sendToastCommentingTemperature = (temperature) => {
    if (temperature < 20) {
      Toast.info('Il fait froid');
    } else {
      Toast.info('Il fait bon');
    }
  };

  useEffect(() => {
    // J'appelle la fonction que je viens de créer :
    getPermissions();
  }, []);

  // Dans un autre useEffect, je surveille la température
  // J'envoie une notification commentant la température :
  // <20° --> "Il fait froid" / >20° "Il fait bon"
  useEffect(() => {
    sendToastCommentingTemperature(temp);
  }, [temp]);

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

export default Home;
