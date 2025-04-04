import { View, TouchableOpacity } from "react-native"
import TextWithColor from "@/app/shared/components/TextWithColor"
import { RenderTypeStatus } from "./RenderTypeStatus"

export const CardContentC = (item: any) => {
    const date = new Date(item.date)    
    
    return (
        <TouchableOpacity
        onPress={() => {
            console.log("Epa me estan tocando")
        }}
        >
        <View style={{ width: '100%', backgroundColor: 'rgb(230, 230, 230)', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, gap: 5,
            borderWidth: 1, borderColor: 'rgba(223, 223, 223, 0.83)'
        }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextWithColor>{item.hour}</TextWithColor>
                    <RenderTypeStatus status={item.status}/>
                </View>
                <View>
                    <TextWithColor style={{ fontSize: 13, color: 'rgba(78, 78, 78, 0.83)' }}>Descripción</TextWithColor>
                    <TextWithColor style={{ width: '100%', fontSize: 18 }}>{item.des_or_reason}</TextWithColor>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <TextWithColor>Fecha</TextWithColor>
                        <TextWithColor>{date.toLocaleDateString()}</TextWithColor>
                    </View>
                    
                    <View>
                        <TextWithColor>Contador</TextWithColor>
                        <TextWithColor>{item.contdr_profile.users.name}</TextWithColor>
                    </View>
                </View>
        </View>
        </TouchableOpacity>
    )
}