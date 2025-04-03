import { SafeAreaView, View, FlatList, Alert, StatusBar } from "react-native"
import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import { useContext, useEffect, useState } from "react"
import { StyleSheet } from "react-native"

// Components
import TextWithColor from "@/app/shared/components/TextWithColor"
import FilterCitas from "../components/FilterCitas"
import { ListEmptyComponent } from "../components/ListEmptyComponent"
import { CardContentC } from "../components/CardContentC"
// Constants
import { API_URl } from "@/app/config/api.breadriuss.config"
// Services
import { AuthContext } from "@/app/shared/context/ContextProvider"
import { secureFetch } from "@/app/shared/services/secureFetch"

// Interfaces
import { Cita } from "@/app/shared/interfaces/CitaType"

interface TypesCitas {
    all: Cita[];
    pending: Cita[];
    confirmed: Cita[];
    canceled: Cita[];
    rescheduled: Cita[];
}

export default function CitaUser() {
    const { user } = useContext(AuthContext)
    const [pagination, setPagination] = useState({ skip: 1, take: 10, isEnd: false })
    const [loading, setLoading] = useState<boolean>(false)

    // Status of the filter
    const [filter, setFilter] = useState<string>('all')
    const [filteredCitas, setFilteredCitas] = useState<TypesCitas>({
        all: [],
        pending: [],
        confirmed: [],
        canceled: [],
        rescheduled: [],
    })

    const MAIN_PART_URL = `${API_URl}/cita/get/all/byuserid/${user.id}`
    // Move this to a function.
    const FILTER_URL = `${MAIN_PART_URL}?take=${pagination.take}&skip=${pagination.skip}&filter=${filter}` 

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
            if (response.length < pagination.take) {
                setPagination({ ...pagination, isEnd: true })
            }

            if (filter === 'all') {
                setFilteredCitas(prev => ({ ...prev, all: [...prev.all, ...response] }))
            }

            if (filter === 'pending') {
                setFilteredCitas(prev => ({ ...prev, pending: [...prev.pending, ...response] }))
            }

            if (filter === 'confirmed') {
                setFilteredCitas(prev => ({ ...prev, confirmed: [...prev.confirmed, ...response] }))
            }

            if (filter === 'canceled') {
                setFilteredCitas(prev => ({ ...prev, canceled: [...prev.canceled, ...response] }))
            }

            if (filter === 'rescheduled') {
                setFilteredCitas(prev => ({ ...prev, rescheduled: [...prev.rescheduled, ...response] }))
            }
        }
    }

    useEffect(() => {
        getAllData()
    }, [filter])


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

                    <FilterCitas filter={filter} setFilter={setFilter}/>
                </SafeAreaView>

                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: '76%' }}>
                    <FlatList 
                    data={
                        filter === 'all' ? filteredCitas.all :
                        filter === 'pending' ? filteredCitas.pending :
                        filter === 'confirmed' ? filteredCitas.confirmed :
                        filter === 'canceled' ? filteredCitas.canceled :
                        filteredCitas.rescheduled
                    }
                    showsVerticalScrollIndicator={false}
                    style={{ width: '90%', marginTop: 20, marginBottom: 20 }}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item }) => CardContentC(item)}
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