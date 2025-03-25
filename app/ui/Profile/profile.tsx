import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import { SafeAreaView, View, Animated, ScrollView, TouchableOpacity, StyleSheet, useAnimatedValue, TextInput, Image, Alert, ActivityIndicator } from "react-native"

// Styles
import { styleDashboard } from "../dashboard/styles/stylesDashboard"

// Components
import { StatusBar } from "expo-status-bar"
import TextWithColor from "@/app/shared/components/TextWithColor"

// Hooks
import { useState, useContext, useRef, useEffect } from "react"
import { AuthContext } from "@/app/shared/context/ContextProvider"

// Constans
import { newCitas } from "@/app/shared/constants/mockCitas"
import { TYPES_ROLES } from "@/app/shared/constants/TypesRoles"
import { useGlobalState } from "@/app/store/zustand/useGlobalState"
import { generatorUID } from "@/app/shared/services/UUIDGenerator"
import { secureFetch } from "@/app/shared/services/secureFetch"
import { API_URl } from "@/app/config/api.breadriuss.config"

interface TypeProfileContador {
    id: string;
    expertises: string[];
    pro_contact: string[];
    description: string;
    is_verified: boolean;
    user_id: string;
}

export default function CreateProfileContador() {
    const scrollY = useRef(new Animated.Value(0)).current
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loading, setLoading] = useState<boolean>(false)
    const { user } = useContext(AuthContext)
    const [profile, setProfile] = useState<TypeProfileContador>({ id: ''
        , expertises: [], pro_contact: [], description: '', is_verified: false, user_id: user.id })

    const [expertise, setExpertise] = useState<string>('')
    const [contact, setContact] = useState<string>('')

    // Global state provided by Zustand
    const { SuMarroz } = useGlobalState()
 
    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
          setScrollPosition(value);
        });
    
        return () => {
          scrollY.removeListener(listener);
        };
      }, [scrollY]);

    const stateAim = useAnimatedValue(0)
    const translateLetters = Animated.timing(stateAim,  {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
    }).start()

    const addNewThing = (type: string): void => {
        if (type === 'contacts') {
            if (profile.pro_contact.length > 10) {
                return Alert.alert('BRD | Error', 'No puedes agregar más de 10 contactos!')
            }
            
            if (contact) {
                setProfile({...profile, pro_contact: [...profile.pro_contact, contact.trim()]})
                setContact('')
            }
        }

        if (type === 'expertises') {
            if (profile.expertises.length > 20) {
                return Alert.alert('BRD | Error', 'No puedes agregar más de 20 especialidades!')
            }
            
            if (expertise) {
                setProfile({...profile, expertises: [...profile.expertises, expertise.trim()]})
                setExpertise('')
            }   
        }

        return 
    }

    const removeThing = (index: number, type: string): void => {
        if (type === 'expertises') {
            const newExpertises = profile.expertises.filter((_, i) => i !== index)
            setProfile({...profile, expertises: newExpertises})
            setExpertise('')
        }

        if (type === 'contacts') {
            const newContacts = profile.pro_contact.filter((_, i) => i !== index)
            setProfile({...profile, pro_contact: newContacts})
            setContact('')
        }
    }

    const handleSumbit = async () => {
        if (!profile.description || !profile.expertises.length || !profile.pro_contact.length) {
            return Alert.alert('BRD | Error', 'No puedes dejar campos vacios!')
        }

        if (profile.description.length > 255) {
            return Alert.alert('BRD | Error', 'La descripcion no puede tener mas de 255 caracteres!')
        }

        if (profile.expertises.length < 2 || profile.pro_contact.length < 2) {
            return Alert.alert('BRD | Error', 'No puedes dejar menos de 2 especialidades o contactos!')
        }

        setProfile({...profile, id: generatorUID() })
        const { error, response } = await secureFetch({ 
            options: {
                url: `${API_URl}/user/save/profile`,
                method: 'POST',
                body: profile
            },
            setLoading
        })

        if (error) {
            return Alert.alert('BRD | Error', `${error}`)
        }

        if (response) {
            setProfile({ id: '', expertises: [], pro_contact: [], description: '', is_verified: false, user_id: user.id })
            return Alert.alert('BRD | Exito', '¡Tu Perfil ha sido creado con correctamente!')
        }
    }
    

    return (
        <AuthenticatedLayout>
            <ScrollView scrollEventThrottle={16}
                onScroll={Animated.event([ { nativeEvent: { contentOffset: { y: scrollY } } } ], { useNativeDriver: false })}
                style={{ flex: 1, width: '100%' }}>
                        
            <SafeAreaView style={stylesCitas.citasMain}>
                <StatusBar translucent backgroundColor={scrollPosition > 0 ? 'rgb(241, 241, 241)' : 'transparent'} style="dark"/>
            
                <View style={styleDashboard.mainContainer}>
                    <View style={stylesCitas.headerName}>
                        <View style={stylesCitas.decorationName}></View>
                        <View style={stylesCitas.decorationName2}></View>

                        <Animated.Text 
                            style={[stylesCitas.textName, { opacity: stateAim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }), transform: [{ translateY: stateAim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] }]}
                            >
                            {loading ? 'Cargando...' : `¡Hola ${user.name.split(' ')[0]}!`}
                        </Animated.Text>

                        <TextWithColor color="rgba(39, 39, 39, 0.64)" isAnimated={true}
                        style={{ opacity: stateAim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }), transform: [{ translateY: stateAim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }] }}
                        >Bienvenido al registro de perfil.</TextWithColor>
                    </View>
            
                    <View style={styleDashboard.citasRecientes}>
                        <TextWithColor style={{ fontSize: 20, fontWeight: 'bold' }} color="rgba(16, 16, 18, 0.83)">Detalles del Perfil</TextWithColor>
                        <TextWithColor color="rgba(51, 51, 51, 0.57)">Llena el formulario con los detalles relevantes.</TextWithColor>
                    </View>

                    <View style={stylesCitas.registerCitas}>

                        <View style={{ gap: 10, width: '100%' }}>
                            <View>
                                <TextWithColor style={{ fontSize: 14 }} color="rgba(16, 16, 18, 0.83)">Especialidades</TextWithColor>
                                <TextWithColor style={{ fontSize: 12 }} color="rgba(92, 92, 92, 0.83)">Tienes un limite de 20 para exhibir tus especialidades.</TextWithColor>
                            </View>
                            
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <TextInput style={{ width: '80%', borderWidth: 1, borderColor: 'rgb(159, 102, 209)', borderRadius: 12, paddingHorizontal: 10 }} 
                                onChangeText={text => setExpertise(text)}
                                value={expertise}
                                />
                                <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(155, 128, 255)', borderRadius: 12 }}
                                onPress={() => {
                                    addNewThing('expertises')
                                }}>
                                    <TextWithColor style={{ fontSize: 12, color: 'rgb(255, 255, 255)' }}>Añadir</TextWithColor>
                                </TouchableOpacity>
                            </View>

                            <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', width: '100%', flexWrap: 'wrap' }}>
                            {
                                profile.expertises.map((item, i) => (
                                        <TouchableOpacity onPress={() => {
                                            removeThing(i, 'expertises')
                                        }}>
                                            <Image source={require('@/assets/images/cross-expertise.png')} style={{ width: 14, height: 14, position: 'absolute', top: -7, right: -7 }} />
                                            <TextWithColor style={{ fontSize: 14, backgroundColor: 'rgb(155, 128, 255)', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 14 }} color="rgb(255, 255, 255)" key={i}>{item}</TextWithColor>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={{ gap: 10, width: '100%' }}>
                            <TextWithColor style={{ fontSize: 14 }} color="rgba(16, 16, 18, 0.83)">Información de Contacto</TextWithColor>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <TextInput style={{ width: '80%', borderWidth: 1, borderColor: 'rgb(159, 102, 209)', borderRadius: 12, paddingHorizontal: 10 }}
                                value={contact}
                                onChangeText={text => setContact(text)}
                                />
                                <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(155, 128, 255)', borderRadius: 12 }}
                                onPress={() => {
                                    addNewThing('contacts')
                                }}
                                >
                                    <TextWithColor style={{ fontSize: 12, color: 'rgb(255, 255, 255)' }}>Añadir</TextWithColor>
                                </TouchableOpacity>
                            </View>

                            <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', width: '100%', flexWrap: 'wrap' }}>
                            {
                                profile.pro_contact.map((item, i) => (
                                        <TouchableOpacity onPress={() => {
                                            removeThing(i, 'contacts')
                                        }}>
                                            <Image source={require('@/assets/images/cross-expertise.png')} style={{ width: 14, height: 14, position: 'absolute', top: -7, right: -7 }} />
                                            <TextWithColor style={{ fontSize: 14, backgroundColor: 'rgb(155, 128, 255)', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 14 }} color="rgb(255, 255, 255)" key={i}>{item}</TextWithColor>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={{ gap: 10, width: '100%' }}>
                            <TextWithColor style={{ fontSize: 14 }} color="rgba(16, 16, 18, 0.83)">Descripción breve sobre tí.</TextWithColor>
                            <TextInput style={{ width: '100%', alignItems: 'flex-start', borderWidth: 1, borderColor: 'rgb(159, 102, 209)', borderRadius: 12, paddingHorizontal: 10 }}
                            multiline numberOfLines={4}
                            value={profile.description}
                            onChange={(text) => {
                                setProfile({...profile, description: text.nativeEvent.text })
                            }}
                            />
                        </View>

                        <View style={{ gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                            {
                            !loading ?
                            <TouchableOpacity style={{ 
                                    width: '100%', justifyContent: 'center', 
                                    alignItems: 'center', backgroundColor: 'rgb(155, 128, 255)', 
                                    paddingVertical: 10, borderRadius: 12 }}
                                    onPress={async () => {
                                        await handleSumbit()
                                    }}>
                                <TextWithColor color="rgb(255, 255, 255)">Crear perfil</TextWithColor>
                            </TouchableOpacity> : 
                            <ActivityIndicator size="large" color="rgb(155, 128, 255)" />
                            }
                        </View>

                        <View style={styleDashboard.citasRecientes}>
                            <TextWithColor style={{ fontSize: 20, fontWeight: 'bold' }} color="rgba(16, 16, 18, 0.83)">Información de Usuario</TextWithColor>
                            <TextWithColor color="rgba(51, 51, 51, 0.57)">La información de tu usuario registrado se usará para complementar el perfil. Por favor verifica tus datos.</TextWithColor>
                        </View>

                        <View style={{ gap: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <TextWithColor style={{ fontSize: 14, backgroundColor: 'rgb(212, 212, 212)', paddingVertical: 3, paddingHorizontal: 10, borderRadius: 12, width: 'auto' }} color="rgba(16, 16, 18, 0.83)">Nombre</TextWithColor>
                            <TextWithColor>{user.name}</TextWithColor>
                        </View>

                        <View style={{ gap: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <TextWithColor style={{ fontSize: 14, backgroundColor: 'rgb(212, 212, 212)', paddingVertical: 3, paddingHorizontal: 10, borderRadius: 12, width: 'auto' }} color="rgba(16, 16, 18, 0.83)">Email</TextWithColor>
                            <TextWithColor>{user.email}</TextWithColor>
                        </View>

                        <View style={{ gap: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <TextWithColor style={{ fontSize: 14, backgroundColor: 'rgb(212, 212, 212)', paddingVertical: 3, paddingHorizontal: 10, borderRadius: 12, width: 'auto' }} color="rgba(16, 16, 18, 0.83)">Role</TextWithColor>
                            <TextWithColor>{user.role}</TextWithColor>
                        </View>

                        <View style={{ gap: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <TextWithColor style={{ fontSize: 14, backgroundColor: 'rgb(212, 212, 212)', paddingVertical: 3, paddingHorizontal: 10, borderRadius: 12, width: 'auto' }} color="rgba(16, 16, 18, 0.83)">Fecha de Creación</TextWithColor>
                            <TextWithColor>{new Date(user.created_at).toLocaleDateString('es-ES')}</TextWithColor>
                        </View>

                    </View>
                </View>


            </SafeAreaView>
        </ScrollView>
    </AuthenticatedLayout>
    )
}


const stylesCitas = StyleSheet.create({
    citasMain:{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center', 
        marginTop: 60,
        marginBottom: 45
    },
    decorationName: {
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: 'rgba(154, 101, 253, 0.91)',
        filter: 'blur(20px)',
        borderRadius: 50,
        right: '52%',
        top: '20%',
        pointerEvents: 'none',
        zIndex: -1
    },
    decorationName2:{
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: 'rgba(157, 175, 255, 0.91)',
        filter: 'blur(20px)',
        borderRadius: 50,
        left: '52%',
        top: '-20%',
        pointerEvents: 'none',
        zIndex: -1
    },
    headerName: {
        position: 'relative',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    registerCitas: {
        marginTop: 20,
        gap: 15
    },
    inputCitas: {
        backgroundColor: 'rgba(224, 224, 224, 0.89)',
        width: '100%',
        borderRadius: 12,
        borderColor: 'gray',
        borderWidth: 0.3,
        padding: 12
    }
})