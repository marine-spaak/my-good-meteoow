// Imports nécessaires pour faire fonctionner les notifications
// /!\ Attention à la commande 'eas build' parfois nécessaire
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

// Imports classiques pour faire tourner l'app
import { useState, useEffect, useRef } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Platform, Linking, Alert } from 'react-native';

// Sous-composants et style
import { Header } from './src/components';
import Home from './src/components/Home/Home';
import style from './src/components/Home/Home.style';

// Paramétrage des notifications (alerte / son / etc)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// =====================================
// Le composant App à proprement parler
// =====================================

export default function App() {
  // Je mets la température dans le state
  const initialTemperature = -900;
  const [temperature, setTemperature] = useState(initialTemperature);

  // Bloc nécessaire aux notifications
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // La fonction ci-dessous déclenche la notification
  // "Il fait bon" si T > 20
  // Ou bien "il fait frais" sinon.
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: (temperature > 20) ? '🙂 Il fait bon !' : '🥶 Il fait frais !',
        body: (temperature > 20) ? 'La température est supérieure à 20°.' : 'La température est inférieure à 20°.',
      },
      trigger: { seconds: 2 },
    });
  }

  // Cette fonction est importante pour gérer la souscription aux notifs
  // Et les permissions
  async function registerForPushNotificationsAsync() {
    let token;
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
    } else {
      // Cela se déclenchera par exemple sur Android Studio
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

  // Le 1er useEffect gère l'autorisation des notifications
  // Et la gestion des jetons et notifs dans le state
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

  // Le 2e useEffect gère la notification précise qui nous intéresse
  // Il se déclenche quand la valeur de "température" change
  // J'ajoute une condition pour éviter que la notif se déclenche avant l'appel API
  useEffect(() => {
    if (temperature !== initialTemperature) {
      schedulePushNotification();
    }
  }, [temperature]);

  // J'affiche mon composant en envoyant temperature et setTemperature à Home
  // Pour que l'API puisse modifier ces données
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
