import { SafeAreaView, View, ScrollView, Image, Animated, Alert, BackHandler } from "react-native";
import { useRef, useEffect, useState, useContext, useCallback } from "react";

// Components
import { StatusBar } from "expo-status-bar";
import TextWithColor from "@/app/shared/components/TextWithColor";
import AuthenticatedLayout from "../../../shared/components/AuthenticatedLayout";
import StatusBarApp from "../components/StatusBarApp";
import InfoApproach from "../components/InfoApproach/InfoApproach";
import FirstStepMain from "../components/FirstStep/FirstStepMain";

// Services
import { secureFetch } from "@/app/shared/services/secureFetch";
import { AuthContext } from "@/app/shared/context/ContextProvider";
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";

// Styles
import { styleDashboard } from "../styles/stylesDashboard";

// Constants
import { API_URl } from "@/app/config/api.breadriuss.config";
import { newCitas } from "@/app/shared/constants/mockCitas";
import { useGlobalState } from "@/app/store/zustand/useGlobalState";
import { useFocusEffect } from "@react-navigation/native";

export default function Main({ navigation }: INavGlobal) {
    const scrollY = useRef(new Animated.Value(0)).current
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loading, setLoading] = useState<boolean>(false)
    const { user, setUser } = useContext(AuthContext)
    const { setUser: setUserGlobal } = useGlobalState()

    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
          setScrollPosition(value);
        });
    
        return () => {
          scrollY.removeListener(listener);
        };
      }, [scrollY]);

    const verifySession = async () => {
        const { response, error } = await secureFetch({ options: {
            url: `${API_URl}/auth/verify?type=access_token`,
            method: 'GET',
            }, setLoading
        })

        if (error) {
            navigation.replace('Login')
            Alert.alert('BRD | Error de autenticación', `${error}`)
        }

        if (response) {
            setUserGlobal(response)
            setUser(response)
        }
    }

    useEffect(() => {
        if (!user.id) {
            verifySession()
        }
    }, [user])

    let restates = newCitas.length - 5

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                Alert.alert('BRD | Salir', '¿Estás seguro de querer salir de la aplicación?', [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Salir', onPress: () => BackHandler.exitApp() }
                ])
                return true
            }

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)
            return () => {
                subscription.remove()
            }
        }, [])
    )

    return (
        <>
        <AuthenticatedLayout>
            <ScrollView scrollEventThrottle={16} stickyHeaderIndices={[0]}
                onScroll={Animated.event([ { nativeEvent: { contentOffset: { y: scrollY } } } ], { useNativeDriver: false })}
                style={{ flexGrow: 1, width: '100%' }}
                >

                <StatusBarApp scrollPosition={scrollPosition} styleDashboard={styleDashboard} nav={{ navigation }}/>

                <SafeAreaView style={styleDashboard.dashboard}>
                    <StatusBar translucent backgroundColor={scrollPosition > 0 ? 'transparent' : 'transparent'} style="dark"/>

                    <View style={styleDashboard.mainContainer}>
                        <View style={styleDashboard.userDashboard}>
                            <TextWithColor style={{ fontSize: 24, fontWeight: 'bold' }} color="rgba(40, 40, 41, 0.83)">{loading ? 'Cargando...' : `¡Hola ${user.name.split(' ')[0]}!`}</TextWithColor>
                            <TextWithColor color="rgba(25, 25, 26, 0.53)">Bienvenido a tu dashboard.</TextWithColor>
                        </View>

                        <View style={styleDashboard.dashboardCitas}>
                            <TextWithColor style={{ fontSize: 20, fontWeight: 'bold' }} color="rgba(16, 16, 18, 0.83)">Pendientes</TextWithColor>
                            <TextWithColor color="rgba(51, 51, 51, 0.57)">Citas pendientes.</TextWithColor>

                            <View style={styleDashboard.newCitas}>
                                {
                                    newCitas.slice(0, 5).map((cita, index) => (
                                        <Image source={{ uri: cita.profilePic }} style={{ ...styleDashboard.picCitaInfo, opacity: index > 0 ? 1 - (index / newCitas.length) : 0.9 }} key={cita.id}/>
                                    ))
                                }
                                {newCitas.length > 5 ? <TextWithColor style={{ fontSize: 20 }} color="rgba(155, 123, 206, 0.83)">{`+${restates.toString()}`}</TextWithColor> : null}
                            </View>
                        </View>

                        <FirstStepMain user={user} navigation={navigation}/>

                        <View style={styleDashboard.citasRecientes}>
                            <TextWithColor style={{ fontSize: 20, fontWeight: 'bold' }} color="rgba(16, 16, 18, 0.83)">¿Como agendar una cita?</TextWithColor>
                            <TextWithColor color="rgba(51, 51, 51, 0.57)">Con este pequeño tutorial podrás aprender a como agendar tu cita de manera sencilla y en pocos taps.</TextWithColor>
                        </View>

                        <InfoApproach styleDashboard={styleDashboard} navigation={{ navigation }} />  
                    </View>
                </SafeAreaView>

            </ScrollView>
        </AuthenticatedLayout>
    </>
    )
}