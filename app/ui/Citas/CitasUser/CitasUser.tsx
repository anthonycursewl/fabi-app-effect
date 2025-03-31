import { SafeAreaView, View, FlatList, Alert, StatusBar } from "react-native"
import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import { useContext, useEffect, useState } from "react"
import { StyleSheet } from "react-native"

// Components
import TextWithColor from "@/app/shared/components/TextWithColor"
import FilterCitas from "../components/FilterCitas"
// Constants
import { API_URl } from "@/app/config/api.breadriuss.config"
// Services
import { AuthContext } from "@/app/shared/context/ContextProvider"
import { secureFetch } from "@/app/shared/services/secureFetch"

// Interfaces
import { Cita } from "@/app/shared/interfaces/CitaType"
import { TYPES_STATUS_CITAS } from "@/app/shared/constants/TypesStatusCitas"

export default function CitaUser() {
    const { user } = useContext(AuthContext)
    const [pagination, setPagination] = useState({ skip: 1, take: 10, isEnd: false })
    const [loading, setLoading] = useState<boolean>(false)
    const [citas, setCitas] = useState<Cita[]>([])

    // @return different status

    const getAllData = async () => {
        if (pagination.isEnd) return 

        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/cita/get/all/byuserid/${user.id}?take=${pagination.take}&skip=${pagination.skip}`,
                method: 'GET',
            },
            setLoading
        })

        if (error) {
            return Alert.alert('BRD | Un error ha ocurrido', `${error}`)
        }

        if (response) {
            setCitas(response)
        }
    }

    useEffect(() => {
        getAllData()
    }, [])

    const RenderItem = (item: any) => {
        const date = new Date(item.date)
        
        return (
            <View style={{ width: '100%', backgroundColor: 'rgb(230, 230, 230)', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, gap: 5,
                borderWidth: 1, borderColor: 'rgba(223, 223, 223, 0.83)'
             }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextWithColor>{item.hour}</TextWithColor>
                    {
                        item.status === TYPES_STATUS_CITAS.PENDING ? 
                        <TextWithColor style={{ color: 'rgb(241, 175, 52)', backgroundColor: 'rgba(241, 175, 52, 0.2)', borderRadius: 12,
                            paddingVertical: 3, paddingHorizontal: 10
                         }}>pendiente</TextWithColor> :
                        item.status === TYPES_STATUS_CITAS.CANCELED ?
                        <TextWithColor style={{ color: 'rgb(241, 52, 52)', backgroundColor: 'rgba(241, 52, 52, 0.2)', borderRadius: 12,
                            paddingVertical: 3, paddingHorizontal: 10
                         }}
                        >cancelada</TextWithColor> :
                        item.status === TYPES_STATUS_CITAS.CONFIRMED ?
                        <TextWithColor style={{ color: 'rgb(28, 185, 22)', backgroundColor: 'rgba(52, 241, 99, 0.2)', borderRadius: 12,
                            paddingVertical: 3, paddingHorizontal: 10
                         }}>confirmada</TextWithColor> :
                        item.status === TYPES_STATUS_CITAS.RESCHEDULED ?
                        <TextWithColor style={{ color: 'rgb(52, 140, 241)', backgroundColor: 'rgba(52, 118, 241, 0.2)', borderRadius: 12,
                            paddingVertical: 3, paddingHorizontal: 10
                         }}>reprogramada</TextWithColor> :
                        null
                    }
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
        )
    }

    const ListEmptyComponent = () => {
        return (
            <TextWithColor style={{ fontSize: 13 }} color="rgba(128, 128, 128, 0.83)">
                No tienes citas
            </TextWithColor>
        )
    }

    return (
        <AuthenticatedLayout>
            <>
                <SafeAreaView style={styleCitasUser.mainContent}>
                    <View style={{ width: '90%'}}>
                        <TextWithColor style={{ fontSize: 24, fontWeight: 'bold' }}>
                            ¡Hola {user.name.split(' ')[0]}!
                        </TextWithColor>
                        <TextWithColor style={{ fontSize: 13 }} color="rgba(128, 128, 128, 0.83)">
                            ¡Bienvenido a la sección de citas!
                            Aquí podrás ver tus citas y gestionarlas.
                        </TextWithColor>
                    </View>

                    <FilterCitas />

                </SafeAreaView>

                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: '76%' }}>
                    <FlatList 
                    data={citas}
                    showsVerticalScrollIndicator={false}
                    style={{ width: '90%', marginTop: 20, marginBottom: 20 }}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item }) => RenderItem(item)}
                    ListEmptyComponent={ListEmptyComponent}
                    onEndReachedThreshold={0.1}
                    />
                </View>
            </>    
        </AuthenticatedLayout>
    )
}


const styleCitasUser = StyleSheet.create({
    mainContent: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    }
})