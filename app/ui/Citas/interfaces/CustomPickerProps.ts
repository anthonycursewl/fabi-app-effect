import { ContadorProfileData } from "@/app/shared/interfaces/ContadorProfile";

export interface CustomPickerProps { 
    items: ContadorProfileData[];
    selectedValue: string | null;
    onValueChange: (value: string) => void;
    placeholder: string;
}