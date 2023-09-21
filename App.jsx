import { useState, useEffect, useRef } from 'react';
import {
  Text, View, Button, Platform, Linking, Alert,
} from 'react-native';

// Cela permet de récupérer le token de notifications (ajout après vidéo Expo Push Notifications)
import registerNNPushToken from 'native-notify';

// Importation des modules nécessaires aux notifications
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { isDevice } from 'expo-device';

//  Configuration des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Fonction asynchrone numéro 1
// Lance une notif avec un délai défini en secondes
async function schedulePushNotification() {
  // On attend que la fonction suivante se termine avant de continuer l'exécution
  // C'est une fonction fournie par expo-notifications pour planifier l'envoi
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Il pleut !',
      body: 'Sortez les parapluies',
      // data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

// Fonction asynchrone numéro 2
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

export default function App() {
  // Ajout après la vidéo Expo Push Notification
  registerNNPushToken(12399, '3Zc1qAo6STNOM39kwWRbb3');

  // Création d'états pour stocker le jeton et les notifications
  // Utilisation de références pour écouter les notifications
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // useEffect : appel de la fonction registerForPushNotificationsAsync, obtention du jeton
  // Stockage du jeton dans le state expoPushToken
  // Configuration des 2 écouteurs de notifications
  // Définit une fonction de nettoyage qui supprime les écouteurs si démonté (fuites mémoires)
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

  // Le composant à proprement parler :
  // Affiche le jeton, le titre, corps, données de la dernière notif
  // Bouton pour planifier l'envoi de notifications
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}
