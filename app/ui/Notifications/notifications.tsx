import AuthenticatedLayout from "@/app/shared/components/AuthenticatedLayout";
import { SafeAreaView } from "react-native";

// Components
import TextWithColor from "@/app/shared/components/TextWithColor";

export default function Notifications() {
    return (
        <AuthenticatedLayout>
            <SafeAreaView style={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', height: '92%', backgroundColor: 'white' }}>

                <TextWithColor>
                    Buenas las notis aqui uwu
                </TextWithColor>

            </SafeAreaView>
        </AuthenticatedLayout>
    )
}