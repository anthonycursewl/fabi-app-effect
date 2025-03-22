import { StyleSheet } from "react-native"
export const styleDashboard = StyleSheet.create({
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
        paddingTop: 15,
        paddingBottom: 10,
        position: 'relative',
    },
    mainContainer: {
        width: '85%',
    },
    profilePicture: {
        width: 35,  
        height: 35,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(156, 74, 255, 0.97)'
    },
    userDashboard: {
        marginTop: 0
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
    },
    header: {
        paddingTop: 25
    }
})