import { View, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'
import SlideButton from '@/app/shared/components/SlideButton';
import TextWithColor from '@/app/shared/components/TextWithColor';
// Services
import { secureFetch } from '@/app/shared/services/secureFetch';
import { useContext, useEffect, useState } from 'react';
// Constants
import { API_URl } from '@/app/config/api.breadriuss.config';
import { TYPES_STATUS_CITAS } from '@/app/shared/constants/TypesStatusCitas';
// Interfaces
import { TypeCitaDetails } from '../../../interfaces/TypeCitaDetails';
import { TYPES_ROLES } from '@/app/shared/constants/TypesRoles';
import { INavGlobal } from '@/app/shared/interfaces/INavGlobal';
import { TypeFilter } from '../../../interfaces/TypeFilter';
import { AuthContext } from '@/app/shared/context/ContextProvider';
import { useCitasStore } from '@/app/store/zustand/useCitaStore';

interface ActionsCitaProps {
    item: TypeCitaDetails
    navigation: INavGlobal
}

export default function ActionsCita({ item, navigation }: ActionsCitaProps) {
    const [loadingAction, setLoadingAction] = useState<boolean>(false)
    const { user } = useContext(AuthContext)

    // Estado global con zustand
    const { fetchCitas, currentFilter} = useCitasStore() 

    // All these functions are goint to be moved to a service class in the future.
    // No, they won't be classes at all. They'll be objects with methods using flux architecture.
    // In order to center the logic in the service, we'll need to pass the service as a prop to the component.
    const handleChangeStatusCita = async (status: TypeFilter) => {
        setLoadingAction(true)
        const { response, error } = await secureFetch({
                options: {
                    url: `${API_URl}/cita/change/status?id=${item.id}&status=${status}`,
                    method: 'PUT',
                },
            setLoading: () => {}
        })
        
        setLoadingAction(false)

        if (error) {
            Alert.alert('Error', `${error}`)
        }
    
        if (response) {
            if (status === TYPES_STATUS_CITAS.CONFIRMED) {
                Alert.alert('Cita confirmada', '¡La cita ha sido confirmada con éxito!')
            } 
            if (status === TYPES_STATUS_CITAS.CANCELED) {
                Alert.alert('Cita cancelada', '¡La cita ha sido cancelada con éxito!')
            }
            await fetchCitas(currentFilter, user.id, true)
            navigation.navigation.goBack()
        }
    };

    const handleAlertCancel = (): void => {
        Alert.alert('BRD | Cancelación de cita', 
            '¿Estas seguro de querer cancelar esta cita?', 
            [{ text: 'Si', 
            onPress: async () => handleChangeStatusCita(TYPES_STATUS_CITAS.CANCELED as TypeFilter) }, 
            { text: 'No', onPress: () => {} }
        ])
    } 

    // We wanted to use a soft delete, but the client didn't like that. He's already saving data in the other services, 
    // So we're gonna use a hard delete (DELETE FROM blabla WHERE id = X)
    const handleDeleteCita = async () => {
        setLoadingAction(true)
        const { response, error } = await secureFetch({
            options: {
                url: `${API_URl}/cita/delete/${item.id}`,
                method: 'DELETE'
            },
            setLoading: () => {}
        })
        setLoadingAction(false)

        if (error) {
            Alert.alert('Error', `${error}`)
        }

        if (response) {
            Alert.alert('Cita eliminada', 'La cita ha sido eliminada con exito')
            await fetchCitas(currentFilter, user.id, true)
            navigation.navigation.goBack()
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

    return (!loadingAction ?
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20, padding: 15, gap: 10 }}>
                {
                item.status !== TYPES_STATUS_CITAS.CANCELED && item.status !== TYPES_STATUS_CITAS.CONFIRMED && (user.role === TYPES_ROLES.PROFESIONAL || user.role === TYPES_ROLES.ADMIN) &&
                user.name === item.contdr_profile.users.name &&
                    <SlideButton onSlideSuccess={() => handleChangeStatusCita(TYPES_STATUS_CITAS.CONFIRMED as TypeFilter)} title="Desliza para confirmar la cita"
                    thumbIcon={
                        <Image style={{ width: 30, height: 30 }} source={require('@/assets/images/arrow-right-cita.png')} />
                    }
                    />
                }

                {
                item.status !== TYPES_STATUS_CITAS.CANCELED && (user.role === TYPES_ROLES.PROFESIONAL || user.role === TYPES_ROLES.ADMIN) &&
                user.name === item.contdr_profile.users.name &&
                        <TouchableOpacity
                        style={{ backgroundColor: 'rgb(255, 105, 112)', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, width: '100%', alignItems: 'center', justifyContent: 'center'}}
                        onPress={() => {
                            navigation.navigation.replace('RescheduleCita', { item: item });
                        }}>
                            <TextWithColor color="rgb(255, 255, 255)">Reprogramar</TextWithColor>
                    </TouchableOpacity>
                }

                {item.status !== TYPES_STATUS_CITAS.CANCELED &&
                    <TouchableOpacity
                    style={{ 
                    backgroundColor: 'rgb(255, 105, 112)', 
                    paddingVertical: 10, paddingHorizontal: 12, 
                    borderRadius: 12, width: '100%', 
                    alignItems: 'center', justifyContent: 'center',
                }}
                    onPress={() => {
                        handleAlertCancel();
                    }}>
                        <TextWithColor color="rgb(255, 255, 255)">Cancelar</TextWithColor>
                </TouchableOpacity>
                }
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