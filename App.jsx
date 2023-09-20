// Importation des modules
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef } from 'react';
import {
  Text, View, Button, Platform, Linking, Alert,
} from 'react-native';

//  Configuration des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Fonction asynchrone numéro 1
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
  let token;
  console.log('token at start', token);
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
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

    // if (finalStatus !== 'granted') {
    // alert('Failed to get push token for push notification!');
    // return;
    // }

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

export default function App() {
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