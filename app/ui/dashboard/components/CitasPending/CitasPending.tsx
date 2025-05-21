import { TouchableOpacity, View, Image} from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";
import { useCitasStore } from "@/app/store/zustand/useCitaStore";
import { useEffect } from "react";

export default function CitasPending({ styleDashboard, newCitas, restates, nav }: { styleDashboard: any, newCitas: any, restates: any, nav: INavGlobal }) {
  const { fetchCitasByContador, citasContByFilter, loading } = useCitasStore()

  const _getPendingCitas = async () => {
    await fetchCitasByContador('pending')
  }

  useEffect(() => {
    _getPendingCitas()
  }, [])

  useEffect(() => {
    if (!loading) {
      console.log(citasContByFilter.pending?.length)
    }
  }, [citasContByFilter])

  const citasToShow = citasContByFilter.pending?.slice(0, 5)

  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigation.replace('CitasPendingCont');
      }}
    >
      <View style={styleDashboard.dashboardCitas}>
        <TextWithColor
          style={{ fontSize: 20, fontWeight: "bold" }}
          color="rgba(16, 16, 18, 0.83)"
        >
          Pendientes 
        </TextWithColor>
        <TextWithColor color="rgba(51, 51, 51, 0.57)">
          Citas pendientes.
        </TextWithColor>

        <View style={styleDashboard.newCitas}>
          {citasToShow?.map((cita, index) => (
            <Image
              source={{ uri: cita.users.icon_url }}
              style={{
                ...styleDashboard.picCitaInfo,
                opacity: index > 0 ? 1 - index / (citasToShow?.length || 0) : 0.9,
              }}
              key={cita.id}
            />
          ))}
          {citasContByFilter.pending?.length && citasContByFilter.pending?.length > 5 ? (
            <TextWithColor
              style={{ fontSize: 20 }}
              color="rgba(155, 123, 206, 0.83)"
            >{`+${citasContByFilter.pending?.length && citasContByFilter.pending?.length - 5}`}</TextWithColor>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
