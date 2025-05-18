import { Alert, SafeAreaView, TouchableOpacity, View } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";
import { useRoute } from "@react-navigation/native";
import { INotification } from "@/app/shared/interfaces/Notification";
import { useGlobalState } from "@/app/store/zustand/useGlobalState";

// Image
import { Image } from "react-native";
import { parseDate } from "@/app/shared/services/parseDate";
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";
import { useEffect } from "react";
import { useNotificationStore } from "@/app/store/zustand/useNotificationStore";

export default function NotificationDetails({ navigation }: INavGlobal) {
    const route = useRoute()
    const { noti } = route.params as { noti: INotification }
    const { user } = useGlobalState() 

    const { markAsRead, error } = useNotificationStore()
    const arrowBack = require('@/assets/icons/arrow-back-img.png')

    const _markAsRead = async () => {
        if (!noti.read) {
            await markAsRead(noti.id)
        }
    }

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error)
        }
    }, [error])
        
    useEffect(() => {
        _markAsRead()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
                <View style={{ alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={arrowBack} style={{ width: 35, height: 35 }}/>
                    </TouchableOpacity>
                    <Image source={{ uri: user.icon_url }} style={{ width: 40, height: 40, borderRadius: 100 }}/>
                </View>

                <TextWithColor style={{ fontSize: 20, fontWeight: 'bold', marginTop: 15 }}>
                    Detalles de la notificación
                </TextWithColor>

                <View style={{ marginTop: 15 }}>
                    <TextWithColor style={{ fontSize: 18 }}>
                        {noti.title}
                    </TextWithColor>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Image source={require('@/assets/icons/calender_img.png')} style={{ width: 14, height: 14 }}/>
                        <TextWithColor style={{ fontSize: 14, color: 'gray' }}>
                            {parseDate(noti.created_at)}
                        </TextWithColor>
                    </View>

                    <TextWithColor style={{ fontSize: 16, color: 'gray', marginTop: 10 }}>
                        {noti.message}
                    </TextWithColor>

                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Image source={require('@/assets/icons/noti_img.png')} style={{ width: 18, height: 18 }}/>
                            <TextWithColor style={{ fontSize: 16 }}>Tipo de notificación</TextWithColor>
                        </View>

                        <TextWithColor style={{ fontSize: 14, color: 'gray' }}>* {noti.type}</TextWithColor>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}