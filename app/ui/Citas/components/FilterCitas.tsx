import { ScrollView, View } from "react-native";
import { OptionFilter } from "./OptionFilter";

export default function FilterCitas() {
     // Constants to filter
     const typeFilter = ['Pendiente', 'Atendida', 'Cancelada', 'Reagendada']

  return (
    <ScrollView horizontal style={{ width: "90%" }}
    showsHorizontalScrollIndicator={false}>
      <View
        style={{
          width: "90%",
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        {typeFilter.map((item, index) => (
          <OptionFilter key={index} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}
