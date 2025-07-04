import { DateType } from "react-native-ui-datepicker";

export interface Cita {
    id: string;
    des_or_reason: string;
    date: DateType;
    cont_id: string;
    status: string; 
    user_id: string;
    hour: string;
}

export interface CitasCont extends Cita {
    contdr_profile: {
        description: string;
        name: string | null;
    }
    users: {
        icon_url: string;
    }
}

