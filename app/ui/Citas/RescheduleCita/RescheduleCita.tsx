import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import { SafeAreaView, View, Animated, ScrollView, useAnimatedValue, TextInput, Alert, ActivityIndicator, TouchableOpacity } from "react-native"

// Styles
import { styleDashboard } from "../../dashboard/styles/stylesDashboard"
import { stylesCitas } from "../styles/stylesRegisterCita"

// Components
import { StatusBar } from "expo-status-bar"
import TextWithColor from "@/app/shared/components/TextWithColor"
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { CustomTimePicker } from "../components/PickerTime"

// Hooks
import { useState, useContext, useRef, useEffect } from "react"
import { AuthContext } from "@/app/shared/context/ContextProvider"

// Constans
import { ColorsApp } from "@/app/shared/constants/ColorsApp"
import { secureFetch } from "@/app/shared/services/secureFetch"
import { API_URl } from "@/app/config/api.breadriuss.config"
import { TYPES_STATUS_CITAS } from "@/app/shared/constants/TypesStatusCitas"
import { schedule } from "../constants/schedule"

// interfaces
import { Cita, CitasCont } from "@/app/shared/interfaces/CitaType"
import { TimePickerType } from "../interfaces/CustomPickerTime"

// Services
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal"
import { useRoute } from "@react-navigation/native"
import { useCitasStore } from "@/app/store/zustand/useCitaStore"

export default function RescheduleCita({ navigation }: INavGlobal) {
    const route = useRoute()
    const { item, path_ref } = route.params as { item: CitasCont, path_ref: string }
    const scrollY = useRef(new Animated.Value(0)).current
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loading, setLoading] = useState<boolean>(false)
    const { user } = useContext(AuthContext)

    // Store de la citas
    const { updateCitaCont, updateCita } = useCitasStore()

    // State of the date
    const defaultStyles = useDefaultStyles();
    const [date, setDate] =useState<DateType>();

    // Test of the picker
    const [time, setTime] = useState<TimePickerType>({ value: item.hour, label: item.hour })
    
    // Initial data to update
    const [cita, setCita] = useState<Cita>({
        id: item.id,
        des_or_reason: item.des_or_reason,
        date: date,
        status: TYPES_STATUS_CITAS.RESCHEDULED,
        user_id: item.user_id,
        cont_id: item.cont_id,
        hour: time.value
    })
    // Time picker info

    // Instance if the date
    const today = new Date();

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

    const handleRescheduleCita = async () => {
        if (date === undefined || time.value === '' || cita.des_or_reason === '') {
            return Alert.alert('BRD | Un error ha ocurrido', 'Por favor, completa todos los campos de fechas y motivo.')
        } 

        // Verificar si la cita no es en un domingo
        if (`${date}`.includes('Sun')) {
            return Alert.alert('BRD | Un error ha ocurrido', 'No puedes agendar una cita en un domingo.')
        }
        
        const { response, error } = await secureFetch({
            options: {
                url: `${API_URl}/cita/update/cita/${item.id}`,
                method: 'PUT',
                body: {
                    date: date,
                    hour: time.value,
                    des_or_reason: cita.des_or_reason,
                    status: TYPES_STATUS_CITAS.RESCHEDULED
                }
                }, setLoading
            })

            if (error) {
                Alert.alert('BRD | Un error ha ocurrido', `${error}`)
            }

            if (response) {
                setTime({ value: '', label: '' })
                setCita({ id: '', des_or_reason: '', date: '', cont_id: '', status: '', user_id: '', hour: '' })
                if (path_ref === 'CitasPendingCont') {
                    updateCitaCont(item)
                }

                if (path_ref === 'CitasUser') {
                    updateCita(cita)
                }
                navigation.replace(path_ref)

                return Alert.alert('BRD | Cita creada', 'La cita ha sido reprogramada con éxito!')
            }
        }

    return (
        <AuthenticatedLayout>
            <ScrollView scrollEventThrottle={16}
                onScroll={Animated.event([ { nativeEvent: { contentOffset: { y: scrollY } } } ], { useNativeDriver: false })}
                style={{ flexGrow: 1, width: '100%' }}>
                        
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
                        <TextInput style={{ width: '100%', borderWidth: 1, borderColor: ColorsApp.primary.color, borderRadius: 12, paddingHorizontal: 10 }} 
                        multiline 
                        placeholder="Escribe tu motivo..."
                        value={cita.des_or_reason}
                        onChangeText={text => setCita({ ...cita, des_or_reason: text })}
                        />

                        <View>
                            <TextWithColor style={{ fontSize: 14 }} color="rgba(16, 16, 18, 0.83)">Especialista</TextWithColor>
                            <TextWithColor style={{ fontSize: 12 }} color="rgba(92, 92, 92, 0.83)">Aquí tienes una lista de especialistas para elegir de tu preferencia. Haz tap aquí para ver la lista más a detalle.</TextWithColor>
                        </View>

                        <TextWithColor style={{ fontSize: 16, fontWeight: 'bold' }} color="rgba(255, 83, 83, 0.83)">
                            No puedes cambiar el especialista de la cita. 
                        </TextWithColor>

                        <View>
                            <TextWithColor style={{ fontSize: 14 }} color="rgba(16, 16, 18, 0.83)">Fecha para la cita</TextWithColor>
                            <TextWithColor style={{ fontSize: 12 }} color="rgba(92, 92, 92, 0.83)">Elige el espcialista de tu preferencia para revisar su disponibilidad.</TextWithColor>
                        </View>

                        <DateTimePicker mode="single" date={date} 
                        onChange={({ date }) => setDate(date)}
                        minDate={today}
                        styles={defaultStyles}/>    

                        <View style={{ marginBottom: 20 }}>
                            <CustomTimePicker 
                            items={schedule} 
                            selectedValue={time} 
                            onValueChange={setTime} 
                            placeholder="Selecciona la hora de la cita..." 
                            loadMore={() => {}}
                            setPagination={() => {}}
                            pagination={{ skip: 0, take: 10, isEnd: false }}
                            />
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {
                        !loading ?
                            <TouchableOpacity style={{ backgroundColor: ColorsApp.primary.color, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 18, width: '100%', alignItems: 'center' }}
                            onPress={handleRescheduleCita}
                            >
                            <TextWithColor style={{ fontSize: 15 }} color="rgba(255, 255, 255, 0.83)">Actualizar cita</TextWithColor>
                        </TouchableOpacity> :
                        <View>
                            <ActivityIndicator size="large" color={ColorsApp.primary.color} />
                        </View>
                        }
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    </AuthenticatedLayout>
    )
}