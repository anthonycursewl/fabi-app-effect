export interface CustomPickerProps { 
    items: string[];
    selectedValue: string | null;
    onValueChange: (value: string) => void;
    placeholder: string;
}