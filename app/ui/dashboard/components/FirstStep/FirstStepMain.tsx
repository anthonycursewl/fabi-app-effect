import { View } from "react-native"
import TextWithColor from "@/app/shared/components/TextWithColor"
import { User } from "@/app/shared/interfaces/User"
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal"
import { TYPES_ROLES } from "@/app/shared/constants/TypesRoles"

// Components
import { TouchableOpacity } from "react-native"

interface FirstStepMainProps { 
    user: User
    navigation: any
}

export default function FirstStepMain({ user, navigation }: FirstStepMainProps) {
    if (!user) return null

    if (user.role === TYPES_ROLES.ADMIN) {
        return (
        <View style={{ alignItems: 'flex-start', justifyContent: 'center', width: '100%', marginTop: 20, gap: 5 }}>
            <TextWithColor style={{ fontSize: 24 }}>Revisa la actividad de tus especialistas y gestiona <TextWithColor style={{ fontSize: 24, color: 'rgb(199, 136, 253)', fontWeight: 'bold' }}>Actividades</TextWithColor> para mejorar la experiencia de usuario!</TextWithColor>
            
            <TouchableOpacity style={{ backgroundColor: 'rgb(199, 136, 253)', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 12 }}>
                <TextWithColor style={{ fontSize: 12, color: 'rgb(246, 246, 247)' }}>Revisar</TextWithColor>
            </TouchableOpacity>
        </View>
        )
    }

    if (user.role === TYPES_ROLES.USER) {
        return (
            <View style={{ alignItems: 'flex-start', justifyContent: 'center', width: '100%', marginTop: 20, gap: 5 }}>
                <TextWithColor style={{ fontSize: 24 }}>Maneja tus citas de la <TextWithColor style={{ fontSize: 24, color: 'rgb(199, 136, 253)', fontWeight: 'bold' }}>Mejor</TextWithColor> manera. Empieza a agendar Ya!</TextWithColor>
                
                <TouchableOpacity style={{ backgroundColor: 'rgb(199, 136, 253)', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 12 }}
                onPress={() => navigation.navigate('Citas')}
                >
                    <TextWithColor style={{ fontSize: 12, color: 'rgb(246, 246, 247)' }}>Empezar</TextWithColor>
                </TouchableOpacity>
            </View>
        )
    }

    if (user.role === TYPES_ROLES.PROFESIONAL) {
        return (
            <View style={{ alignItems: 'flex-start', justifyContent: 'center', width: '100%', marginTop: 20, gap: 5 }}>
                <TextWithColor style={{ fontSize: 24 }}>Crea tu perfil profesional para empezara recibir citas en tu agenda!</TextWithColor>
                
                <TouchableOpacity style={{ backgroundColor: 'rgb(199, 136, 253)', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 12 }}
                onPress={() => navigation.replace('CreateProfileContador')}>
                    <TextWithColor style={{ fontSize: 12, color: 'rgb(246, 246, 247)' }}>Crear perfil</TextWithColor>
                </TouchableOpacity>
            </View>
        )
    }
}