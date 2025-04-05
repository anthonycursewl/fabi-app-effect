import TextWithColor from "@/app/shared/components/TextWithColor";
import { RenderTypeStatus } from "./RenderTypeStatus";
import { View } from "react-native";

export const ListEmptyComponent = ({ type }: { type: string }): JSX.Element => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <TextWithColor style={{ fontSize: 18, textAlign: 'center' }} color="rgba(128, 128, 128, 0.83)">
        No tienes citas de tipo <RenderTypeStatus status={type}/> disponibles.
      </TextWithColor>
    </View>
  );
};
