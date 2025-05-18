import { ContentCardTypes } from "../interfaces/ContentCardApproachTypes"

export const TUTORIAL_CITAS: ContentCardTypes[] = [
    {
        title: '1. Busca tu especialista.',
        description: 'Busca el especialista que más se adapte a tus necesidades.',
        button: {
            text: 'Ver especialistas',
            onPress: () => {}
        },
        icon: 'https://jevtuwchndehjsmaflia.supabase.co/storage/v1/object/public/anx-bucket/public/d4516749-6e3c-4528-be9f-0781c87c9971'
    },
    {
        title: '2. Busca el horario que se adapte a tus necesidades',
        description: 'Cuando agendas una cita el especialista debe marcar la confirmación/cancelación de la misma.',
        note: {
            text: 'Nota: la cita puede ser reprogramada por el contador y podrás aceptar o rechazar la programación',
            type: 'info'
        },
        isEnd: true,
        icon: 'https://jevtuwchndehjsmaflia.supabase.co/storage/v1/object/public/anx-bucket/public/d4516749-6e3c-4528-be9f-0781c87c9971'
    }
]