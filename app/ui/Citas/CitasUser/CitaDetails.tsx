import { SafeAreaView, View } from "react-native"
// Components
import TextWithColor from "@/app/shared/components/TextWithColor"
import { useEffect } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";

interface CitaParams {
    params: {
        item: any
    }
    name: string;
    key: string;
    path?: string | undefined;
}

interface TypeCitaDetails {
    id: string;
    date: string;
    des_or_reason: string;
    status: string;
    hour: string;
    contdr_profile: {
        users: {
            name: string
        }
        description: string;
    } 
}

export default function CitaDetails() {
    const route = useRoute<CitaParams>()
    const { item }: { item: TypeCitaDetails } = route.params

    useEffect(() => {
        console.log(item)   
    }, [])

    return (
        <SafeAreaView style={{ width: '100%', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white', height: '100%' }}>
               <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                        <TextWithColor style={{ fontSize: 25, fontWeight: 'bold' }}>{item.contdr_profile.users.name}</TextWithColor>
                        <TextWithColor style={{ color: 'black', fontSize: 14, backgroundColor: 'rgba(179, 179, 179, 0.83)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 }}>Contador asignado</TextWithColor>
                    </View>
                    
                </View>                
        </SafeAreaView>
    )
}