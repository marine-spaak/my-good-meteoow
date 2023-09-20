import { View, Text } from 'react-native';
import style from '../Home.style';

const HomeCurrentCity = () => (
  <View style={style.homeSectionContainer}>
    <Text style={style.homeSectionText}>HomeCurrentCity</Text>
    <Text style={style.homeSectionText}>La ville actuelle est :</Text>
    <Text style={style.homeSectionText}>CURRENT CITY</Text>
  </View>
);

export default HomeCurrentCity;
