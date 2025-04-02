
import TextWithColor from "@/app/shared/components/TextWithColor"
import { TYPES_STATUS_CITAS } from "@/app/shared/constants/TypesStatusCitas"

/**
* Render the status of the cita
* 
* @param {string} status
*/
export const RenderTypeStatus = ({ status }: { status: string }) => {
        return (
            status === TYPES_STATUS_CITAS.PENDING ? 
                <TextWithColor style={{ color: 'rgb(241, 175, 52)', backgroundColor: 'rgba(241, 175, 52, 0.2)', borderRadius: 12,
                    paddingVertical: 3, paddingHorizontal: 10
                 }}>pendiente</TextWithColor> :
            status === TYPES_STATUS_CITAS.CANCELED ?
                <TextWithColor style={{ color: 'rgb(241, 52, 52)', backgroundColor: 'rgba(241, 52, 52, 0.2)', borderRadius: 12,
                    paddingVertical: 3, paddingHorizontal: 10
                 }}
                >cancelada</TextWithColor> :
            status === TYPES_STATUS_CITAS.CONFIRMED ?
                <TextWithColor style={{ color: 'rgb(28, 185, 22)', backgroundColor: 'rgba(52, 241, 99, 0.2)', borderRadius: 12,
                    paddingVertical: 3, paddingHorizontal: 10
                 }}>confirmada</TextWithColor> :
            status === TYPES_STATUS_CITAS.RESCHEDULED ?
                <TextWithColor style={{ color: 'rgb(52, 140, 241)', backgroundColor: 'rgba(52, 118, 241, 0.2)', borderRadius: 12,
                    paddingVertical: 3, paddingHorizontal: 10
                 }}>reprogramada</TextWithColor> :
            null
        )
    }