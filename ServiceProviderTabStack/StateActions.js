export const refreshNotifications = (notifications) => (
    {
        type: 'refresh-notifications',
        notifications: notifications
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
