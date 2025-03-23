import { View, Image, TouchableOpacity } from "react-native"
import { styleDashboard } from "../../styles/stylesDashboard"

// Components
import TextWithColor from "@/app/shared/components/TextWithColor"

// interfaces 
import { ContentCardTypes } from "@/app/shared/interfaces/ContentCardApproachTypes"

export const ContentCard = ({ title, description, button, note, isEnd, icon }: ContentCardTypes) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', maxWidth: '90%', gap: 12 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', maxWidth: '30%' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={styleDashboard.infoApproachImg} source={{ uri: icon }}/>
                </View>

                <View style={{ height: 160,
                    width: 1,
                    borderRightColor: 'rgba(162, 150, 202, 0.83)',
                    borderRightWidth: 1 }}>
                </View>
                {
                    isEnd &&
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={styleDashboard.infoApproachImg} source={{ uri: icon }}/>
                    </View>
                }
            </View>

            <View style={{ ...styleDashboard.infoAboutCitas }}>
                <TextWithColor color="rgba(48, 48, 48, 0.83)">{title}</TextWithColor>
                <TextWithColor color="rgba(128, 128, 128, 0.83)" style={{ fontSize: 12, marginTop: 5 }}>{description}</TextWithColor>
                { button?.text &&
                    <TouchableOpacity style={{ ...styleDashboard.buttonVerEspecialistas, marginTop: 8 }}
                    onPress={button.onPress}
                    >
                        <TextWithColor color="rgb(73, 73, 73)">{button.text}</TextWithColor>
                    </TouchableOpacity>
                }
                {
                    note?.text &&
                    <TextWithColor 
                    color="rgba(145, 96, 23, 0.83)" 
                    style={{ fontSize: 12, 
                        backgroundColor: 'rgba(255, 205, 97, 0.85)', 
                        paddingHorizontal: 8, 
                        paddingVertical: 6, 
                        borderRadius: 10, 
                        marginTop: 10 }}>{note.text}
                    </TextWithColor>
                }
            </View>

        </View>
    )
}