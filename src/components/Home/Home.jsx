import { useEffect, useState } from 'react';
import axios from 'axios';

import { ScrollView } from 'react-native';
import style from './Home.style';

import { HomeCurrentCity, HomeNow, HomeNextDays } from '..';

const Home = () => {
  const lat = 47.218371;
  const lon = -1.553621;
  const APIkey = 'fd398fa8f15a0f5c87e77b1a8b00e4e7';
  const [city, setCity] = useState('CURRENT CITY');
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`,
    ).then((response) => {
      console.log(response.data);
      setCity(response.data.name);
      setTemp(response.data.main.temp);
    });
  }, []);

  return (
    <ScrollView>
      <HomeCurrentCity
        city={city}
      />
      <HomeNow
        temp={temp}
      />
      <HomeNextDays />
    </ScrollView>
  );
};

export default Home;
