import { SafeAreaView, View, FlatList, StatusBar, ActivityIndicator, BackHandler } from "react-native";
import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout";
import { useCallback, useEffect } from "react"; 
import { StyleSheet } from "react-native";

// Components
import TextWithColor from "@/app/shared/components/TextWithColor";
import FilterCitas from "../components/FilterCitas";
import { ListEmptyComponent } from "../components/ListEmptyComponent";
import { CardContentC } from "../components/CardContentC";

// Interfaces
import { TypeFilter } from "../interfaces/TypeFilter";
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";
import { useCitasStore } from "@/app/store/zustand/useCitaStore";
import { useFocusEffect } from "@react-navigation/native";

export default function CitasPendingCont({ navigation }: INavGlobal) {
    const {
        citasContByFilter,
        paginationContByFilter,
        loading,
        currentContFilter,
        setContFilter,
        fetchCitasByContador
    } = useCitasStore();

    const citasToShow = citasContByFilter[currentContFilter] || [];
    const currentPageInfo = paginationContByFilter[currentContFilter] || { skip: 1, take: 10, isEnd: false };

    useEffect(() => {
        fetchCitasByContador(currentContFilter);
    }, [currentContFilter]);

    const handleLoadMore = () => {
        if (!loading && !currentPageInfo.isEnd) {
            fetchCitasByContador(currentContFilter);
        }
    };
    
    const handleSetFilter = (newFilter: TypeFilter) => {
        setContFilter(newFilter);
    };

    const renderListEmptyComponent = () => {
        if (loading && citasToShow.length === 0) {
            return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="rgb(128, 128, 128)" />;
        }
        if (!loading && citasToShow.length === 0) {
            return <ListEmptyComponent type={currentContFilter} />;
        }
        return null;
    };

    const renderListFooterComponent = () => {
        if (loading && citasToShow.length > 0) {
            return <ActivityIndicator style={{ marginVertical: 20 }} size="small" color="rgb(128, 128, 128)" />;
        }
        return null;
    };

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                navigation.replace('Dashboard');
                return true;
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => {
                subscription.remove();
            };
        }, [navigation])
    );

    return (
        <AuthenticatedLayout>
            <>
                <StatusBar translucent backgroundColor={'rgba(0, 0, 0, 0)'} />
                <SafeAreaView style={styles.mainContent}>
                    <View style={{ width: '90%' }}>
                        <TextWithColor style={{ fontSize: 12 }} color="rgba(128, 128, 128, 0.83)">
                            ¡Bienvenido a la sección de citas!
                            Aquí podrás ver tus citas y gestionarlas
                        </TextWithColor>
                    </View>
                    <FilterCitas filter={currentContFilter} setFilter={handleSetFilter} />
                </SafeAreaView>

                <View style={styles.listContainer}>
                    <FlatList
                        data={citasToShow}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        style={{ width: '90%' }}
                        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
                        renderItem={({ item }) => <CardContentC item={item} navigation={{ navigation: navigation }} />}
                        ListEmptyComponent={renderListEmptyComponent}
                        ListFooterComponent={renderListFooterComponent}
                        onEndReachedThreshold={0.5}
                        onEndReached={handleLoadMore}
                        onRefresh={async () => {
                            await fetchCitasByContador(currentContFilter, true)
                        }}
                        refreshing={loading && currentPageInfo.skip === 1} 
                    />
                </View>
            </>
        </AuthenticatedLayout>
    );
}

const styles = StyleSheet.create({
    mainContent: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 45,
        paddingBottom: 10,
    },
    listContainer: {
        width: '100%',
        height: '76%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});