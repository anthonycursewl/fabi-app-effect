import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout";
import { FlatList, SafeAreaView, View, Image, TouchableOpacity } from "react-native";
// Components
import TextWithColor from "@/app/shared/components/TextWithColor";
import { useNotificationStore } from "@/app/store/zustand/useNotificationStore";
import { useEffect } from "react";
import { INotification } from "@/app/shared/interfaces/Notification";
import { useGlobalState } from "@/app/store/zustand/useGlobalState";
import { parseDate } from "@/app/shared/services/parseDate";
export default function Notifications() {
    const { notifications, loading, getNotifications } = useNotificationStore()
    const { user } = useGlobalState()
 
    const CardNotification = ({ item }: { item: INotification }) => {
        return (
            <TouchableOpacity onPress={() => {
                console.log(item)
            }}>
                <View style={{ width: '100%', alignItems: 'flex-start', backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 10, borderRadius: 10, gap: 8 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <TextWithColor style={{ fontSize: 16 }}>
                            {item.title}
                        </TextWithColor>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <TextWithColor style={{ fontSize: 12, color: 'gray' }}>{parseDate(item.created_at)}</TextWithColor>
                            <Image source={{ uri: user.icon_url }} style={{ width: 20, height: 20, borderRadius: 100 }} />
                        </View>
                    </View>

                    <View>
                        <TextWithColor>{item.message}</TextWithColor>

                        <TextWithColor style={{ fontSize: 12, color: 'gray' }}>{item.read ? 'Leído' : 'No leído'}</TextWithColor>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <TextWithColor>Tipo</TextWithColor>
                        <TextWithColor style={{ fontWeight: 'bold'}} color="rgb(178, 122, 231)">{item.type}</TextWithColor>
                    </View>
            </View>
            </TouchableOpacity>
        )
    }

    const _getNotis = async () => {
        await getNotifications()
    }

    useEffect(() => {
        _getNotis()
    }, [])

    useEffect(() => {
        console.log(notifications)
    }, [])

    return (
        <AuthenticatedLayout>
            <SafeAreaView style={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', height: '93%', backgroundColor: 'white', paddingTop: 35, gap: 10 }}>
                <View style={{ width: '90%', alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextWithColor style={{ fontSize: 20, fontWeight: 'bold' }}>
                        ¡Hola {user.name.split(' ')[0]}! 
                    </TextWithColor>

                    <Image source={{ uri: user.icon_url}} style={{ width: 35, height: 35, borderRadius: 100 }} /> 
                </View>

                <FlatList 
                data={notifications}
                contentContainerStyle={{ width: '100%', gap: 5 }}
                style={{ width: '90%' }}
                renderItem={({ item }) => <CardNotification item={item}/>}
                refreshing={loading}
                onRefresh={_getNotis}
                />

            </SafeAreaView>
        </AuthenticatedLayout>
    )
}