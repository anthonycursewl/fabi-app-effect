import { View, TouchableOpacity, Modal, Alert } from "react-native"
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

    const handleDelete = () => {
        Alert.alert('Eliminar cita', 
            '¿Estas seguro de querer eliminar esta cita?', 
            [{ text: 'Si', 
            onPress: () => console.log('Si') }, 
            { text: 'No', onPress: () => console.log('No') }
        ])
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

        {/* // If you're read this, let me tell you that I love u u-u. Don't complain bro just love xoxoxo */}

        <Modal visible={isSelected} onRequestClose={() => setIsSelected(!isSelected)}
        animationType="fade" transparent
        >
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            >
                
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '100%', height: 'auto', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <TextWithColor color="black" style={{ fontSize: 18 }}>{item.des_or_reason}</TextWithColor>

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TextWithColor>{item.hour}</TextWithColor>
                        <TextWithColor>{date.toLocaleDateString()}</TextWithColor>
                        <RenderTypeStatus status={item.status}/>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: '100%', alignItems: 'center' }}
                        onPress={handleDelete}
                        >
                            <TextWithColor style={{ color: 'white', fontSize: 16 }}>Eliminar</TextWithColor>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        </>
    )
}