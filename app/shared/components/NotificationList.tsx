import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNotificationStore } from '@/app/store/zustand/useNotificationStore';
import TextWithColor from './TextWithColor';
import { ColorsApp } from '@/app/shared/constants/ColorsApp';
import { INotification } from '@/app/shared/interfaces/Notification';

const getNotificationColor = (type: string) => {
    switch (type) {
        case 'success':
            return 'rgb(173, 248, 213)';
        case 'error':
            return 'rgb(248, 173, 173)';
        case 'warning':
            return 'rgb(248, 223, 173)';
        default:
            return 'rgb(230, 230, 230)';
    }
};

const getTextColor = (type: string) => {
    switch (type) {
        case 'success':
            return 'rgb(21, 121, 74)';
        case 'error':
            return 'rgb(184, 123, 123)';
        case 'warning':
            return 'rgb(121, 98, 21)';
        default:
            return 'rgb(0, 0, 0)';
    }
};

export const NotificationList = () => {
    const { notifications, markAsRead, removeNotification } = useNotificationStore();

    const renderNotification = ({ item }: { item: INotification }) => (
        <TouchableOpacity
            style={[
                styles.notificationItem,
                { backgroundColor: getNotificationColor(item.type) }
            ]}
            onPress={() => markAsRead(item.id)}
        >
            <View style={styles.notificationContent}>
                <TextWithColor
                    style={styles.title}
                    color={getTextColor(item.type)}
                >
                    {item.title}
                </TextWithColor>
                <TextWithColor
                    style={styles.message}
                    color={getTextColor(item.type)}
                >
                    {item.message}
                </TextWithColor>
                <TextWithColor
                    style={styles.timestamp}
                    color={getTextColor(item.type)}
                >
                    {new Date(item.created_at).toLocaleString()}
                </TextWithColor>
            </View>
            {!item.read && (
                <View style={styles.unreadDot} />
            )}
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
    },
    notificationItem: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationContent: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    message: {
        fontSize: 14,
        marginBottom: 4,
    },
    timestamp: {
        fontSize: 12,
        opacity: 0.7,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: ColorsApp.primary.color,
        marginLeft: 8,
    },
}); 