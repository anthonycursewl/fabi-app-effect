import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout";
import { FlatList, SafeAreaView, View, Image, BackHandler } from "react-native";
// Components
import TextWithColor from "@/app/shared/components/TextWithColor";
import { useNotificationStore } from "@/app/store/zustand/useNotificationStore";
import { useEffect } from "react";
import { useGlobalState } from "@/app/store/zustand/useGlobalState";
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";
import { CardPreviewNotification } from "./components/CardPreviewNotification";
export default function Notifications({ navigation }: INavGlobal) {
    const { notifications, loading, getNotifications } = useNotificationStore()
    const { user } = useGlobalState()

    useEffect(() => {
        getNotifications()
    }, [])    

    return (
        <AuthenticatedLayout>
            <SafeAreaView style={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', height: '93%', backgroundColor: 'white', gap: 10 }}>
                <View style={{ width: '90%', alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                    <TextWithColor style={{ fontSize: 20, fontWeight: 'bold' }}>
                        ¡Hola {user.name.split(' ')[0]}! 
                    </TextWithColor>

                    <Image source={{ uri: user.icon_url }} style={{ width: 35, height: 35, borderRadius: 100 }} /> 
                </View>

                <FlatList 
                    data={notifications}
                    contentContainerStyle={{ width: '100%', gap: 5 }}
                    keyExtractor={(item) => item.id.toString()}
                    style={{ width: '90%', height: '95%' }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <CardPreviewNotification item={item} nav={{ navigation }} />}
                    refreshing={loading}
                    onRefresh={getNotifications}
                />

                <View>
                    <TextWithColor>--</TextWithColor>
                </View>
            </SafeAreaView>
        </AuthenticatedLayout>
    )
}