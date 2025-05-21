import { API_URl } from "@/app/config/api.breadriuss.config";
import TextWithColor from "@/app/shared/components/TextWithColor";
import { IUserProfile, User } from "@/app/shared/interfaces/User";
import { secureFetch } from "@/app/shared/services/secureFetch";
import { useState, useEffect } from "react";
import { View, SafeAreaView, Alert, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Text, BackHandler } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useGlobalState } from "@/app/store/zustand/useGlobalState";
import { parseRole } from "../UserProfile/services/parseRole";
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";

interface Pagination {
    page: number;
    limit: number;
    total: number;
    isEnd: boolean;
}

export default function Admin({ navigation }: INavGlobal) {
    const { users, setUsers, user } = useGlobalState();
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 10,
        total: 0,
        isEnd: false,
    });

    const refreshUsers = async () => {
        setPagination({
            page: 1,
            limit: 10,
            total: 0,
            isEnd: false,
        });
        setUsers([]); 
    };


    const getUsers = async (isRefreshing = false) => {
        if ((loading || pagination.isEnd) && !isRefreshing) {
            console.log("getUsers returned early: loading=", loading, "isEnd=", pagination.isEnd, "isRefreshing=", isRefreshing);
            return;
        }

        console.log(`Fetching page: ${isRefreshing ? 1 : pagination.page}`);

        const { error, response: newUsers } = await secureFetch({
            options: {
                url: `${API_URl}/user/get-all?skip=${pagination.page}&take=${pagination.limit}`,
                method: 'GET',
            },
            setLoading,
        });

        if (error) {
            Alert.alert("BRD | Error", `${error}`);
            return;
        }

        if (!Array.isArray(newUsers)) {
            console.error("API response is not an array:", newUsers);
            setPagination(prev => ({ ...prev, isEnd: true }));
            return;
        }

        const reachedEnd = newUsers.length < pagination.limit;

        if (isRefreshing) {
            setUsers(newUsers as IUserProfile[]);
        } else {
            setUsers([...users, ...newUsers]);
        }

        setPagination(prev => ({
            ...prev,
            page: reachedEnd ? prev.page : pagination.page + 1,
            isEnd: prev.isEnd || reachedEnd,
            total: isRefreshing ? newUsers.length : prev.total + newUsers.length
        }));
    };

    useEffect(() => {
        setUsers([]);
        getUsers(true);
    }, []);

    const parseIsActive = (is_active: boolean) => {
        return is_active ? 'Activo' : 'Inactivo'
    }

    useEffect(() => {
        const sub = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.replace('Dashboard')
            return true
        })

        return () => sub.remove()
    }, [])

    const RenderItem = ({ item }: { item: IUserProfile }) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('UserDetails', { user: item });
            }}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                        <TextWithColor style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</TextWithColor>
                        <TextWithColor>@{item.username}</TextWithColor>
                    </View>
                    <View>
                        <TextWithColor style={styles.label}>Correo Electrónico</TextWithColor>
                        <TextWithColor>{item.email}</TextWithColor>
                    </View>
                    <View>
                        <TextWithColor style={styles.label}>Fecha de Creación</TextWithColor>
                        <TextWithColor>{new Date(item.created_at).toLocaleDateString()}</TextWithColor> 
                    </View>
                    <View>
                        <TextWithColor style={styles.label}>Rol</TextWithColor>
                        <TextWithColor>{parseRole(item.role)}</TextWithColor>
                    </View>
                    <View>
                        <TextWithColor style={styles.label}>Estado</TextWithColor>
                        <TextWithColor>{parseIsActive(item.is_active)}</TextWithColor>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderFooter = () => {
        if (loading && pagination.page > 1) {
            return <ActivityIndicator style={{ marginVertical: 20 }} size="small" color="gray" />;
        }
        if (pagination.isEnd && users.length > 0) {
            return <Text style={styles.footerText}>No hay más usuarios</Text>;
        }
        return null;
    };

    if (loading && pagination.page === 1 && users.length === 0) {
        return (
            <SafeAreaView style={styles.centeredLoaderContainer}>
                <ActivityIndicator size="large" color="gray" />
            </SafeAreaView>
        );
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar translucent backgroundColor={'rgb(255, 255, 255)'} />
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TextWithColor style={{ fontSize: 20, fontWeight: 'bold' }}>¡Hola {user.name}!</TextWithColor>
                    <TextWithColor style={styles.headerSubtitle}>En este apartado podrás ver los usuarios registrados en la aplicación, y modificar sus datos. O eliminarlos si es necesario.</TextWithColor>
                </View>

                <FlatList
                    data={users}
                    renderItem={RenderItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    onEndReached={() => {
                        if (!loading && !pagination.isEnd) {
                            getUsers();
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                    onRefresh={() => refreshUsers()}
                    refreshing={loading && pagination.page === 1}
                />

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    centeredLoaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        width: '92%',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 25,
    },
    headerContainer: {
        paddingVertical: 20,
        gap: 2,
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'gray',
        fontWeight: 'normal',
    },
    itemContainer: {
        width: '100%',
        backgroundColor: 'rgb(245, 245, 245)',
        borderRadius: 10,
        marginBottom: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: 'rgb(230, 230, 230)',
        gap: 10,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    label: {
        fontSize: 14,
        color: 'gray',
    },
    footerText: {
        textAlign: 'center',
        paddingVertical: 12,
        fontSize: 14,
        color: 'gray',
    }
});