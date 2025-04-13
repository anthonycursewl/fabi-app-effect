import { StyleSheet } from "react-native"
import { ColorsApp } from "@/app/shared/constants/ColorsApp"
export const styleProfesionals = StyleSheet.create({
    mainProfesionals: {
        width: '100%',
        height: '92%',
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerProfesionals: {
        width: '100%',
        marginTop: 45,
        paddingHorizontal: 20
    },
    // Card to show profesionals info
    cardProfesional: {
        padding: 10,
        width: '100%',
        backgroundColor: 'rgba(235, 235, 235, 0.82)',
        borderRadius: 10,
        marginBottom: 10,
        gap: 10,
        borderWidth: 1,
        borderColor: 'rgba(216, 216, 216, 0.97)'
    },
    infoProfesional: {
        gap: 10
    },
    expertisesProfesional: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5
    },
    contactProfesional: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 2
    }, 
    contExpertises: {
        borderRadius: 12,
        backgroundColor: ColorsApp.primary.color,
        paddingHorizontal: 8,
        paddingVertical: 4,
        color: 'white'
    },
    contContact: {
        borderRadius: 12,
        backgroundColor: 'rgb(221, 221, 221)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        color: 'white',
        fontFamily: 'OnestRegular',
        flexDirection: 'row',
        gap: 5
    },
    btnVerPerfil: {
        width: '100%',
        backgroundColor: ColorsApp.primary.color,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16
    }
})