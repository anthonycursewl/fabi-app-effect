import { SafeAreaView, View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from "react-native"; // Import StyleSheet
// Components 
import TextWithColor from "@/app/shared/components/TextWithColor";
import { useRoute } from "@react-navigation/native";
import ActionsCita from "./components/ActionsCita/ActionsCita";

// utils
import { formatTimeUntil } from "@/app/shared/services/formatDateUntil";
import { RenderTypeStatus } from "../components/RenderTypeStatus";
import SlideButton from "@/app/shared/components/SlideButton";
import { MiniCard } from "./components/MiniCard";
// interfaces
import { TypeCitaDetails } from "../interfaces/TypeCitaDetails";
import { CitaParams } from "../interfaces/CitaParams";
import { TYPES_STATUS_CITAS } from "@/app/shared/constants/TypesStatusCitas";
import { secureFetch } from "@/app/shared/services/secureFetch";
import { API_URl } from "@/app/config/api.breadriuss.config";
import { useState } from "react";
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";
import { StatusBar } from "expo-status-bar";

export default function CitaDetails({ navigation}: INavGlobal) {
    const route = useRoute<CitaParams>();
    const item: TypeCitaDetails = route.params?.item || {} as TypeCitaDetails;

    const gridData = [
        { title: "Fecha", info: item.date ? new Date(item.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A', type: "date" },
        { title: "Hora", info: item.hour || 'N/A', type: "info" },
        { title: "Estado", info: item.status, type: "status" },
        { title: "Próxima acción", info: formatTimeUntil(item.date), type: "info" },
    ];    

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <StatusBar style="dark" backgroundColor="transparent" translucent/>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TextWithColor style={styles.headerName}>
                            {item.contdr_profile.users.name}
                        </TextWithColor>
                        <TextWithColor style={styles.headerTag}>
                            Contador asignado
                        </TextWithColor>
                    </View>

                    {item.contdr_profile.description&& (
                    <View style={styles.descriptionContainer}>
                        <TextWithColor style={styles.descriptionLabel}>Descripción del Contador</TextWithColor>
                        <TextWithColor>{item.contdr_profile.description}</TextWithColor>
                    </View>
                    )}

                    {item.des_or_reason && (
                    <View style={styles.descriptionContainer}>
                        <TextWithColor style={styles.descriptionLabel}>Descripción</TextWithColor>
                        <TextWithColor>{item.des_or_reason}</TextWithColor>
                    </View>
                    )}

                    <View style={styles.gridContainer}>
                        {gridData.map((data, index) => (
                            <MiniCard key={index} title={data.title} info={data.info} type={data.type} styles={styles}/>
                        ))}
                    </View>
                    
                    {
                    item.status === TYPES_STATUS_CITAS.PENDING &&
                    <View style={styles.advisementClient}>
                        <TextWithColor>Esta cita se encuentra en estado <RenderTypeStatus status={item.status}/>. Debes esperar la confirmación del contador.
                        Ten en cuenta que la cita puede se <TextWithColor color="rgba(24, 97, 165, 0.83)" style={{ fontWeight: 'bold' }}>reprogramada</TextWithColor> por el contador, podrás aceptar o rechazar la programación.
                        </TextWithColor>
                    </View>
                    }
                </View>

                <ActionsCita item={item} navigation={{ navigation: navigation }}/>
            </SafeAreaView>
        </ScrollView>
    );
}

// --- StyleSheet ---
const styles = StyleSheet.create({
    safeArea: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    container: {
        flexGrow: 1,
        width: '90%',
        alignSelf: 'center', 
        paddingTop: 10, 
        paddingBottom: 10,
        gap: 20, 
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        marginTop: 30,
    },
    headerName: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerTag: {
        color: 'black',
        fontSize: 13,
        backgroundColor: 'rgba(226, 226, 226, 0.83)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        overflow: 'hidden',
    },
    descriptionContainer: {
        width: '100%',
    },
    descriptionLabel: {
        color: 'rgb(73, 73, 73)',
        marginBottom: 2,
    },
    gridContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',     
        gap: 10,           
    },
    miniCard: {
        flexGrow: 1,
        flexBasis: '45%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'rgba(236, 233, 233, 0.83)',
        borderWidth: .5,
        borderColor: 'rgba(211, 211, 211, 0.83)',
        boxShadow: '0px 4px 5px rgba(36, 36, 36, 0.06)',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        minHeight: 70, 
    },
    miniCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    miniCardInfo: {
        fontSize: 14, 
    },
    advisementClient: {
        borderWidth: 1.2,
        borderColor: 'rgba(95, 95, 95, 0.83)',
        borderStyle: 'dashed',
        padding: 15,
        borderRadius: 12
    }
});