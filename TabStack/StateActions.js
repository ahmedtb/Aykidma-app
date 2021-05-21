export const refreshNotifications = (notifications) => (
    {
        type: 'refresh-notifications',
        // payload: stateIndex,
        notifications: notifications
    }
);