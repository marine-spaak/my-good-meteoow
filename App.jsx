import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Home from './src/components/Home/Home';
import { Header } from './src/components';
import style from './App.style';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={style.appContainer}>
        <Header />
        <Home />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
