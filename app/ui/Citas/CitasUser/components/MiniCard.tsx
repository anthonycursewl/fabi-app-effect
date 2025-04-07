import TextWithColor from "@/app/shared/components/TextWithColor";
import { View } from "react-native";
import { RenderTypeStatus } from "../../components/RenderTypeStatus";

export const MiniCard = ({ info, title, type, styles }: { info: string, title: string, type: string, styles: any }) => {
    
    return (
        <View style={styles.miniCard}>
            <TextWithColor style={styles.miniCardTitle}>{title}</TextWithColor>
            {   type === 'status' ?
                <RenderTypeStatus status={info}/> : 
                type === 'date' ?
                <TextWithColor style={styles.miniCardInfo}>{info}</TextWithColor> :
                <TextWithColor style={styles.miniCardInfo}>{info}</TextWithColor>
            }
        </View>
    );
};