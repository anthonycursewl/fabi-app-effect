import { SafeAreaView, View, Image, Alert, ActivityIndicator, ScrollView, TouchableOpacity, Modal, TextInput, StyleSheet } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";
import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import { secureFetch } from "@/app/shared/services/secureFetch";
import { API_URl } from "@/app/config/api.breadriuss.config";
import { useEffect, useState } from "react";
import { IUserProfile } from "@/app/shared/interfaces/User";

import { ColorsApp } from "@/app/shared/constants/ColorsApp";
// Components
import { CustomTimePicker } from "../Citas/components/PickerTime";
import { TYPES_ROLES } from "@/app/shared/constants/TypesRoles";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function UserProfile() {
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUserProfile>({ id: "", username: "", email: "", created_at: "", role: "", name: "", icon_url: "" });

    // state for modal
    const [isEditing, setIsEditing] = useState<boolean>(false) 

    const getProfileData = async () => {
        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/user/n/profile`,
                method: "GET",
            },
            setLoading
        })

        if (error) {
            Alert.alert("BRD | Error", `${error}`);
            return;
        }

        if (response) {
            console.log(response)
            setUser(response);
        }
    }

    const updateProfileData = async () => {
        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/user/n/profile`,
                method: "PUT",
                body: user
            },
            setLoading
        })

        if (error) {
            Alert.alert("BRD | Error", `${error}`);
            return;
        }

        if (response) {
            setUser(response);
        }
    }

    useEffect(() => {
        getProfileData()
    }, [])


    const parseRole = (role: string) => {
        if (role === "Admin") return "Administrador";
        if (role === "Contdr") return "Contador";
        if (role === "Default") return "Usuario";

        return ""
    }

    const roles = [
        { label: "Administrador", value: "Admin" },
        { label: "Contador", value: "Contdr" },
        { label: "Usuario", value: "Default" },
    ]

    const iconsProfile = [
        'https://firebasestorage.googleapis.com/v0/b/bitter-app-14614.appspot.com/o/fabiicons%2Fsegunda_profile.jpg?alt=media&token=bd037257-9690-4d8a-82cf-b9a5a4e1e9b1', 
        'https://firebasestorage.googleapis.com/v0/b/bitter-app-14614.appspot.com/o/fabiicons%2Ftercera_profile.jpg?alt=media&token=917fab76-1b79-4240-a5fc-d96b8d0863f4',
        'https://firebasestorage.googleapis.com/v0/b/bitter-app-14614.appspot.com/o/fabiicons%2Fcuarta_profile.jpg?alt=media&token=9d7f1f83-4aae-4285-9d88-e74a27d2ac4b', 
        'https://firebasestorage.googleapis.com/v0/b/bitter-app-14614.appspot.com/o/fabiicons%2Fquinta_profile.jpg?alt=media&token=11e04b66-7be7-4099-95a4-db254c5b22ea', 
        'https://firebasestorage.googleapis.com/v0/b/bitter-app-14614.appspot.com/o/profile-default.jpg?alt=media&token=60f5b6dc-6e9f-4c7a-8399-018d8796b831'
    ]

  return (
    <AuthenticatedLayout>
        <ScrollView style={{ width: "100%", height: "100%" }} contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "flex-start" }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

        <SafeAreaView style={{ flexGrow: 1, width: "100%", alignItems: "center", justifyContent: "center", height: "100%" }}>
            {loading ? <ActivityIndicator size={"large"} color="#0000ff" /> :
            <View style={{ width: "90%", height: "100%" }}>

                <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "flex-start", marginTop: 60 }}>
                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                        {user.icon_url && <Image source={{ uri: user.icon_url }} style={{ width: 100, height: 100, borderRadius: 50 }}/>}

                        <View style={{ width: "100%", height: 100, alignItems: "center", justifyContent: "center" }}>
                            <TextWithColor style={{ fontSize: 20 }}>{user.name}</TextWithColor>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(128, 128, 128, 0.83)" }}>{user.email}</TextWithColor>
                        </View>

                        <View>
                            <TouchableOpacity 
                            style={{ backgroundColor: ColorsApp.primary.color, borderRadius: 10, alignItems: "center", justifyContent: "center", paddingVertical: 5, paddingHorizontal: 10 }} 
                            onPress={() => {
                                setIsEditing(true)
                            }}>
                                <TextWithColor color="white">Editar perfil</TextWithColor>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ width: "95%", marginTop: 20, gap: 20 }}>
                        <TextWithColor style={{ fontSize: 20 }}>Información Personal</TextWithColor>
                        
                        <View style={{ gap: 10 }}>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(128, 128, 128, 0.83)" }}>Nombres</TextWithColor>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(49, 49, 49, 0.83)" }}>{user.name}</TextWithColor>
                        </View>

                        <View style={{ gap: 10 }}>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(128, 128, 128, 0.83)" }}>Correo electrónico</TextWithColor>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(49, 49, 49, 0.83)" }}>{user.email}</TextWithColor>
                        </View>

                        <View style={{ gap: 10 }}>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(128, 128, 128, 0.83)" }}>Rol</TextWithColor>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(49, 49, 49, 0.83)" }}>{parseRole(user.role)}</TextWithColor>
                        </View>

                        <View>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(128, 128, 128, 0.83)" }}>Estado de cuenta</TextWithColor>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(49, 49, 49, 0.83)" }}>Activa</TextWithColor>
                        </View>

                        <View>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(128, 128, 128, 0.83)" }}>Version de la aplicación</TextWithColor>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(49, 49, 49, 0.83)" }}>1.0.0</TextWithColor>
                        </View>
                    </View>
                </View>

            </View>
            }
        </SafeAreaView>
        </ScrollView>

        <Modal visible={isEditing} statusBarTranslucent onRequestClose={() => setIsEditing(false)}
            style={{ justifyContent: 'space-between' }}
            >
            <View style={styleModalEditProfile.modalMain}>
                <View style={styleModalEditProfile.modalProfilePicture}>
                    {user.icon_url && <Image source={{ uri: user.icon_url }} style={{ width: 70, height: 70, borderRadius: 50 }}/>}
                    <TextWithColor style={{ fontSize: 16 }}>Editando Perfil | {user.name}</TextWithColor>
                </View>

                <View style={{ gap: 20, marginTop: 20 }}>
                    <View>
                        <TextWithColor style={styleModalEditProfile.modalTitleInputs}>Elije un icono que represente tu perfil.</TextWithColor>
                        
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', width: '100%', gap: 10, padding: 10, borderWidth: 1, borderColor: 'rgb(209, 209, 209)',
                            borderRadius: 12, marginTop: 10
                         }}>
                            {iconsProfile.map((img: string, index: number) => (
                                <Image key={index} source={{ uri: img }} style={{ width: 50, height: 50, borderRadius: 100 }}/>
                            ))}
                        </View>
                    </View>

                    <View style={{ gap: 10 }}>
                        <TextWithColor style={styleModalEditProfile.modalTitleInputs}>Nombres</TextWithColor>
                        <TextInput value={user.name} style={styleModalEditProfile.modalInputs} 
                        onChangeText={(text) => {setUser({ ...user, name: text })}}
                        />
                    </View>

                    <View style={{ gap: 10 }}>
                        <TextWithColor style={styleModalEditProfile.modalTitleInputs}>Correo Electrónico</TextWithColor>
                        <TextInput value={user.email} style={styleModalEditProfile.modalInputs} 
                        onChangeText={(text) => {setUser({ ...user, email: text })}}
                        />
                    </View>

                    <View style={{ gap: 10 }}>
                        <TextWithColor style={styleModalEditProfile.modalTitleInputs}>Contraseña</TextWithColor>
                        <TouchableOpacity style={styleModalEditProfile.modalContainerChangePassword}>
                            <TextWithColor color="rgb(189, 71, 71)">Cambiar contraseña</TextWithColor>
                        </TouchableOpacity>
                    </View>

                    <View style={{ gap: 10 }}>
                        <TextWithColor style={styleModalEditProfile.modalTitleInputs}>Rol</TextWithColor>
                        <TouchableOpacity style={styleModalEditProfile.modalContainerChangeRole}>
                            {
                                user.role === TYPES_ROLES.ADMIN 
                                ? 
                                <TextWithColor color="rgb(85, 85, 85)">Si quieres cambiar roles debes hacerlo desde el apartado del perfil.</TextWithColor>
                                :
                                <TextWithColor color="rgb(85, 85, 85)">No tienes permisos para cambiar roles.</TextWithColor>
                            }
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={styleModalEditProfile.buttonSave}>
                    <TextWithColor style={{ color: 'white', textAlign: 'center' }}>Guardar</TextWithColor>
                </TouchableOpacity>
            </View>
        </Modal>
    </AuthenticatedLayout>
  );
}


const styleModalEditProfile = StyleSheet.create({
    modalMain: {
        padding: 20,
        marginTop: 30,
        flex: 1,
        flexGrow: 1,
        height: '100%',
    },
    modalInputs: {
        borderColor: ColorsApp.primary.color,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 10,
        fontFamily: 'OnestRegular'
    },
    modalTitleInputs: {
        fontSize: 16
    },
    modalProfilePicture: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    modalContainerChangePassword: {
        backgroundColor: 'rgb(252, 164, 164)',
        padding: 12,
        borderRadius: 12
    },
    modalContainerChangeRole: {
        backgroundColor: 'rgb(236, 236, 236)',
        padding: 12,
        borderRadius: 12
    },
    buttonSave: {
        backgroundColor: ColorsApp.primary.color,
        padding: 10,
        marginBottom: 15,
        width: '90%',
        borderRadius: 12
    }
})