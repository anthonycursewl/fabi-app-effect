import { TouchableOpacity, View, Image } from "react-native"
import TextWithColor from "@/app/shared/components/TextWithColor"
import { INotification } from "@/app/shared/interfaces/Notification"
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal"
import { useGlobalState } from "@/app/store/zustand/useGlobalState"
import { parseDate } from "@/app/shared/services/parseDate"

export const CardPreviewNotification = ({ item, nav }: { item: INotification, nav: INavGlobal }) => {
    const { user } = useGlobalState()

        return (
            <TouchableOpacity onPress={() => {
                nav.navigation.navigate('NotificationDetails', { noti: item })
            }}>
                <View style={{ width: '100%', alignItems: 'flex-start', backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 10, borderRadius: 10, gap: 8,
                    borderWidth: item.read ? 0 : 1,
                    borderColor: 'rgba(194, 130, 255, 0.89)'   
                 }}>
                    <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: item.read ? 'rgba(104, 78, 128, 0.89)' : 'rgba(194, 130, 255, 0.89)', padding: 5, borderBottomEndRadius: 8, borderTopStartRadius: 10 }}>
                        <TextWithColor style={{ fontSize: 12, color: 'white' }}>
                            {item.read ? 'Leído' : 'No leído'}
                        </TextWithColor>
                    </View>
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
                        <TextWithColor>{item.message.slice(0, 60)}...</TextWithColor>

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
