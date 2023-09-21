import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Location from 'expo-location';

import {
  ScrollView, Platform, Linking, Alert,
} from 'react-native';

// Cela permet de récupérer le token de notifications (ajout après vidéo Expo Push Notifications)
import registerNNPushToken from 'native-notify';

// Importation des modules nécessaires aux notifications
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { isDevice } from 'expo-device';

import { HomeCurrentCity, HomeNow, HomeNextDays } from '..';
import style from './Home.style';

//  Configuration des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// ==============================================
// FONCTIONS ASYNCHRONES
// ==============================================
// #region
// FONCTION ASYNCHRONE POUR LANCER UNE NOTIF
async function launchTemperatureNotification() {
  console.log("déclenchement de l'envoi de notif");
  // On attend que la fonction suivante se termine avant de continuer l'exécution
  // C'est une fonction fournie par expo-notifications pour planifier l'envoi
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Nouvelle température',
      body: 'Il fait bon',
      // data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

// FONCTION ASYNCHRONE POUR OBTENIR LES AUTORISATIONS DE NOTIFICATIONS
async function registerForPushNotificationsAsync() {
  let token = '';

  if (isDevice) {
    // Obtention de l'état actuel des autorisations de notifications sur l'appareil
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    // On copie ce statut dans "finalStatus"
    let finalStatus = existingStatus;

    // Dans le cas où les autorisations ne sont pas accordées
    // On demande
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
    // A ce stade en principe on a bien récupéré le token
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Nouveau Token : ', token);
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
// #endregion

const Home = () => {
  // TODO define APIkey as an environment variable
  const APIkey = 'fd398fa8f15a0f5c87e77b1a8b00e4e7';
  const [loading, setLoading] = useState(false);

  const [city, setCity] = useState('CURRENT CITY');
  const [temp, setTemp] = useState(0);

  const getWeatherFromApi = async (latitude, longitude) => {
    try {
      // Appel à l'API météo
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`,
      );

      console.log(response.data);
      setCity(response.data.name);
      setTemp(response.data.main.temp);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const getPermissions = async () => {
    try {
      setLoading(true);
      const status = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Please grant location permissions');
      }

      // Obtention de la position actuelle
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Appel de la méthode getWeatherFromApi avec les bonnes coordonnées
      await getWeatherFromApi(latitude, longitude);
    } catch (error) {
      console.error('Error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // J'appelle la fonction que je viens de créer :
    getPermissions();
  }, []);

  return (
    <ScrollView>

      <HomeCurrentCity
        city={city}
        loading={loading}
      />

      <HomeNow
        temp={temp}
        loading={loading}
      />

      <HomeNextDays />
    </ScrollView>
  );
};

export default Home;
