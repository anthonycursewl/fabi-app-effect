import { create } from 'zustand';
import { INotification } from '@/app/shared/interfaces/Notification';
import { secureFetch } from '@/app/shared/services/secureFetch';
import { API_URl } from '@/app/config/api.breadriuss.config';

interface NotificationState {
    notifications: INotification[];
    unreadCount: number;
    loading: boolean;
    error: string | null;
    setNotifications: (notifications: INotification[]) => void;
    addNotification: (notification: INotification) => void;
    markAsRead: (notificationId: string) => void;
    markAllAsRead: () => void;
    removeNotification: (notificationId: string) => void;
    clearNotifications: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    getNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
    setLoading: (loading: boolean) => set({
        loading: loading
    }),
    setNotifications: (notifications) => set({
        notifications,
        unreadCount: notifications.filter(n => !n.read).length
    }),
    addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + 1
    })),
    markAsRead: (notificationId) => set((state) => ({
        notifications: state.notifications.map(notification =>
            notification.id === notificationId
                ? { ...notification, read: true }
                : notification
        ),
        unreadCount: state.unreadCount - 1
    })),
    markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(notification => ({
            ...notification,
            read: true
        })),
        unreadCount: 0
    })),
    removeNotification: (notificationId) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== notificationId),
        unreadCount: state.notifications.find(n => n.id === notificationId)?.read 
            ? state.unreadCount 
            : state.unreadCount - 1
    })),
    clearNotifications: () => set({
        notifications: [],
        unreadCount: 0
    }),  
    setError: (error) => set({ error }),
    getNotifications: async () => {
        const { setLoading, setError, setNotifications } = get()
        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/notification/get/all`,
                method: 'GET',
            },
            setLoading
        })

        if (error) {
            setError(error)
        }

        if (response) {
            setNotifications(response)
        }
    },
})); 