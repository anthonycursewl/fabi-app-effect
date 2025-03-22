import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import { SafeAreaView, View, Animated, ScrollView, TouchableOpacity, Image } from "react-native"

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
    

    return (
        <AuthenticatedLayout>
            <ScrollView scrollEventThrottle={16}
                            onScroll={Animated.event([ { nativeEvent: { contentOffset: { y: scrollY } } } ], { useNativeDriver: false })}
                            style={{ flex: 1, width: '100%' }}
                            >
                        
                            <SafeAreaView style={styleDashboard.dashboard}>
                                <StatusBar translucent backgroundColor={scrollPosition > 0 ? 'rgb(241, 241, 241)' : 'transparent'} style="dark"/>
            
                                <View style={styleDashboard.mainContainer}>
                                    <View style={styleDashboard.userDashboard}>
                                        <TextWithColor style={{ fontSize: 24, fontWeight: 'bold' }} color="rgba(40, 40, 41, 0.83)">{loading ? 'Cargando...' : `¡Hola ${user.name.split(' ')[0]}!`}</TextWithColor>
                                        <TextWithColor color="rgba(25, 25, 26, 0.53)">Bienvenido a tu dashboard.</TextWithColor>
                                    </View>
            
                                    <View style={styleDashboard.dashboardCitas}>
                                        <TextWithColor style={{ fontSize: 20, fontWeight: 'bold' }} color="rgba(20, 20, 20, 0.88)">Pendientes</TextWithColor>
                                        <TextWithColor color="rgba(51, 51, 51, 0.57)">Citas pendientes.</TextWithColor>
            
                                        <View style={styleDashboard.newCitas}>
                                            {
                                                newCitas.slice(0, 5).map((cita, _) => (
                                                    <>
                                                        <Image source={{ uri: cita.profilePic }} style={{ ...styleDashboard.picCitaInfo, opacity: _ > 0 ? 1 - (_ / newCitas.length) : 0.9 }} key={cita.id}/>
                                                    </>
                                                ))
                                            }
                                            {newCitas.length > 5 ? <TextWithColor style={{ fontSize: 20 }} color="rgba(155, 123, 206, 0.83)">{`+${restates.toString()}`}</TextWithColor> : null}
                                        </View>
                                    </View>
            
                                    <View style={styleDashboard.dashboardDescription}>
                                        <TextWithColor color="rgba(19, 19, 19, 0.83)" style={{ fontSize: 24 }}>Maneja tu agenda de citas de la <TextWithColor color="rgba(167, 114, 252, 0.83)" style={{ fontWeight: 'bold' }}>Mejor</TextWithColor> manera con CitasApp</TextWithColor>
            
                                        <TouchableOpacity style={styleDashboard.buttonEmpezarCitas} onPress={() => {console.log("wola")}}>
                                            <TextWithColor color="rgb(37, 37, 37)">Empezar</TextWithColor>
                                        </TouchableOpacity>
                                    </View>
            
            
                                    <View style={styleDashboard.citasRecientes}>
                                        <TextWithColor style={{ fontSize: 20, fontWeight: 'bold' }} color="rgba(16, 16, 18, 0.83)">Citas Recientes</TextWithColor>
                                        <TextWithColor color="rgba(51, 51, 51, 0.57)">Dale un vistazo a tus citas más recientes.</TextWithColor>
                                    </View>
            
                                    <View style={styleDashboard.infoApproach}>
                                        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
            
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                                <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={styleDashboard.infoApproachImg} source={{ uri: testImage }}/>
                                                    <View style={{ height: 145,
                                                    width: 1,
                                                    borderRightColor: 'rgba(162, 150, 202, 0.83)',
                                                    borderRightWidth: 1
                                                }}></View>
                                                </View>
            
                                                <View style={styleDashboard.infoAboutCitas}>
                                                    <TextWithColor color="rgba(48, 48, 48, 0.83)">Busca tu especialista</TextWithColor>
                                                    <TextWithColor color="rgba(128, 128, 128, 0.83)" style={{ fontSize: 12, marginTop: 5 }}>Busca el especialista que más se adapte a tus necesidades.</TextWithColor>
            
                                                    <TouchableOpacity style={styleDashboard.buttonVerEspecialistas}>
                                                        <TextWithColor color="rgb(73, 73, 73)">Ver especialistas</TextWithColor>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
            
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                                <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={styleDashboard.infoApproachImg} source={{ uri: testImage }}/>
                                                    <View style={{ height: 145,
                                                    width: 1,
                                                    borderRightColor: 'rgba(162, 150, 202, 0.83)',
                                                    borderRightWidth: 1
                                                    }}></View>
                                                </View>
            
                                                <View style={styleDashboard.infoAboutCitas}>
                                                    <TextWithColor color="rgba(48, 48, 48, 0.83)">Revisa su disponibilidad para empezar a Agendar!</TextWithColor>
                                                    <TextWithColor color="rgba(128, 128, 128, 0.83)" style={{ fontSize: 12, marginTop: 5 }}>Una vez tengas el especialista que se adapte a tus necesidades, revisa su disponibilidad para empezar a agendar.</TextWithColor>
                                                </View>
                                            </View>
            
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                                <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={styleDashboard.infoApproachImg} source={{ uri: testImage }}/>
                                                    <View style={{ height: 195,
                                                    width: 1,
                                                    borderRightColor: 'rgba(162, 150, 202, 0.83)',
                                                    borderRightWidth: 1
                                                }}></View>
                                                </View>
            
                                                <View style={styleDashboard.infoAboutCitas}>
                                                    <TextWithColor color="rgba(48, 48, 48, 0.83)">Cita agendada y lista para su confirmación!</TextWithColor>
                                                    <TextWithColor color="rgba(128, 128, 128, 0.83)" style={{ fontSize: 12, marginTop: 5 }}>Cuando agendas una cita el especialista debe marcar la confirmación/cancelación de la misma.</TextWithColor>
                                                    <TextWithColor 
                                                    color="rgba(145, 96, 23, 0.83)" 
                                                    style={{ fontSize: 12, backgroundColor: 'rgba(255, 205, 97, 0.85)', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 10, marginTop: 10 }}
                                                    >Nota: la cita puede ser reprogramada por el contador y podrás aceptar o rechazar la programación.</TextWithColor>
                                                </View>
                                            </View>
            
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                                <View style={{ alignItems: 'flex-start', justifyContent: 'center', width: '100%', transform: [{ translateX: -7 }] }}>
                                                    <Image style={styleDashboard.infoApproachImg} source={{ uri: testImage }}/>
                                                </View>
                                            </View>
            
                                        </View>
                                        
                                    </View>
            
                                </View>
                            </SafeAreaView>
                        </ScrollView>
        </AuthenticatedLayout>
    )
}