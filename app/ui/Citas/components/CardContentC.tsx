import { View, TouchableOpacity, Modal, Alert, ActivityIndicator } from "react-native"
import TextWithColor from "@/app/shared/components/TextWithColor"
import { RenderTypeStatus } from "./RenderTypeStatus"
import { useEffect, useState } from "react"
import { secureFetch } from "@/app/shared/services/secureFetch"
import { API_URl } from "@/app/config/api.breadriuss.config"
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal"
import { useRoute } from "@react-navigation/native"

export const CardContentC = ({ item, navigation }: { item: any, navigation: INavGlobal }): JSX.Element => { 
    const date = new Date(item.date)
    // state of the long press
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const route = useRoute()

    const handleLongPress = () => {
        setIsSelected(true)
    }

    const handleDeleteCita = async () => {
        const { response, error } = await secureFetch({
            options: {
                url: `${API_URl}/cita/delete/${item.id}`,
                method: 'DELETE'
            },
            setLoading
        })

        if (error) {
            Alert.alert('Error', `${error}`)
        }


        if (response) {
            setIsSelected(false)
            Alert.alert('Cita eliminada', 'La cita ha sido eliminada con exito')
            navigation.navigation.replace('Dashboard')
        }
    }
    
    const handleDelete = () => {
        Alert.alert('Eliminar cita', 
            '¿Estas seguro de querer eliminar esta cita?', 
            [{ text: 'Si', 
            onPress: () => handleDeleteCita() }, 
            { text: 'No', onPress: () => {} }
        ])
    }

    const dynamicRoute = route.name === 'CitasPendingCont' ? 'CitaDetailsCont' : 'CitaDetails'

    useEffect(() => {
        console.log(dynamicRoute)
    }, [])
     
    return (
        <>
        <TouchableOpacity
        onPress={() => {
            navigation.navigation.navigate(dynamicRoute, { item: item })
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
                        {!loading ? <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: '100%', alignItems: 'center' }}
                        onPress={handleDelete}
                        >
                            <TextWithColor style={{ color: 'white', fontSize: 16 }}>Eliminar</TextWithColor>
                        </TouchableOpacity> :
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <ActivityIndicator size={'large'} color={'red'} />
                        </View>
                        }
                    </View>
                </View>
            </View>
        </Modal>
        </>
    )
}