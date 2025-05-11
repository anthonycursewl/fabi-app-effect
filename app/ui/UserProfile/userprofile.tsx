import { SafeAreaView, View, Image, Alert, ActivityIndicator, ScrollView, TouchableOpacity, Modal, TextInput, StyleSheet, CursorValue } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";
import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import { secureFetch } from "@/app/shared/services/secureFetch";
import { API_URl } from "@/app/config/api.breadriuss.config";
import { useEffect, useState } from "react";
import { IUserProfile } from "@/app/shared/interfaces/User";
import { iconsProfile } from "./constants/IconsProfile";
import { ColorsApp } from "@/app/shared/constants/ColorsApp";
import { parseRole } from "./services/parseRole";
// constants
import { TYPES_ROLES } from "@/app/shared/constants/TypesRoles";
// interfaces
import { IChangePassword } from "./interfaces/IChangePassword";
import { useGlobalState } from "@/app/store/zustand/useGlobalState";

export default function UserProfile() {
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUserProfile>({ id: "", username: "", email: "", created_at: "", role: "", name: "", icon_url: "" });
    const [selectedIcon, setSelectedIcon] = useState<string>("")

    // state for modal
    const [isEditing, setIsEditing] = useState<boolean>(false) 
    const [isChangePassword, setIsChangePassword] = useState<boolean>(false)
    const [password, setPassword] = useState<IChangePassword>({ currentPassword: "", newPassword: "", confirmPassword: "" })

    const { user: userGlobal, setUser: setUserGlobal } = useGlobalState()

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
            setUser(response);
            setUserGlobal(response)
        }
    }

    const handleUpdateUserProfile = async () => {
        if (selectedIcon) {
            user.icon_url = selectedIcon
            setUserGlobal({ ...userGlobal, icon_url: selectedIcon })
        }

        if (user.name === "" || user.email === "" || user.username === "") {
            Alert.alert("BRD | Error", "Todos los campos son requeridos!");
            return;
        }

        if (user.name.length < 3 || user.email.length < 3 || user.username.length < 3) {
            Alert.alert("BRD | Error", "Todos los campos deben tener al menos 3 caracteres!");
            return;
        }

        if (user.email.length > 255) {
            Alert.alert("BRD | Error", "El correo electrónico debe tener menos de 100 caracteres!");
            return;
        }

        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/user/update/u/profile`,
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
            Alert.alert("BRD | Éxito!", "Perfil actualizado correctamente!");
            setIsEditing(false)
            return
        }
    }

    const handleChangePassword = async () => {
        if (password.currentPassword === "" || password.newPassword === "" || password.confirmPassword === "") {
            Alert.alert("BRD | Error", "Todos los campos son requeridos!");
            return;
        }

        if (password.currentPassword === password.newPassword) {
            Alert.alert("BRD | Error", "La contraseña actual y la nueva contraseña no pueden ser iguales!");
            return;
        }

        if (password.newPassword !== password.confirmPassword) {
            Alert.alert("BRD | Error", "Las contraseñas no coinciden!");
            return;
        }

        if (password.newPassword.length < 8) {
            Alert.alert("BRD | Error", "La contraseña debe tener al menos 8 caracteres!");
            return;
        }
        

        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/user/changepass`,
                method: 'PUT',
                body: {
                    currentPassword: password.currentPassword,
                    newPassword: password.newPassword
                }
            }, 
            setLoading
        })

        if (error) {
            Alert.alert("BRD | Error", `${error}`);
            return;
        }

        if (response) {
            Alert.alert("BRD | Éxito!", "Contraseña actualizada correctamente!");
            setIsChangePassword(false)
            setIsEditing(false)

            setPassword({ currentPassword: "", newPassword: "", confirmPassword: "" })
            return;
        }
    }

    useEffect(() => {
        getProfileData()
    }, [])

  return (
    <AuthenticatedLayout>
        <ScrollView style={{ width: "100%", height: "100%" }} contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "flex-start" }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

        <SafeAreaView style={{ flexGrow: 1, width: "100%", alignItems: "center", justifyContent: "center", height: "100%" }}>
            {loading ? <ActivityIndicator size={"large"} color="#0000ff" /> :
            <View style={{ width: "90%", height: "100%" }}>

                <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "flex-start", marginTop: 60, marginBottom: 20 }}>
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
                            <TextWithColor style={{ fontSize: 16, color: "rgba(128, 128, 128, 0.83)" }}>Username</TextWithColor>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(49, 49, 49, 0.83)" }}>{user.username}</TextWithColor>
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
            animationType="slide"
            >
            <ScrollView style={{ flex: 1 }}>

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
                                <TouchableOpacity key={index} onPress={() => setSelectedIcon(img)} style={{ position: 'relative'}}>
                                    <Image source={{ uri: img }} style={{ width: 50, height: 50, borderRadius: 100, opacity: selectedIcon === img ? 1 : 0.5 }} />
                                    {selectedIcon === img && 
                                        <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '100%', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.87)' }}>
                                            <Image source={require('@/assets/icons/icon-check.png')} style={{ width: 20, height: 20, position: 'absolute', top: 0, right: 0 }}/>
                                        </View>
                                    }
                                </TouchableOpacity>
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
                        <TextWithColor style={styleModalEditProfile.modalTitleInputs}>Username</TextWithColor>
                        <TextInput value={user.username} style={styleModalEditProfile.modalInputs} 
                        onChangeText={(text) => {setUser({ ...user, username: text })}}
                        />
                    </View>

                    <View style={{ gap: 10 }}>
                        <TextWithColor style={styleModalEditProfile.modalTitleInputs}>Contraseña</TextWithColor>
                        <TouchableOpacity style={styleModalEditProfile.modalContainerChangePassword} onPress={() => {
                            setIsChangePassword(true)
                        }}>
                            <TextWithColor color="rgb(189, 71, 71)">Cambiar contraseña</TextWithColor>
                        </TouchableOpacity>
                    </View>

                    <Modal visible={isChangePassword} statusBarTranslucent onRequestClose={() => setIsChangePassword(false)}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', gap: 10 }}>
                            <View style={{ gap: 10, width: '90%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <TextWithColor style={styleModalEditProfile.modalTitleInputs}>Contraseña actual</TextWithColor>
                                <TextInput style={styleModalEditProfile.modalInputs} 
                                value={password.currentPassword}
                                onChangeText={(text) => {setPassword({ ...password, currentPassword: text })}} 
                                />
                            </View>

                            <View style={{ gap: 10, width: '90%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <TextWithColor style={styleModalEditProfile.modalTitleInputs}>Nueva contraseña</TextWithColor>
                                <TextInput style={styleModalEditProfile.modalInputs} 
                                value={password.newPassword}
                                onChangeText={(text) => {setPassword({ ...password, newPassword: text })}} 
                                />
                            </View>

                            <View style={{ gap: 10, width: '90%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <TextWithColor style={styleModalEditProfile.modalTitleInputs}>Confirmar contraseña</TextWithColor>
                                <TextInput style={styleModalEditProfile.modalInputs} 
                                value={password.confirmPassword}
                                onChangeText={(text) => {setPassword({ ...password, confirmPassword: text })}} 
                                />
                            </View>

                            {
                            loading ? <ActivityIndicator size={"large"} color="#0000ff" /> :
                            <TouchableOpacity style={{ ...styleModalEditProfile.buttonSave, marginTop: 20 }} onPress={() => {handleChangePassword()}}>
                                <TextWithColor style={{ color: 'white', textAlign: 'center' }}>Guardar</TextWithColor>
                            </TouchableOpacity>
                            }
                        </View>
                    </Modal>

                    <View style={{ gap: 10 }}>
                        <TextWithColor style={styleModalEditProfile.modalTitleInputs}>Rol</TextWithColor>
                        <TouchableOpacity style={styleModalEditProfile.modalContainerChangeRole}>
                            {
                                user.role === TYPES_ROLES.ADMIN 
                                ? 
                                <TextWithColor color="rgb(85, 85, 85)">Si quieres cambiar roles debes hacerlo desde el apartado de usuarios.</TextWithColor>
                                :
                                <TextWithColor color="rgb(85, 85, 85)">No tienes permisos para cambiar roles.</TextWithColor>
                            }
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {
                loading ? <ActivityIndicator size={"large"} color="#0000ff" /> :
                <TouchableOpacity style={styleModalEditProfile.buttonSave} onPress={() => {handleUpdateUserProfile()}}>
                    <TextWithColor style={{ color: 'white', textAlign: 'center' }}>Guardar</TextWithColor>
                </TouchableOpacity>
                }
            </View>
        </ScrollView>
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
        fontFamily: 'OnestRegular',
        width: '100%'
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