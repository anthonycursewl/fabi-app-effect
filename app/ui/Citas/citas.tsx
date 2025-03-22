import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import { SafeAreaView, View, Animated, ScrollView, TouchableOpacity, StyleSheet, useAnimatedValue, TextInput } from "react-native"

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

export default function Citas() {
    const scrollY = useRef(new Animated.Value(0)).current
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loading, setLoading] = useState<boolean>(false)
    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
          setScrollPosition(value);
        });
    
        return () => {
          scrollY.removeListener(listener);
        };
      }, [scrollY]);


     let restates = newCitas.length - 5
    const testImage = 'https://png.pngtree.com/background/20230616/original/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-picture-image_3653595.jpg'


    const fakeDataToLoad = [
        { id: 1, title: 'Cita 1', description: 'Descripción de la cita 1', date: '2023-04-05', time: '10:00 AM', status: 'Pendiente', profilePic: testImage },
        { id: 2, title: 'Cita 2', description: 'Descripción de la cita 2', date: '2023-04-06', time: '11:00 AM', status: 'Pendiente', profilePic: testImage },
        { id: 3, title: 'Cita 3', description: 'Descripción de la cita 3', date: '2023-04-07', time: '12:00 PM', status: 'Pendiente', profilePic: testImage },
        { id: 4, title: 'Cita 4', description: 'Descripción de la cita 4', date: '2023-04-08', time: '1:00 PM', status: 'Pendiente', profilePic: testImage },
        { id: 5, title: 'Cita 5', description: 'Descripción de la cita 5', date: '2023-04-09', time: '2:00 PM', status: 'Pendiente', profilePic: testImage },
        { id: 6, title: 'Cita 6', description: 'Descripción de la cita 6', date: '2023-04-09', time: '3:00 PM', status: 'Pendiente', profilePic: testImage },
        { id: 7, title: 'Cita 7', description: 'Descripción de la cita 7', date: '2023-04-09', time: '4:00 PM', status: 'Pendiente', profilePic: testImage },
    ]


    const CitaCard = ({ cita }: { cita: any }) => {
        return (
            <View>
                <TextWithColor style={{ fontSize: 16, fontWeight: 'bold' }} color="rgba(40, 40, 41, 0.83)">{cita.title}</TextWithColor>
                <TextWithColor color="rgba(25, 25, 26, 0.53)">{cita.description}</TextWithColor>
            </View>
        )
    }
    const stateAim = useAnimatedValue(0)
    const translateLetters = Animated.timing(stateAim,  {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
    }).start()
    

    return (
        <AuthenticatedLayout>
            <ScrollView scrollEventThrottle={16}
                onScroll={Animated.event([ { nativeEvent: { contentOffset: { y: scrollY } } } ], { useNativeDriver: true })}
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
                        >Bienvenido al registro de citas.</TextWithColor>
                    </View>
            
                    <View style={styleDashboard.dashboardDescription}>
                        <TextWithColor color="rgba(19, 19, 19, 0.83)" style={{ fontSize: 24, opacity: stateAim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }), transform: [{ translateX: stateAim.interpolate({ inputRange: [0, 1], outputRange: [-100, 0] }) }] }}
                        isAnimated
                        >Maneja tu agenda de citas de la <TextWithColor color="rgba(167, 114, 252, 0.83)" style={{ fontWeight: 'bold' }}>Mejor</TextWithColor> manera! Empieza a registrar.</TextWithColor>
                    </View>
            
            
                    <View style={styleDashboard.citasRecientes}>
                        <TextWithColor style={{ fontSize: 20, fontWeight: 'bold' }} color="rgba(16, 16, 18, 0.83)">Detalles</TextWithColor>
                        <TextWithColor color="rgba(51, 51, 51, 0.57)">Llena el formulario con los detalles relevantes.</TextWithColor>
                    </View>

                    <View style={stylesCitas.registerCitas}>
                        <View style={{ gap: 10 }}>
                            <TextWithColor style={{ fontSize: 14 }} color="rgba(16, 16, 18, 0.83)">Descripción / Motivo</TextWithColor>
                            <TextInput style={stylesCitas.inputCitas}/>
                        </View>

                        <View style={{ gap: 10 }}>
                            <TextWithColor style={{ fontSize: 14 }} color="rgba(16, 16, 18, 0.83)">Fecha</TextWithColor>
                            <TextInput style={stylesCitas.inputCitas}/>
                        </View>

                        <View style={{ gap: 10 }}>
                            <TextWithColor style={{ fontSize: 14 }} color="rgba(16, 16, 18, 0.83)">Hora</TextWithColor>
                            <TextInput style={stylesCitas.inputCitas}/>
                        </View>

                        <View style={{ gap: 10 }}>
                            <TextWithColor style={{ fontSize: 14 }} color="rgba(16, 16, 18, 0.83)">Profesional</TextWithColor>
                            <TextInput style={stylesCitas.inputCitas}/>
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
        justifyContent: 'center',
        alignItems: 'center', 
        marginTop: 40
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