import { View } from "react-native"

// Components
import { ContentCard } from "./ContentCard"

// Constants
import { TUTORIAL_CITAS } from "@/app/shared/constants/InfoApproach"

export default function InfoApproach({ styleDashboard }: { styleDashboard: any }) {

    return (
        <View style={styleDashboard.infoApproach}>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                    {
                        TUTORIAL_CITAS.map((item, index) => (
                            <ContentCard key={index} {...item} />
                        ))
                    }
             </View>
        </View>
    )
}