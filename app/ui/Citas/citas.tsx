import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import { SafeAreaView, View, Animated, ScrollView, useAnimatedValue, TextInput, Alert, ActivityIndicator, TouchableOpacity, BackHandler } from "react-native"

// Styles
import { styleDashboard } from "../dashboard/styles/stylesDashboard"
import { stylesCitas } from "./styles/stylesRegisterCita"

// Components
import { StatusBar } from "expo-status-bar"
import TextWithColor from "@/app/shared/components/TextWithColor"
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { CustomPicker } from "./components/CustomPicker"
import { CustomTimePicker } from "./components/PickerTime"

// Hooks
import { useState, useContext, useRef, useEffect } from "react"
import { AuthContext } from "@/app/shared/context/ContextProvider"

// Constans
import { ColorsApp } from "@/app/shared/constants/ColorsApp"
import { secureFetch } from "@/app/shared/services/secureFetch"
import { API_URl } from "@/app/config/api.breadriuss.config"
import { TYPES_STATUS_CITAS } from "@/app/shared/constants/TypesStatusCitas"
import { schedule } from "./constants/schedule"

// interfaces
import { ContadorProfileData } from "@/app/shared/interfaces/ContadorProfile"
import { Cita } from "@/app/shared/interfaces/CitaType"
import { TimePickerType } from "./interfaces/CustomPickerTime"
import { PaginationType } from "./interfaces/PaginationTypes"

// Services
import { generatorUID } from "@/app/shared/services/UUIDGenerator"
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal"

export default function Citas({ navigation }: INavGlobal) {
    const scrollY = useRef(new Animated.Value(0)).current
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingMore, setLoadingMore] = useState<boolean>(false)
    const { user } = useContext(AuthContext)

    // State of the date
    const defaultStyles = useDefaultStyles();
    const [date, setDate] =useState<DateType>();

    // Test of the picker
    const [selectedValue, setSelectedValue] = useState<ContadorProfileData | null>(null);
    const [conts, setConts] = useState<ContadorProfileData[]>([])
    // store data to register
    const [cita, setCita] = useState<Cita>({} as Cita)
    // Time picker info
    const [time, setTime] = useState<TimePickerType>({ value: '', label: '' })
    const [pagination, setPagination] = useState<PaginationType>({ skip: 1, take: 10, isEnd: false })
    let isMounted = false

    const getAllCont = async () => {
        isMounted = true
        if (pagination.isEnd) {
            return
        }

        if (loading) {
            return
        }

        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/user/all/cont?take=${pagination.take}&skip=${pagination.skip}&filter=rs-data`,
                method: 'GET',
            },
            setLoading: isMounted ? setLoadingMore : setLoading
        })

        if (error) {
            return Alert.alert('BRD | Un error ha ocurrido', `${error}`)
        }

        if (response) {
            if (response.length < pagination.take) {
                setPagination({ ...pagination, isEnd: true })
            }

            setPagination({ ...pagination, skip: pagination.skip + 1 })
            setConts([...conts, ...response])
        }
    }

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
        getAllCont()
    }, [])

    const stateAim = useAnimatedValue(0)
    const translateLetters = Animated.timing(stateAim,  {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
    }).start()

    const handleRegisterCita = async () => {
        if (!selectedValue || date === undefined || time.value === '' || cita.des_or_reason === '') {
            return Alert.alert('BRD | Un error ha ocurrido', 'Por favor, completa todos los campos.')
        }

        // Verificar si la cita no es en un domingo
        if (`${date}`.includes('Sun')) {
            return Alert.alert('BRD | Un error ha ocurrido', 'No puedes agendar una cita en un domingo.')
        }   

        const newCita = {
            id: generatorUID(),
            des_or_reason: cita.des_or_reason,
            date: date, 
            cont_id: selectedValue.id,
            status: TYPES_STATUS_CITAS.PENDING,
            user_id: user.id,
            hour: time.value
        }
        
        const { response, error } = await secureFetch({
            options: {
                url: `${API_URl}/cita/save`,
                method: 'POST',
                body: newCita
            }, setLoading})

            if (error) {
                Alert.alert('BRD | Un error ha ocurrido', `${error}`)
            }

            if (response) {
                setTime({ value: '', label: '' })
                setSelectedValue(null)
                setCita({ id: '', des_or_reason: '', date: '', cont_id: '', status: '', user_id: '', hour: '' })    
                return Alert.alert('BRD | Cita creada', 'La cita ha sido creada con exito.')
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
                        {
                            !loading ? 
                            <CustomPicker 
                            items={conts} 
                            selectedValue={selectedValue} 
                            onValueChange={setSelectedValue} 
                            placeholder="Selecciona a tu especialista..."
                            loadMoreData={getAllCont}
                            /> :
                            <View>
                                <ActivityIndicator size="large" color={ColorsApp.primary.color} />
                            </View>
                        }

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
                            loadMore={getAllCont}
                            pagination={pagination}
                            setPagination={setPagination}
                            />
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {
                        !loading ?
                            <TouchableOpacity style={{ backgroundColor: ColorsApp.primary.color, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 18, width: '100%', alignItems: 'center' }}
                            onPress={handleRegisterCita}
                            >
                            <TextWithColor style={{ fontSize: 15 }} color="rgba(255, 255, 255, 0.83)">Registrar cita</TextWithColor>
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