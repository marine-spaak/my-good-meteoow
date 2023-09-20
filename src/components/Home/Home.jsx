import { ScrollView, Text } from 'react-native';
import style from './Home.style';

import { HomeCurrentCity, HomeNow, HomeNextDays } from '../../components';

const Home = () => (
  <ScrollView>
    <HomeCurrentCity />
    <HomeNow />
    <HomeNextDays />
  </ScrollView>
);

export default Home;
