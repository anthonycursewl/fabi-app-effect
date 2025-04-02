import { ScrollView, View } from "react-native";
import { OptionFilter } from "./OptionFilter";


interface FilterCitasProps {
    filter: string;
    setFilter: (filter: string) => void
}

export default function FilterCitas({ filter, setFilter }: FilterCitasProps) {
     // Constants to filter
  const typeFilter = [
      {
        name: "Todo",
        value: "all"
      },
      {
      name: "Pendiente",
      value: "pending"
      },
      {
        name: "Confirmada",
        value: "confirmed"
      },
      {
        name: "Cancelada",
        value: "canceled"
      },
      {
        name: "Reagendada",
        value: "rescheduled"
      }
  ]

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
          <OptionFilter key={index} item={item} setFilter={setFilter} filter={filter}/>
        ))}
      </View>
    </ScrollView>
  );
}
