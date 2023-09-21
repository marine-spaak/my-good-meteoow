import { View, Text } from 'react-native';

import style from '../Home.style';

const HomeNextDays = () => (
  <View style={style.homeSectionContainer}>
    <Text style={style.homeSectionTitle}>Prochains jours</Text>
    <Text style={style.homeSectionText}>À compléter</Text>
  </View>
);

export default HomeNextDays;
