import { SafeAreaView, View, FlatList, Alert, StatusBar, ActivityIndicator } from "react-native"
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
import { TypeFilter } from "../interfaces/TypeFilter"
import { RenderTypeStatus } from "../components/RenderTypeStatus"

interface TypesCitas {
    all: Cita[];
    pending: Cita[];
    confirmed: Cita[];
    canceled: Cita[];
    rescheduled: Cita[];
}

interface PaginationType {
    all: { skip: number; take: number; isEnd: boolean };
    pending: { skip: number; take: number; isEnd: boolean };
    confirmed: { skip: number; take: number; isEnd: boolean };
    canceled: { skip: number; take: number; isEnd: boolean };
    rescheduled: { skip: number; take: number; isEnd: boolean };
}

export default function CitaUser() {
    const { user } = useContext(AuthContext)
    const [pagination, setPagination] = useState<PaginationType>({
        all: { skip: 1, take: 10, isEnd: false },
        pending: { skip: 1, take: 10, isEnd: false },
        confirmed: { skip: 1, take: 10, isEnd: false },
        canceled: { skip: 1, take: 10, isEnd: false },
        rescheduled: { skip: 1, take: 10, isEnd: false },
    })
    const [loading, setLoading] = useState<boolean>(false)

    // Status of the filter
    const [filter, setFilter] = useState<TypeFilter>('all')
    const [filteredCitas, setFilteredCitas] = useState<TypesCitas>({
        all: [],
        pending: [],
        confirmed: [],
        canceled: [],
        rescheduled: [],
    })

    const MAIN_PART_URL = `${API_URl}/cita/get/all/byuserid/${user.id}`

    // I was about to use this function to do something but I can't remember what. xoxo
    // I'll leave it here to remember.
    // ily
    const resetPagination = () => {
        setPagination({
            all: { skip: 1, take: 10, isEnd: false },
            pending: { skip: 1, take: 10, isEnd: false },
            confirmed: { skip: 1, take: 10, isEnd: false },
            canceled: { skip: 1, take: 10, isEnd: false },
            rescheduled: { skip: 1, take: 10, isEnd: false },
        })
    }

    const getFilterdUrl = (fetchFilter: TypeFilter, pagination: PaginationType): string  => {
        const paginationConfig = pagination[fetchFilter]
        if (!paginationConfig) return 'Invalid fetchFilter.'

        return `${MAIN_PART_URL}?take=${paginationConfig.take}&skip=${paginationConfig.skip}&filter=${fetchFilter}`
    }

    const getAllFilteredData = async (filter: TypeFilter) => {
        if (pagination[filter].isEnd) {
            return
        }

        const FILTERED_URL = getFilterdUrl(filter, pagination)
        const { error, response } = await secureFetch({
            options: {
                url: FILTERED_URL,
                method: 'GET',
            },
            setLoading: setLoading
        })


        if (response) {
            if (response.length < pagination[filter].take) {
                setPagination({ ...pagination, [filter]: { ...pagination[filter], isEnd: true }})
            }

            setFilteredCitas({ ...filteredCitas, [filter]: response })
        }
    }

    useEffect(() => {
        getAllFilteredData(filter)
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
                            Aquí podrás ver tus citas y gestionarlas
                        </TextWithColor>
                    </View>

                    <FilterCitas filter={filter} setFilter={setFilter}/>
                </SafeAreaView>

                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: '76%' }}>
                    {
                        <FlatList 
                        data={filteredCitas[filter]}
                        showsVerticalScrollIndicator={false}
                        style={{ width: '90%', marginTop: 20, marginBottom: 20 }}
                        contentContainerStyle={{ gap: 10 }}
                        renderItem={({ item }) => <CardContentC item={item}/>}
                        ListEmptyComponent={<ListEmptyComponent type={filter} />}
                        onEndReachedThreshold={0.1}
                        onEndReached={() => {
                            if (!pagination[filter].isEnd && !loading) {
                                setPagination({ ...pagination, [filter]: { ...pagination[filter], skip: pagination[filter].skip + 1 } })
                                getAllFilteredData(filter)
                            }
                        }}
                        />
                    }
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

