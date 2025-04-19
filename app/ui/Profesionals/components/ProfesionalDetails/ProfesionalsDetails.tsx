import { SafeAreaView, StyleSheet, View, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";
import { useRoute } from "@react-navigation/native";
import { TypeProfileContador } from "@/app/ui/Profile/interfaces/TypeProfileContador";
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";
import { ColorsApp } from "@/app/shared/constants/ColorsApp";
import { useEffect, useState } from "react";
import { secureFetch } from "@/app/shared/services/secureFetch";
import { API_URl } from "@/app/config/api.breadriuss.config";

// components
import ModalShowState from "@/app/shared/components/ModalShowState";

interface RouteParams {
    key: string
    name: string
    params: {
        item: TypeProfileContador
    }
    path?: string | undefined
}

export default function ProfesionalDetails({ navigation }: INavGlobal) {
    const route = useRoute<RouteParams>()
    const item = route.params.item
    const [profesional, setProfesional] = useState<TypeProfileContador>(item)
    const [loading, setLoading] = useState<boolean>(false)
    const [reload, setReload] = useState<number>(0)

    const getDataProfesional = async () => {
        if (item.description.length !== 0 && reload === 0) return

        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/user/profile/${item.id}`,
                method: 'GET',
            },
            setLoading,
        })
        if (error) {
            Alert.alert('Error', `${error}`)
        }

        if (response) {
            setProfesional(response)
        }
    }

    useEffect(() => {
        getDataProfesional()
    }, [reload])

    return (
        <SafeAreaView style={styleProfesionalsDetails.mainProfesionalDetails}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '95%', flexGrow: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 40 }}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Image source={require('@/assets/icons/arrow-back-img.png')} style={{ width: 28, height: 28 }}/>
                    </TouchableOpacity>
                    
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        <TouchableOpacity onPress={() => {setReload(reload + 1)}}>
                            <Image source={require('@/assets/icons-togoback/reload-icon.png')} style={{ width: 28, height: 28 }}/>
                        </TouchableOpacity>
                        <Image source={require('@/assets/icons-togoback/profesionals-icons.png')} style={{ width: 28, height: 28 }}/>
                    </View>
                </View>

                <View style={styleProfesionalsDetails.subMainProfesionalDetails}>
                    <View style={styleProfesionalsDetails.header}>
                        <View style={{ gap: 5, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={{ uri: profesional.users?.icon_url }} style={{ width: 80, height: 80, borderRadius: 100 }}/>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <TextWithColor style={{ fontSize: 20 }}>{profesional.users?.name}</TextWithColor>
                                <TextWithColor style={{ fontSize: 15, color: 'rgba(128, 128, 128, 0.83)', transform: [{ translateY: -4 }] }}>@{profesional.users?.username}</TextWithColor>
                            </View>
                            {
                            profesional.is_verified &&
                            <TextWithColor style={{ fontSize: 20 }}>image svg</TextWithColor>
                        }
                        </View>

                        <TextWithColor>{profesional.description}</TextWithColor>
                    </View>


                    <View style={{ width: '100%', gap: 25, marginTop: 20 }}>
                        <View style={styleProfesionalsDetails.containerSeparator}>
                            <TextWithColor style={{ fontSize: 18 }}>Contacto</TextWithColor>
                            <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                                {profesional.pro_contact.map((contact, index) => (
                                    <TextWithColor key={index} style={styleProfesionalsDetails.contactCard}>{contact}</TextWithColor>
                                ))}
                            </View>
                        </View>
                        
                        <View style={styleProfesionalsDetails.containerSeparator}>
                            <TextWithColor style={{ fontSize: 18 }}>Especialidades</TextWithColor>
                            <View style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                                {profesional.expertises.map((expertise, index) => (
                                    <TextWithColor key={index} style={styleProfesionalsDetails.contactCard}>{expertise}</TextWithColor>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView> 

            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 5 }}>
                <TextWithColor style={{ fontSize: 12, textAlign: 'center', color: 'rgba(128, 128, 128, 0.83)' }}>Si quieres agendar con este profesional, puedes hacerlo ya! Solo presiona agendar y se te redirigirá a la pantalla de agendar.</TextWithColor>
                <TouchableOpacity style={styleProfesionalsDetails.buttonSchedule} onPress={() => {navigation.replace('Citas') }}>
                    <TextWithColor style={{ fontSize: 15, color: 'rgba(243, 243, 243, 0.83)', textAlign: 'center' }}>Agendar</TextWithColor>
                </TouchableOpacity>
            </View>

            <ModalShowState stateModal={loading} setActiveModal={setLoading} message="Cargando detalles. Por favor espere..." />
        </SafeAreaView>
    )
}

/* Pendign create a pattern of design */
const styleProfesionalsDetails = StyleSheet.create({
    mainProfesionalDetails: {
        padding: 10,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    header: {
        marginTop: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    subMainProfesionalDetails: { 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    contactCard: {
        backgroundColor: 'rgb(224, 224, 224)',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12
    },
    containerSeparator: { 
        width: '100%', 
        gap: 10 
    },
    buttonSchedule: {
        width: '100%',
        backgroundColor: ColorsApp.primary.color,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16
    }
})