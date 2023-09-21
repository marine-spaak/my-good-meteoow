import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { useState, useEffect, useRef } from 'react';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Text, View, Button, Platform, Linking, Alert,
} from 'react-native';
// import registerNNPushToken from 'native-notify';

import { Header } from './src/components';
import Home from './src/components/Home/Home';

import style from './src/components/Home/Home.style';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  // registerNNPushToken(12343, 'QL5K0bhCGVorcMX8cD0buF');

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [temperature, setTemperature] = useState(-900);

  async function schedulePushNotification() {
    if (temperature !== -900) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: (temperature > 20) ? '🙂 Il fait bon !' : '🥶 Il fait frais !',
          body: (temperature > 20) ? 'La température est supérieure à 20°.' : 'La température est inférieure à 20°.',
        },
        trigger: { seconds: 2 },
      });
    }
  }

  async function registerForPushNotificationsAsync() {
    let token;
    console.log('token at start', token);
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert(
          'No Notification Permission',
          'please goto setting and on notification permission manual',
          [
            { text: 'cancel', onPress: () => console.log('cancel') },
            { text: 'Allow', onPress: () => Linking.openURL('app-settings:') },
          ],
          { cancelable: false },
        );
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  useEffect(() => {
    schedulePushNotification();
  }, [temperature]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={style.appContainer}>
        <Header />
        <Home
          temperature={temperature}
          setTemperature={setTemperature}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
