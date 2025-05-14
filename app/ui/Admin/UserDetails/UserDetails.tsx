import { View, SafeAreaView, Image, TouchableOpacity, Alert } from "react-native"
import { useEffect, useReducer, useState } from "react"
import TextWithColor from "@/app/shared/components/TextWithColor"
import { useRoute } from "@react-navigation/native"
import { IUserProfile } from "@/app/shared/interfaces/User"
import { parseRole } from "../../UserProfile/services/parseRole"
import { CustomTimePicker } from "../../Citas/components/PickerTime"
import { TYPES_ROLES } from "@/app/shared/constants/TypesRoles"
import { ScrollView } from "react-native"
import { ColorsApp } from "@/app/shared/constants/ColorsApp"
import { secureFetch } from "@/app/shared/services/secureFetch"
import { API_URl } from "@/app/config/api.breadriuss.config"
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal"

export default function UserDetails({ navigation }: INavGlobal) { 

    const [roleSelected, setRoleSelected] = useState<{ value: string, label: string }>({ value: '', label: '' })
    const [loading, setLoading] = useState(false)

    const route = useRoute()
    const { user } = route.params as { user: IUserProfile }

    const roles = [{
        value: 'Admin',
        label: TYPES_ROLES.ADMIN
    }, {
        value: TYPES_ROLES.USER,
        label: 'Usuario'
    }, {
        value: TYPES_ROLES.PROFESIONAL,
        label: 'Contador'
    }]

    useEffect(() => {
        console.log(user)
    }, [user])

    const handleChangeRole = async () => {
        const newRole: IUserProfile = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            icon_url: user.icon_url,
            created_at: user.created_at,
            is_active: user.is_active,
            role: roleSelected.value
        }

        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/user/update/u/role/${user.id}`,
                method: 'PUT',
                body: newRole
            }, setLoading
        })

        if (error) {
            Alert.alert('BRD | Error', `${error}`)
        }

        if (response) {
            Alert.alert('BRD | Success', 'Rol actualizado correctamente!')
            navigation.goBack()
        }
    }

    const parseIsActive = (is_active: boolean) => {
        return is_active ? 'Activo' : 'Inactivo'
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ flex: 1, padding: 16, marginTop: 20 }}>
                    <TextWithColor style={{ fontSize: 24, fontWeight: 'bold' }}>
                        Detalles del usuario
                    </TextWithColor>

                    <View style={{ alignItems: 'center', marginTop: 25 }}>
                        <Image source={{ uri: user.icon_url }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                    </View>

                    <View style={{ marginTop: 20, gap: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
                            <TextWithColor style={{ fontSize: 15 }}>ID del Usuario</TextWithColor>
                            <TextWithColor color="rgb(185, 122, 243)"
                            style={{ fontSize: 15 }}
                            >
                                {user.id}
                            </TextWithColor>
                        </View>

                        <View style={{ borderBottomWidth: 1, paddingBottom: 18, borderColor: 'rgb(230, 230, 230)', paddingVertical: 10, borderRadius: 10 }}>
                            <TextWithColor style={{ fontSize: 18 }}>
                                Nombres
                            </TextWithColor>
                            <TextWithColor>
                                {user.name}
                            </TextWithColor>
                        </View>

                        <View style={{ borderBottomWidth: 1, paddingBottom: 18, borderColor: 'rgb(230, 230, 230)', paddingVertical: 10, borderRadius: 10 }}>
                            <TextWithColor style={{ fontSize: 18 }}>
                                Email
                            </TextWithColor>
                            <TextWithColor>
                                {user.email}
                            </TextWithColor>
                        </View>

                        <View style={{ borderBottomWidth: 1, paddingBottom: 18, borderColor: 'rgb(230, 230, 230)', paddingVertical: 10, borderRadius: 10 }}>
                            <TextWithColor style={{ fontSize: 18 }}>
                                Username
                            </TextWithColor>
                            <TextWithColor>
                                {user.username}
                            </TextWithColor>
                        </View>

                        <View style={{ borderBottomWidth: 1, paddingBottom: 18, borderColor: 'rgb(230, 230, 230)', paddingVertical: 10, borderRadius: 10 }}>
                            <TextWithColor style={{ fontSize: 18 }}>
                                Fecha de creación
                            </TextWithColor>
                            <TextWithColor>
                                {user.created_at}
                            </TextWithColor>
                        </View>

                        <View style={{ borderBottomWidth: 1, paddingBottom: 18, borderColor: 'rgb(230, 230, 230)', paddingVertical: 10, borderRadius: 10 }}>
                            <TextWithColor style={{ fontSize: 18 }}>
                                Rol Actual
                            </TextWithColor>
                            <TextWithColor>
                                {parseRole(user.role)}
                            </TextWithColor>
                        </View>

                        <View style={{ borderBottomWidth: 1, paddingBottom: 18, borderColor: 'rgb(230, 230, 230)', paddingVertical: 10, borderRadius: 10,
                            gap: 10
                         }}>
                            <TextWithColor style={{ fontSize: 18 }}>
                                Estado
                            </TextWithColor>
                            
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <TextWithColor
                                style={{ backgroundColor: user.is_active ? 'rgb(173, 248, 213)' : 'rgb(248, 173, 173)', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 14 }}
                                color={user.is_active ? 'rgb(21, 121, 74)' : 'rgb(184, 123, 123)'}
                                >
                                    {parseIsActive(user.is_active)}
                                </TextWithColor>
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <CustomTimePicker 
                            items={roles} 
                            selectedValue={roleSelected} 
                            onValueChange={setRoleSelected} 
                            placeholder="Selecciona un rol..." 
                            loadMore={() => {}} 
                            pagination={{ skip: 0, isEnd: false, take: 0 }} 
                            setPagination={() => {}} />
                        </View>
                    </View>
                
                    <View style={{ marginTop: 20, gap: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ backgroundColor: ColorsApp.primary.color, paddingVertical: 12, paddingHorizontal: 10, width: '48%', borderRadius: 12 }}
                        onPress={handleChangeRole}
                        >
                            <TextWithColor style={{ color: 'white', textAlign: 'center' }}>
                                Guardar cambios
                            </TextWithColor>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: 'rgb(236, 101, 101)', paddingVertical: 12, paddingHorizontal: 10, width: '48%', borderRadius: 12 }}>
                            <TextWithColor style={{ color: 'white', textAlign: 'center' }}>
                                Eliminar usuario
                            </TextWithColor>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}