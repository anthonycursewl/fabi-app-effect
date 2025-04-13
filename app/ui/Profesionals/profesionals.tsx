// Components
import { FlatList, View, SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, Modal, Alert, Animated } from "react-native"
// Components
import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import TextWithColor from "@/app/shared/components/TextWithColor"
// Services
import { secureFetch } from "@/app/shared/services/secureFetch"
import * as Clipboard from 'expo-clipboard'
// Hooks
import { useEffect, useRef, useState } from "react"
// Constants & Config
import { API_URl } from "@/app/config/api.breadriuss.config"
import { TypeProfileContador } from "../Profile/interfaces/TypeProfileContador"
import { ColorsApp } from "@/app/shared/constants/ColorsApp"


export default function Profesionals() {
    const [loading, setLoading] = useState<boolean>(false)
    const [pagination, setPagination] = useState<{ skip: number; take: number; isEnd: boolean }>({ skip: 1, take: 10, isEnd: false })
    const [profesionals, setProfesionals] = useState<TypeProfileContador[]>([])
    const maxLineLimit = 14
    const [showModalSucess, setShowModalSucess] = useState<boolean>(false)
    const scaleAnim = useRef(new Animated.Value(0)).current;

    const getProfesionalsData = async () => {
        if (pagination.isEnd) {
            console.log('BRD | No hay mas profesionales para mostrar.')
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
 
            setProfesionals([...profesionals, ...response])
        }
    }

    const handleCopyToClipboard = async (text: string) => {
        await Clipboard.setStringAsync(text)
        setShowModalSucess(true)
    }

    useEffect(() => {
        getProfesionalsData()
    }, [])

    useEffect(() => {
        if (showModalSucess) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,        
                tension: 60,        
                useNativeDriver: true
            }).start();
        } else {
            scaleAnim.setValue(0);
        }
    }, [showModalSucess, scaleAnim]);

    
    const CardProfesional = ({ item }: { item: TypeProfileContador }): JSX.Element => {
        return (
            <View style={styleProfesionals.cardProfesional}>
                <View style={styleProfesionals.infoProfesional}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image source={{ uri: item.users.icon_url }}
                        style={{ width: 40, height: 40, borderRadius: 50 }}
                        />

                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                <TextWithColor style={{ fontSize: 16 }}>{item.users.name}</TextWithColor>
                                {item.is_verified && <Image source={require('@/assets/images/verified-contador-img.png')}
                                style={{ width: 19, height: 19 }} 
                                />}
                            </View>

                            <TextWithColor color="gray">@{item.users.username}</TextWithColor>
                        </View>
                    </View>
                    <TextWithColor style={{ fontSize: 15 }}>{item.description}</TextWithColor>
                </View>

                <View style={{ gap: 5 }}>
                    <TextWithColor>Especialidades</TextWithColor>
                    <View style={styleProfesionals.expertisesProfesional}>
                        {item.expertises.map((expertise, index) => (
                            <TextWithColor key={index} style={styleProfesionals.contExpertises}>{expertise}</TextWithColor>
                        ))}
                    </View>
                </View>

                <View style={{ gap: 5 }}>
                    <TextWithColor>Medios de Contacto</TextWithColor>
                    <View style={styleProfesionals.contactProfesional}>
                        {item.pro_contact.map((contact, index) => (
                            <TouchableOpacity style={styleProfesionals.contContact} onPress={() =>handleCopyToClipboard(contact)}>
                                <TextWithColor key={index}
                                >{contact.slice(0, maxLineLimit) + '...'}</TextWithColor>
                                <Image source={require('@/assets/images/copy-all.png')} style={{ width: 15, height: 15 }}/>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View>
                    <TouchableOpacity style={styleProfesionals.btnVerPerfil}>
                        <TextWithColor style={{ fontSize: 14, color: 'white', textAlign: 'center' }}>Ver Perfil</TextWithColor>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <AuthenticatedLayout>
            <StatusBar translucent barStyle={'dark-content'} backgroundColor={'rgba(255, 255, 255, 0)'}/>
            <SafeAreaView style={styleProfesionals.mainProfesionals}>
                <View style={styleProfesionals.headerProfesionals}>
                    <TextWithColor style={{ fontSize: 20 }}>Profesionales Disponibles</TextWithColor>
                </View>

                <View style={{ width: '90%', height: '100%', flexGrow: 1, marginTop: 10 }}>
                    <FlatList
                    style={{ width: '100%', flexGrow: 1 }}
                    data={profesionals}
                    keyExtractor={(item) => item.id}                    
                    renderItem={CardProfesional}
                    onEndReached={() => {
                        if (!pagination.isEnd && !loading) {
                            setPagination({ ...pagination, skip: pagination.skip + 1 })
                            getProfesionalsData()
                        }
                    }}
                    onEndReachedThreshold={0.1}
                    />
                </View>

            </SafeAreaView>

            <Modal statusBarTranslucent visible={showModalSucess} animationType="fade"
            onRequestClose={() => setShowModalSucess(false)}>
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10, height: '100%', width: '100%' }}>
                    <View style={{ position: 'relative' }}>
                        <View style={styleProfesionals.backgroundDecorationCopy}></View>
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <Image source={require('@/assets/images/copy-success.png')} style={{ width: 80, height: 80 }}/>
                        </Animated.View>
                    </View>

                    <TextWithColor style={{ fontSize: 20, textAlign: 'center' }}>¡El texto ha sido copiado a portapapeles!</TextWithColor>

                    <TouchableOpacity style={styleProfesionals.buttonClose} onPress={() => setShowModalSucess(false)}>
                        <TextWithColor color="white" style={{ fontSize: 16, textAlign: 'center' }}>Cerrar</TextWithColor>
                    </TouchableOpacity>
                </View>
            </Modal>
        </AuthenticatedLayout>
    )
}

const styleProfesionals = StyleSheet.create({
    mainProfesionals: {
        width: '100%',
        height: '92%',
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerProfesionals: {
        width: '100%',
        marginTop: 45,
        paddingHorizontal: 20
    },
    // Card to show profesionals info
    cardProfesional: {
        padding: 10,
        width: '100%',
        backgroundColor: 'rgba(235, 235, 235, 0.82)',
        borderRadius: 10,
        marginBottom: 10,
        gap: 10,
        borderWidth: 1,
        borderColor: 'rgba(216, 216, 216, 0.97)'
    },
    infoProfesional: {
        gap: 10
    },
    expertisesProfesional: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5
    },
    contactProfesional: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 2
    }, 
    contExpertises: {
        borderRadius: 12,
        backgroundColor: ColorsApp.primary.color,
        paddingHorizontal: 8,
        paddingVertical: 4,
        color: 'white'
    },
    contContact: {
        borderRadius: 12,
        backgroundColor: 'rgb(221, 221, 221)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        color: 'white',
        fontFamily: 'OnestRegular',
        flexDirection: 'row',
        gap: 5
    },
    backgroundDecorationCopy: { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: 100, 
        height: 100, 
        backgroundColor: 'rgba(81, 224, 117, 0.47)',
        filter: 'blur(30px)'
    }, 
    buttonClose: {
        backgroundColor: ColorsApp.primary.color,
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 16, 
    },
    btnVerPerfil: {
        width: '100%',
        backgroundColor: ColorsApp.primary.color,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16
    }
})