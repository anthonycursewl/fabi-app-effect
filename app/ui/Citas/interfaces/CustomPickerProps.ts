import { ContadorProfileData } from "@/app/shared/interfaces/ContadorProfile";

export interface CustomPickerProps { 
    items: ContadorProfileData[];
    selectedValue: ContadorProfileData | null;
    onValueChange: (value: ContadorProfileData) => void;
    placeholder: string;
}