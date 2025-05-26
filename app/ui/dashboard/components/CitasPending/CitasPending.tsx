import { TouchableOpacity, View, Image} from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";
import { useCitasStore } from "@/app/store/zustand/useCitaStore";
import { useEffect } from "react";
import { TypeFilter } from "@/app/ui/Citas/interfaces/TypeFilter";
import { useGlobalState } from "@/app/store/zustand/useGlobalState";
import { TYPES_ROLES } from "@/app/shared/constants/TypesRoles";
import CitaUser from "@/app/ui/Citas/CitasUser/CitasUser";

export default function CitasPending({ styleDashboard, nav }: { styleDashboard: any, nav: INavGlobal }) {
  const { fetchCitasByContador, citasContByFilter, loading, fetchCitas, citasByFilter } = useCitasStore()

    const { user } = useGlobalState()

  const _getPendingCitas = async (filter: TypeFilter) => {
    if (user.role === TYPES_ROLES.PROFESIONAL || user.role === TYPES_ROLES.ADMIN) {
       await fetchCitasByContador(filter)
    }

    if (user.role === TYPES_ROLES.USER) {
      await fetchCitas(filter, user.id)
    }
  }

  useEffect(() => {
    _getPendingCitas('pending')
  }, [])

  useEffect(() => {
    if (!loading) {
      if (citasContByFilter.pending?.length === 0) {
        _getPendingCitas('rescheduled')
      }
    }
  }, [])

  const citasToShow = user.role === TYPES_ROLES.USER 
  ? citasByFilter.pending?.length && citasByFilter.pending?.length > 0 ? citasByFilter.pending?.slice(0, 5) : citasByFilter.rescheduled?.slice(0, 5) 
  : citasContByFilter.pending?.length && citasContByFilter.pending?.length > 0 ? citasContByFilter.pending?.slice(0, 5) : citasContByFilter.rescheduled?.slice(0, 5)

  const RenderTitle = () => {
    if (user.role === TYPES_ROLES.USER) {
      return (
        <>
          <TextWithColor
            style={{ fontSize: 20, fontWeight: "bold" }}
            color="rgba(16, 16, 18, 0.83)"
            >
            Agendadas 
          </TextWithColor>

          <TextWithColor color="rgba(51, 51, 51, 0.57)">
          Citas pendientes.
          </TextWithColor>
        </>
      )
    }

    if (user.role === TYPES_ROLES.ADMIN || user.role === TYPES_ROLES.PROFESIONAL) {
      return (
        <>
          <TextWithColor
            style={{ fontSize: 20, fontWeight: "bold" }}
            color="rgba(16, 16, 18, 0.83)"
            >
            Pendientes 
          </TextWithColor>

          <TextWithColor color="rgba(51, 51, 51, 0.57)">
          Citas pendientes.
          </TextWithColor>
        </>
      )
    }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigation.replace(user.role === TYPES_ROLES.USER ? 'CitasUser' : 'CitasPendingCont');
      }}
    >
      <View style={styleDashboard.dashboardCitas}>
        <RenderTitle />

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
          {citasToShow?.length && citasToShow?.length > 5 ? (
            <TextWithColor
              style={{ fontSize: 20 }}
              color="rgba(155, 123, 206, 0.83)"
            >{`+${citasToShow?.length - 5}`}</TextWithColor>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
