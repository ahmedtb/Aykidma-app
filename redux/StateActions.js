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

export const setServices = (services) => (
    {
        type: 'setServices',
        services: services
    }
);

export const setServiceProviders = (service_providers) => (
    {
        type: 'setServiceProviders',
        service_providers: service_providers
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
