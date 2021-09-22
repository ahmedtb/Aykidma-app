export const setProviderNotifications = (providerNotifications) => (
    {
        type: 'setProviderNotifications',
        providerNotifications: providerNotifications
    }
);

export const setProviderNotification = (providerNotification) => (
    {
        type: 'setProviderNotification',
        providerNotification: providerNotification
    }
);

export const setUserNotifications = (userNotifications) => (
    {
        type: 'setUserNotifications',
        userNotifications: userNotifications
    }
);

export const setUserNotification = (userNotification) => (
    {
        type: 'setUserNotification',
        userNotification: userNotification
    }
);

export const setExpoPushToken = (expoPushToken) => (
    {
        type: 'setExpoPushToken',
        expoPushToken: expoPushToken
    }
);

export const setCategories = (categories) => (
    {
        type: 'setCategories',
        categories: categories
    }
);

export const setProvider = (provider) => (
    {
        type: 'setProvider',
        provider: provider
    }
);


export const setUser = (user) => (
    {
        type: 'setUser',
        user: user
    }
);

export const setToken = (token) => (
    {
        type: 'setToken',
        token: token
    }
);
