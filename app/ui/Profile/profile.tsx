import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import { SafeAreaView, View, Animated, ScrollView, TouchableOpacity, useAnimatedValue, TextInput, Image, Alert, ActivityIndicator } from "react-native"
// Styles
import { styleDashboard } from "../dashboard/styles/stylesDashboard"
import { stylesCreateProfile } from "./styles/styleCreateProfile"
// Components
import { StatusBar } from "expo-status-bar"
import TextWithColor from "@/app/shared/components/TextWithColor"
// Hooks
import { useState, useContext, useRef, useEffect } from "react"
import { AuthContext } from "@/app/shared/context/ContextProvider"
// Constans
import { generatorUID } from "@/app/shared/services/UUIDGenerator"
import { secureFetch } from "@/app/shared/services/secureFetch"
import { API_URl } from "@/app/config/api.breadriuss.config"
// Interfaces
import { TypeProfileContador } from "./interfaces/TypeProfileContador"
import { useRoute } from "@react-navigation/native"

export default function CreateProfileContador() {
    const scrollY = useRef(new Animated.Value(0)).current
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loading, setLoading] = useState<boolean>(false)
    const { user } = useContext(AuthContext)

    const route = useRoute()
    const { currentProfile, path_ref } = route.params as { currentProfile: TypeProfileContador, path_ref: string }
    const [profile, setProfile] = useState<TypeProfileContador>({ 
        id: currentProfile.id || '', 
        expertises: currentProfile.expertises || [], 
        pro_contact: currentProfile.pro_contact || [], 
        description: currentProfile.description || '', 
        is_verified: currentProfile.is_verified || false, 
        user_id: user.id 
    })


    const [expertise, setExpertise] = useState<string>('')
    const [contact, setContact] = useState<string>('')
 
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

        const URL: string = path_ref === 'UpdateProfile' ? `${API_URl}/user/update/profile` : `${API_URl}/user/save/profile`
        const METHOD = path_ref === 'UpdateProfile' ? 'PUT' : 'POST'
        const { error, response } = await secureFetch({ 
            options: {
                url: URL,
                method: METHOD,
                body: {
                    id: generatorUID(),
                    expertises: profile.expertises,
                    pro_contact: profile.pro_contact,
                    description: profile.description,
                    is_verified: profile.is_verified,
                    user_id: profile.user_id
                }
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
                style={{ flexGrow: 1, width: '100%' }}>
                        
            <SafeAreaView style={stylesCreateProfile.citasMain}>
                <StatusBar translucent backgroundColor={scrollPosition > 0 ? 'rgb(241, 241, 241)' : 'transparent'} style="dark"/>
            
                <View style={styleDashboard.mainContainer}>
                    <View style={stylesCreateProfile.headerName}>
                        <View style={stylesCreateProfile.decorationName}></View>
                        <View style={stylesCreateProfile.decorationName2}></View>

                        <Animated.Text 
                            style={[stylesCreateProfile.textName, { opacity: stateAim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }), transform: [{ translateY: stateAim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] }]}
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

                    <View style={stylesCreateProfile.registerCitas}>

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
                                        }}
                                        key={i}
                                        >
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
                                        }}
                                        key={i}
                                        >
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
                                    onPress={() => {
                                        handleSumbit()
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