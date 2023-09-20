import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

import { Home } from './src/components';
import style from './App.style';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={style.appContainer}>
      <Home />
    </SafeAreaView>
  </SafeAreaProvider>
);

export default App;
