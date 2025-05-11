import { API_URl } from "@/app/config/api.breadriuss.config"
import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout"
import TextWithColor from "@/app/shared/components/TextWithColor"
import { User } from "@/app/shared/interfaces/User"
import { secureFetch } from "@/app/shared/services/secureFetch"
import { useState, useEffect } from "react"
import { View, SafeAreaView, Alert, FlatList, StyleSheet, ActivityIndicator } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useGlobalState } from "@/app/store/zustand/useGlobalState"
import { parseRole } from "../UserProfile/services/parseRole"

interface Pagination {
    page: number
    limit: number
    total: number
    isEnd: boolean
}

export default function Admin() {
    const [user, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 10,
        total: 0,
        isEnd: false
    })

    const { user: userGlobal } = useGlobalState() 

    const getUsers = async () => {
        if (pagination.isEnd || loading) return

        const { error, response } = await secureFetch({
            options: {
                url: `${API_URl}/user/get-all?skip=${pagination.page}&take=${pagination.limit}`,
                method: 'GET'
            },
            setLoading
        })

        if (error) {
            Alert.alert("BRD | Error", `${error}`)
            return
        }

        setUsers([...user, ...response])
        setPagination({
            ...pagination,
            page: pagination.page + 1
        })

        if (response.length < pagination.limit) {
            setPagination({
                ...pagination,
                isEnd: true
            })
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const RenderItem = ({ item }: { item: User }) => {
        return (
            <View style={{ width: '100%', backgroundColor: 'rgb(245, 245, 245)', borderRadius: 10, marginBottom: 10, 
                padding: 12, borderWidth: 1, borderColor: 'rgb(230, 230, 230)', gap: 10
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <TextWithColor style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</TextWithColor>
                    <TextWithColor>@{item.username}</TextWithColor>
                </View>
                <View>
                    <TextWithColor style={{ fontSize: 14, color: 'gray' }}>Correo Electrónico</TextWithColor>
                    <TextWithColor>{item.email}</TextWithColor>
                </View>
                <View>
                    <TextWithColor style={{ fontSize: 14, color: 'gray' }}>Fecha de Creación</TextWithColor>
                    <TextWithColor>{item.created_at}</TextWithColor>
                </View>

                <View>  
                    <TextWithColor style={{ fontSize: 14, color: 'gray' }}>Rol</TextWithColor>
                    <TextWithColor>{parseRole(item.role)}</TextWithColor>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, height: '92%', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 25, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor={'rgb(255, 255, 255)'} />
            <View style={{ flex: 1, width: '92%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <View style={{ paddingVertical: 20, gap: 2 }}>
                    <TextWithColor style={{ fontSize: 20, fontWeight: 'bold' }}>¡Hola {userGlobal.name}!</TextWithColor>
                    <TextWithColor style={{ fontSize: 14, color: 'gray', fontWeight: 'normal' }}>En este apartado podrás ver los usuarios registrados en la aplicación, y modificar sus datos. O eliminarlos si es necesario.</TextWithColor>
                </View>

                <FlatList
                    data={user}
                    renderItem={({ item }) => <RenderItem item={item} />}
                    keyExtractor={(item) => item.id}
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ width: '100%' }}
                    onEndReached={getUsers}
                    onEndReachedThreshold={0.5}
                />

                <View style={{ paddingVertical: 12, gap: 2, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <TextWithColor style={{ fontSize: 14, color: 'gray', fontWeight: 'normal' }}>{loading ? <ActivityIndicator size="small" color="gray" /> : pagination.isEnd ? 'No hay más usuarios' : ''}</TextWithColor>
                </View>
            </View>
        </SafeAreaView>
    )
}