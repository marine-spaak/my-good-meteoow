import { View, Text, TouchableOpacity } from 'react-native';
import { Toast } from 'toastify-react-native';

import style from '../Home.style';

const HomeNextDays = () => (
  <View style={style.homeSectionContainer}>
    <Text style={style.homeSectionTitle}>Prochains jours</Text>
    <Text style={style.homeSectionText}>À compléter</Text>
    <TouchableOpacity
      onPress={() => Toast.info('Il pleut', 'bottom')}
    >
      <Text>Afficher un toast !</Text>
    </TouchableOpacity>
  </View>
);

export default HomeNextDays;
