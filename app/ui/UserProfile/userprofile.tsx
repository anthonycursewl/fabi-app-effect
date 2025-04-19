import { SafeAreaView, View, Image, Alert, ActivityIndicator, TextInput, ScrollView } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";
import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import { secureFetch } from "@/app/shared/services/secureFetch";
import { API_URl } from "@/app/config/api.breadriuss.config";
import { useEffect, useState } from "react";
import { IUserProfile } from "@/app/shared/interfaces/User";

import { ColorsApp } from "@/app/shared/constants/ColorsApp";
// Components
import { CustomTimePicker } from "../Citas/components/PickerTime";

export default function UserProfile() {
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUserProfile>({ id: "", username: "", email: "", created_at: "", role: "", name: "", icon_url: "" }); 

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


  return (
    <AuthenticatedLayout>
        <ScrollView>

        <SafeAreaView style={{ flexGrow: 1, width: "100%", alignItems: "center", justifyContent: "center", height: "92%" }}>
            {loading ? <ActivityIndicator size={"large"} color="#0000ff" /> :
            <View style={{ width: "90%", height: "100%" }}>

                <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "flex-start", marginTop: 60 }}>
                    <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                        {user.icon_url && <Image source={{ uri: user.icon_url }} style={{ width: 100, height: 100, borderRadius: 50 }}/>}

                        <View style={{ width: "100%", height: 100, alignItems: "center", justifyContent: "center" }}>
                            <TextWithColor style={{ fontSize: 20 }}>{user.name}</TextWithColor>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(128, 128, 128, 0.83)" }}>{user.email}</TextWithColor>
                        </View>
                    </View>

                    <View style={{ width: "95%", marginTop: 20, gap: 20 }}>
                        <TextWithColor style={{ fontSize: 20 }}>Información Personal</TextWithColor>
                        
                        <View style={{ gap: 10 }}>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(128, 128, 128, 0.83)" }}>Nombres</TextWithColor>
                            <TextInput 
                            value={user.name}
                            style={{ fontSize: 16, color: "rgba(49, 49, 49, 0.83)", borderWidth: 1, borderColor: ColorsApp.primary.color, padding: 8, borderRadius: 12 }}
                            onChangeText={(text) => setUser({ ...user, name: text })}
                            />
                        </View>

                        <View style={{ gap: 10 }}>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(128, 128, 128, 0.83)" }}>Correo electrónico</TextWithColor>
                            <TextInput 
                            value={user.email}
                            style={{ fontSize: 16, color: "rgba(49, 49, 49, 0.83)", borderWidth: 1, borderColor: ColorsApp.primary.color, padding: 8, borderRadius: 12 }}
                            onChangeText={(text) => setUser({ ...user, email: text })}
                            />
                        </View>

                        <View style={{ gap: 10 }}>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(128, 128, 128, 0.83)" }}>Rol</TextWithColor>
                            <TextWithColor>{parseRole(user.role)}</TextWithColor>
                        </View>

                        <View>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(128, 128, 128, 0.83)" }}>Estado de cuenta</TextWithColor>
                            <TextWithColor style={{ fontSize: 16, color: "rgba(49, 49, 49, 0.83)" }}>Active</TextWithColor>
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
    </AuthenticatedLayout>
  );
}