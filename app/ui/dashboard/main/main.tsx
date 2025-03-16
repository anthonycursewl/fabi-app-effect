import { SafeAreaView, View, ScrollView, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";
import { StatusBar } from "expo-status-bar";
import { useRef, useEffect, useState } from "react";

export default function Main() {
    const scrollY = useRef(new Animated.Value(0)).current
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
          setScrollPosition(value);
        });
    
        return () => {
          scrollY.removeListener(listener);
        };
      }, [scrollY]);

    const newCitas = [
        {
            id: 1,
            title: 'Cita 1',
            description: 'Descripción de la cita 1',
            date: '2023-04-05',
            time: '10:00 AM',
            status: 'Pendiente',
            profilePic: 'https://png.pngtree.com/background/20230616/original/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-picture-image_3653595.jpg'
        },
        {
            id: 2,
            title: 'Cita 2',
            description: 'Descripción de la cita 2',
            date: '2023-04-06',
            time: '11:00 AM',
            status: 'Pendiente',
            profilePic: 'https://www.creativefabrica.com/wp-content/uploads/2022/05/17/Futuristic-Red-Blue-Background-Design-Graphics-30683310-1.jpg'
        },
        {
            id: 3,
            title: 'Cita 3',
            description: 'Descripción de la cita 3',
            date: '2023-04-07',
            time: '12:00 PM',
            status: 'Pendiente',
            profilePic: 'https://files.123freevectors.com/wp-content/original/115932-abstract-colorful-blurred-lights-background.jpg'
        },
        {
            id: 4,
            title: 'Cita 4',
            description: 'Descripción de la cita 4',
            date: '2023-04-08',
            time: '1:00 PM',
            status: 'Pendiente',
            profilePic: 'https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
            id: 5,
            title: 'Cita 5',
            description: 'Descripción de la cita 5',
            date: '2023-04-09',
            time: '2:00 PM',
            status: 'Pendiente',
            profilePic: 'https://unblast.com/wp-content/uploads/2021/01/Space-Background-Images.jpg'
        },
        {
            id: 6,
            title: 'Cita 6',
            description: 'Descripción de la cita 6',
            date: '2023-04-09',
            time: '3:00 PM',
            status: 'Pendiente',
            profilePic: 'https://png.pngtree.com/background/20230616/original/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-picture-image_3653595.jpg'
        },
    ]

    let restates = newCitas.length - 5
    const testImage = 'https://png.pngtree.com/background/20230616/original/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-picture-image_3653595.jpg'

    return (
        <ScrollView scrollEventThrottle={16} stickyHeaderIndices={[0]}
        onScroll={Animated.event([ { nativeEvent: { contentOffset: { y: scrollY } } } ], { useNativeDriver: false })}
        style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
        >
            <View style={styleDashboard.headerDashboard}>
                <View style={styleDashboard.headerDecorationLeft}>
                </View>

                <View style={styleDashboard.headerDecorationRight}>
                </View>

                <View>
                    <TouchableOpacity>
                        <Image source={require('../../../../assets/images/menu-app.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>

                <View>
                    <Image source={{ uri: 'https://png.pngtree.com/background/20230616/original/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-picture-image_3653595.jpg'}} style={styleDashboard.profilePicture}/>
                </View>
            </View>

        <SafeAreaView style={styleDashboard.dashboard}>
            <StatusBar translucent backgroundColor={scrollPosition > 0 ? 'rgba(230, 230, 230, 0.83)' : 'transparent'} style="dark"/>


            <View style={styleDashboard.mainContainer}>
                <View style={styleDashboard.userDashboard}>
                    <TextWithColor style={{ fontSize: 24, fontWeight: 'bold' }} color="rgba(40, 40, 41, 0.83)">Hola Anthony!</TextWithColor>
                    <TextWithColor color="rgba(25, 25, 26, 0.53)">Bienvenido a tu dashboard.</TextWithColor>
                </View>

                <View style={styleDashboard.dashboardCitas}>
                    <TextWithColor style={{ fontSize: 20, fontWeight: 'bold' }} color="rgba(16, 16, 18, 0.83)">Pendientes</TextWithColor>
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
    )
}

const styleDashboard = StyleSheet.create({
    dashboard: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35
    },
    headerDashboard: {
        width: '98%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        position: 'relative',
    },
    mainContainer: {
        width: '85%',
    },
    profilePicture: {
        width: 45,  
        height: 45,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(156, 74, 255, 0.97)'
    },
    userDashboard: {
        marginTop: 30
    }, 
    dashboardCitas: {
        marginTop: 28,
        borderRadius: 12,
        padding: 15,
        backgroundColor: 'rgba(236, 235, 235, 0.83)',
        borderColor: 'rgba(194, 194, 194, 0.83)',
        borderWidth: 1,
        boxShadow: '4px 4px 4px 2px rgba(0, 0, 0, 0.07)'
    },
    newCitas: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 15,
        gap: 5
    },
    picCitaInfo: {
        width: 40,
        height: 40,
        borderColor: 'rgba(188, 134, 255, 0.83)',
        borderWidth: 1,
        borderRadius: 50
    },
    headerDecorationLeft: {
        position: 'absolute',
        width: 180,
        height: 100,
        backgroundColor: 'rgb(131, 64, 255)',
        filter: 'blur(75px)',
        borderRadius: 50,
        left: -45,
        top: -20,
        pointerEvents: 'none',
        zIndex: -1
    },
    headerDecorationRight: {
        position: 'absolute',
        width: 180,
        height: 90,
        backgroundColor: 'rgb(64, 140, 255)',
        filter: 'blur(75px)',
        borderRadius: 50,
        right: -45,
        top: -20,
        pointerEvents: 'none',
        zIndex: -1
    },
    dashboardDescription: {
        marginTop: 20,
    },
    buttonEmpezarCitas: {
        width: '28%',
        padding: 5,
        backgroundColor: 'rgba(198, 169, 243, 0.83)',
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10
    },
    citasRecientes: {
        marginTop: 20
    }, 
    infoApproachImg: {
        width: 25,
        height: 25,
        borderRadius: 50
    },
    infoApproach: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
    },
    approachLine: {
        height: 168,
        width: 1,
        borderRightColor: 'rgba(162, 150, 202, 0.83)',
        borderRightWidth: 1
    },
    infoAboutCitas: {
        backgroundColor: 'rgba(224, 224, 224, 0.83)',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 20,
        borderRadius: 12
    }, 
    buttonVerEspecialistas: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(200, 171, 255, 0.83)',
        borderColor: 'rgba(133, 133, 133, 0.83)',
        borderWidth: .5,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10
    }
})