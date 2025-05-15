import { create } from 'zustand';
import { INotification } from '@/app/shared/interfaces/Notification';

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
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
    
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
    
    setLoading: (loading) => set({ loading }),
    
    setError: (error) => set({ error })
})); 