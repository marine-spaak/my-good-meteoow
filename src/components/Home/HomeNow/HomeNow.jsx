import PropTypes from 'prop-types';

import { View, Text } from 'react-native';
import style from '../Home.style';

const HomeNow = ({ temp }) => (
  <View style={style.homeSectionContainer}>
    <Text style={style.homeSectionTitle}>Météo actuelle</Text>
    <Text style={style.homeSectionText}>Température</Text>
    <Text style={style.homeSectionText}>{temp}</Text>
  </View>
);

HomeNow.propTypes = {
  temp: PropTypes.number.isRequired,
};

export default HomeNow;
