import { View } from "react-native"

// Components
import { ContentCard } from "./ContentCard"

// Constants
import { TUTORIAL_CITAS } from "@/app/shared/constants/InfoApproach"
import { useEffect, useState } from "react"
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal"

export default function InfoApproach({ styleDashboard, navigation }: { styleDashboard: any, navigation: INavGlobal }) {

    return (
        <View style={styleDashboard.infoApproach}>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                    {
                        TUTORIAL_CITAS.map((item, index) => (
                            <ContentCard key={index} {...item} navigation={navigation} />
                        ))
                    }
             </View>
        </View>
    )
}