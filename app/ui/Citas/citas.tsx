import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import { SafeAreaView, View, Animated, ScrollView, TouchableOpacity, StyleSheet, useAnimatedValue, TextInput } from "react-native"

// Styles
import { styleDashboard } from "../dashboard/styles/stylesDashboard"

// Components
import { StatusBar } from "expo-status-bar"
import TextWithColor from "@/app/shared/components/TextWithColor"
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

// Hooks
import { useState, useContext, useRef, useEffect } from "react"
import { AuthContext } from "@/app/shared/context/ContextProvider"

// Constans
import { newCitas } from "@/app/shared/constants/mockCitas"
import { TYPES_ROLES } from "@/app/shared/constants/TypesRoles"

export default function Citas() {
    const scrollY = useRef(new Animated.Value(0)).current
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loading, setLoading] = useState<boolean>(false)
    const { user, setUser } = useContext(AuthContext)

    // State of the date
    const defaultStyles = useDefaultStyles();
    const [date, setDate] =useState<DateType>();

    // today xd
    const today = new Date();

    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
          setScrollPosition(value);
        });
    
        return () => {
          scrollY.removeListener(listener);
        };
      }, [scrollY]);

    useEffect(() => {
        console.log(user.role === TYPES_ROLES.USER)
    }, [])

    const stateAim = useAnimatedValue(0)
    const translateLetters = Animated.timing(stateAim,  {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
    }).start()

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
                        <View>
                            <TextWithColor style={{ fontSize: 14 }} color="rgba(16, 16, 18, 0.83)">Descripción / Motivo</TextWithColor>
                            <TextWithColor style={{ fontSize: 12 }} color="rgba(92, 92, 92, 0.83)">Tienes un limite de 20 para exhibir tus especialidades.</TextWithColor>
                        </View>                     
                        <TextInput style={{ width: '100%', borderWidth: 1, borderColor: 'rgb(159, 102, 209)', borderRadius: 12, paddingHorizontal: 10 }} 
                        multiline
                        />

                        <View>
                            <TextWithColor style={{ fontSize: 14 }} color="rgba(16, 16, 18, 0.83)">Fecha para la cita</TextWithColor>
                            <TextWithColor style={{ fontSize: 12 }} color="rgba(92, 92, 92, 0.83)">Elige el espcialista de tu preferencia para revisar su disponibilidad.</TextWithColor>
                        </View>

                        <DateTimePicker mode="single" date={date} 
                        onChange={({ date }) => setDate(date)}
                        minDate={today}
                        styles={defaultStyles}/>           

                      

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