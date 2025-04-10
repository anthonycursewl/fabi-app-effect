import { View, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'
import SlideButton from '@/app/shared/components/SlideButton';
import TextWithColor from '@/app/shared/components/TextWithColor';
// Services
import { secureFetch } from '@/app/shared/services/secureFetch';
import { useContext, useState } from 'react';
// Constants
import { API_URl } from '@/app/config/api.breadriuss.config';
import { TYPES_STATUS_CITAS } from '@/app/shared/constants/TypesStatusCitas';
// Interfaces
import { TypeCitaDetails } from '../../../interfaces/TypeCitaDetails';
import { TYPES_ROLES } from '@/app/shared/constants/TypesRoles';
import { INavGlobal } from '@/app/shared/interfaces/INavGlobal';
import { TypeFilter } from '../../../interfaces/TypeFilter';
import { AuthContext } from '@/app/shared/context/ContextProvider';
interface ActionsCitaProps {
    item: TypeCitaDetails
    navigation: INavGlobal
}

export default function ActionsCita({ item, navigation }: ActionsCitaProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const { user } = useContext(AuthContext)

    // All these functions are goint to be moved to a service class in the future.
    const handleChangeStatusCita = async (status: TypeFilter) => {
            const { response, error } = await secureFetch({
                options: {
                    url: `${API_URl}/cita/change/status?id=${item.id}&status=${status}`,
                    method: 'PUT',
                },
                setLoading
            })
    
            if (error) {
                Alert.alert('Error', `${error}`)
            }
    
            if (response) {
                Alert.alert('Cita cancelada', 'La cita ha sido cancelada con exito')
                navigation.navigation.replace('CitasUser')
            }
    };

    // We wanted to use a soft delete, but the client didn't like that. He's already saving data in the other services, 
    // So we're gonna use a hard delete (DELETE FROM blabla WHERE id = X)
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
            Alert.alert('Cita eliminada', 'La cita ha sido eliminada con exito')
            navigation.navigation.replace('Dashboard')
        }
    }

    const handleAlertDelete = (): void => {
        Alert.alert('BRD | Eliminación de cita', 
            '¿Estas seguro de querer eliminar esta cita?', 
            [{ text: 'Si', 
            onPress: async () => handleDeleteCita() }, 
            { text: 'No', onPress: () => {} }
        ])
    }

    return (!loading ?
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20, padding: 15, gap: 10 }}>
            {item.status !== TYPES_STATUS_CITAS.CANCELED && item.status !== TYPES_STATUS_CITAS.CONFIRMED && user.role === TYPES_ROLES.PROFESIONAL &&
                <SlideButton onSlideSuccess={() => handleChangeStatusCita(TYPES_STATUS_CITAS.CONFIRMED as TypeFilter)} title="Desliza para confirmar la cita"
                thumbIcon={
                    <Image style={{ width: 30, height: 30 }} source={require('@/assets/images/arrow-right-cita.png')} />
                }
                />
            }
            <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center', gap: 10, flexDirection: 'row' }}>
                {item.status !== TYPES_STATUS_CITAS.CANCELED &&
                    <TouchableOpacity
                    style={{ backgroundColor: 'rgb(255, 105, 112)', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, width: '100%', alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => {
                        handleChangeStatusCita(TYPES_STATUS_CITAS.CANCELED as TypeFilter);
                    }}>
                        <TextWithColor color="rgb(255, 255, 255)">Cancelar</TextWithColor>
                </TouchableOpacity>
                }
                {item.status !== TYPES_STATUS_CITAS.CANCELED && user.role === TYPES_ROLES.PROFESIONAL &&
                    <TouchableOpacity
                    style={{ backgroundColor: 'rgb(255, 105, 112)', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, width: '100%', alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => {
                        navigation.navigation.replace('RescheduleCita', { cita: item });
                    }}>
                        <TextWithColor color="rgb(255, 255, 255)">Reprogramar</TextWithColor>
                </TouchableOpacity>
                }
            </View>
            {
                item.status === TYPES_STATUS_CITAS.CANCELED &&
                <TouchableOpacity
                    style={{ backgroundColor: 'rgba(255, 105, 113, 0.99)', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, width: '100%', alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => {
                        handleAlertDelete();
                    }}>
                        <TextWithColor color="rgb(255, 255, 255)">Eliminar</TextWithColor>
                </TouchableOpacity>
            }
        </View> 
        :
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20, padding: 15, gap: 10 }}>
            <ActivityIndicator size="large" color="rgb(163, 105, 255)" />
        </View>
    )
}