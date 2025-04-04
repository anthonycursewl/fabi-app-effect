import { View, TouchableOpacity, Modal } from "react-native"
import TextWithColor from "@/app/shared/components/TextWithColor"
import { RenderTypeStatus } from "./RenderTypeStatus"
import { useState } from "react"

export const CardContentC = ({ item }: { item: any }): JSX.Element => { 
    const date = new Date(item.date)
    // state of the long press
    const [isSelected, setIsSelected] = useState<boolean>(false)

    const handleLongPress = () => {
        console.log('Long press detected here')
        setIsSelected(!isSelected)
    }
    
    return (
        <>
        <TouchableOpacity
        onPress={() => {
            console.log(`go to the details ${item.id}`)
        }}
        onLongPress={() => {handleLongPress()}}
        >
        <View style={{ width: '100%', backgroundColor: 'rgb(230, 230, 230)', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, gap: 5,
            borderWidth: 1, borderColor: isSelected ? 'rgba(181, 125, 255, 0.83)' : 'rgba(223, 223, 223, 0.83)'
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

        // If you're read this, let me tell you that I love u u-u. Don't complain bro just love xoxoxo

        <Modal visible={isSelected} onRequestClose={() => setIsSelected(!isSelected)}
        animationType="slide" transparent>
            <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
                <TextWithColor>Modal aqui {item.des_or_reason}</TextWithColor>
            </View>
        </Modal>
        </>
    )
}