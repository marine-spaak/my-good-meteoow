import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ToastManager, { Toast } from 'toastify-react-native';

import Home from './src/components/Home/Home';
import { Header } from './src/components';
import style from './App.style';

const App = () => {
  const showToasts = () => {
    Toast.success('Promised is resolved');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={style.appContainer}>
        <ToastManager />
        <Header />
        <Home />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
