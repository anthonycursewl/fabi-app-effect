export interface INotification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    created_at: string;
    user_id: string;
    data?: {
        [key: string]: any;
    };
} 