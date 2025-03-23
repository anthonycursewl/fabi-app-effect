import { ContentCardTypes } from "../interfaces/ContentCardApproachTypes"

export const TUTORIAL_CITAS: ContentCardTypes[] = [
    {
        title: '1. Busca tu especialista.',
        description: 'Busca el especialista que más se adapte a tus necesidades.',
        button: {
            text: 'Ver especialistas',
            onPress: () => {}
        },
        icon: 'https://png.pngtree.com/background/20230616/original/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-picture-image_3653595.jpg'
    },
    {
        title: '2. Busca el horario que se adapte a tus necesidades',
        description: 'Cuando agendas una cita el especialista debe marcar la confirmación/cancelación de la misma.',
        note: {
            text: 'Nota: la cita puede ser reprogramada por el contador y podrás aceptar o rechazar la programación',
            type: 'info'
        },
        isEnd: true,
        icon: 'https://png.pngtree.com/background/20230616/original/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-picture-image_3653595.jpg'
    }
]