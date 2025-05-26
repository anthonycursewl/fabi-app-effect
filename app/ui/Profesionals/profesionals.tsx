// Components
import { FlatList, View, SafeAreaView, Alert } from "react-native"
// Components
import { StatusBar } from "expo-status-bar"
import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import TextWithColor from "@/app/shared/components/TextWithColor"
import ModalShowState from "@/app/shared/components/ModalShowState"
// Services
import { secureFetch } from "@/app/shared/services/secureFetch"
// Hooks
import { useEffect, useState } from "react"
// Constants & Config
import { API_URl } from "@/app/config/api.breadriuss.config"
import { TypeProfileContador } from "../Profile/interfaces/TypeProfileContador"
// styles
import { styleProfesionals } from "./styles/styleProfesionals"
import { CardProfesional } from "./components/CardProfesional/CardProfesional"
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal"

export default function Profesionals({ navigation }: INavGlobal) {
    // States of the component
    const [loading, setLoading] = useState<boolean>(false)
    const [pagination, setPagination] = useState<{ skip: number; take: number; isEnd: boolean }>({ skip: 1, take: 10, isEnd: false })
    const [profesionals, setProfesionals] = useState<TypeProfileContador[]>([])
    const [showModalSucess, setShowModalSucess] = useState<boolean>(false)
    
    {/* We gotta move this function to a object with methods in the future */}
    const getProfesionalsData = async () => {
        if (pagination.isEnd) {
            console.log('BRD | No hay mas profesionales para mostrar.')
            return
        }

        if (loading) {
            return
        }

        const { response, error } = await secureFetch({
            options: {
                url: `${API_URl}/user/all/cont?take=${pagination.take}&skip=${pagination.skip}&filter=all-data`,
                method: 'GET'
            },
            setLoading
        })

        if (error) {
            console.log(error)
            Alert.alert('BRD | Un error ha ocurrido', `${error}`)
        }

        if (response) {
            if (response.length < pagination.take) {
                setPagination({ ...pagination, isEnd: true })
            }
            
            setPagination({ ...pagination, skip: pagination.skip + 1 })
            setProfesionals([...profesionals, ...response])
        }
    }

    useEffect(() => {
        getProfesionalsData()
    }, [])

    return (
        <AuthenticatedLayout>
            <StatusBar translucent style="dark"/>
            <SafeAreaView style={styleProfesionals.mainProfesionals}>
                <View style={styleProfesionals.headerProfesionals}>
                    <TextWithColor style={{ fontSize: 20 }}>Profesionales Disponibles</TextWithColor>
                </View>

                <View style={{ width: '90%', height: '50%', flexGrow: 1, marginTop: 10 }}>
                    <FlatList
                    style={{ width: '100%', flexGrow: 1 }}
                    data={profesionals}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}                    
                    renderItem={({ item }) => (
                        <CardProfesional item={item} setShowModalSucess={setShowModalSucess} nav={{ navigation }}/>
                    )}
                    onEndReached={() => {
                        getProfesionalsData()
                    }}
                    onEndReachedThreshold={0.1}
                    />
                </View>
            </SafeAreaView>

            <ModalShowState setActiveModal={setShowModalSucess} stateModal={showModalSucess}/>
        </AuthenticatedLayout>
    )
}