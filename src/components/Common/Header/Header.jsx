import { View, Text, Image } from 'react-native';
import style from './Header.style';

import { images } from '../../../constants';

const Header = () => (
  <View style={style.headerContainer}>
    <Image
      source={images.logo}
      style={style.logo}
    />
  </View>
);

export default Header;
