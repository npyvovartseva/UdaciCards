import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Permissions from 'expo-permissions';

export function formatDate(timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _saveDeck(title) {
    return {
        title,
        id: generateUID(),
        created: Date.now(),
        cards: []
    }
}
export function _addCardToDeck(card) {
    return {
        ...card,
        id: generateUID(),
        created: Date.now()
    }
}

const NOTIFICATION_KEY = 'udacitycards';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification() {
    return {
        title: '⏰ Keep studing',
        body: `Don't forget to test your knowledge`,
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if(status !== 'granted'){
                            Notifications.requestPermissionsAsync()
                            .then(res => { console.log(res) })
                        }
                        else {
                            Notifications.cancelAllScheduledNotificationsAsync();
                            Notifications.setNotificationHandler({
                                handleNotification: async () => ({
                                    shouldPlaySound: true,
                                    shouldShowAlert: true,
                                    shouldSetBadge: false
                                })
                            })
                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(20);
                            tomorrow.setMinutes(0);
                            const notifDate = new Date(tomorrow);

                            Notifications.scheduleNotificationAsync({
                                content: createNotification(),
                                trigger: notifDate
                            })

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }

                    })
            }
        })
} 