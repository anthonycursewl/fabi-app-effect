import { INotification } from '@/app/shared/interfaces/Notification';
import { secureFetch } from './secureFetch';
import { API_URl } from '@/app/config/api.breadriuss.config';

export const notificationService = {
    async getNotifications(userId: string, setLoading: (loading: boolean) => void) {
        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/notifications/${userId}`,
                method: 'GET'
            },
            setLoading
        });

        if (error) throw error;
        return response as INotification[];
    },

    async markAsRead(notificationId: string, setLoading: (loading: boolean) => void) {
        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/notifications/${notificationId}/read`,
                method: 'PUT'
            },
            setLoading
        });

        if (error) throw error;
        return response as INotification;
    },

    async markAllAsRead(userId: string, setLoading: (loading: boolean) => void) {
        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/notifications/${userId}/read-all`,
                method: 'PUT'
            },
            setLoading
        });

        if (error) throw error;
        return response as INotification[];
    },

    async deleteNotification(notificationId: string, setLoading: (loading: boolean) => void) {
        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/notifications/${notificationId}`,
                method: 'DELETE'
            },
            setLoading
        });

        if (error) throw error;
        return response;
    }
}; 