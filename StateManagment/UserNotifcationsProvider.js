import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Text, View, Button, Platform, Settings } from 'react-native';
import axios from 'axios';
import { AuthContext } from './AuthState';

// moment will be used for ids
import moment from 'moment'
import storage from './utilities/storage'


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
export const UserNotificationsContext = React.createContext({});

export const UserNotificationsProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    const [expoPushToken, setExpoPushToken] = useState(null);

    // last notification State
    const [notification, setNotification] = useState(null);
    // all the notification to be set in this hook to be used in rendering the elements
    const [notifications, setNotifications] = useState(null);

    
    const saveNotification = (notify) => {
        storage.save({
            key: 'notifications',
            id: moment().toLocaleString(),
            data: notify,
            expires: null
        });
        storage.getAllDataForKey('notifications').then(notifies => {
            setNotifications(notifies.reverse())
        }).catch(error => {
            // clear all the data, to restart from a clean store
            storage.clearMapForKey('notifications');
            console.warn(error)
        });
    }
    
    const notificationListener = useRef();
    const responseListener = useRef();
    useEffect(() => {

        // retrieve all stored notifications
        storage.getAllDataForKey('notifications').then(notifications => {
            setNotifications(notifications)
            // set the count to the last element id
            console.log('courrent count of notifications: ' + notifications.length)
        }).catch(error => {
            // clear all the data, to restart from a clean slat
            storage.clearMapForKey('notifications');
            console.warn(error)
        });

        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token);
        });

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            saveNotification(notification);
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('user fired response receiced listener');
        });


        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };

    }, []);



    return (
        <UserNotificationsContext.Provider
            value={{
                notification,
                notifications,
                expoPushToken,
            }}>
            {children}
        </UserNotificationsContext.Provider>
    );
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        // console.log(token);
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

