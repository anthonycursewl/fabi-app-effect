import { DateType } from "react-native-ui-datepicker";

export interface Cita {
    id: string;
    des_or_reason: string;
    date: DateType;
    cont_id: string;
    status: string; 
    user_id: string;
}