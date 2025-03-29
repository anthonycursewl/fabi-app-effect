export interface TimePickerType {
    label: string;
    value: string
}

export interface CustomPickerTimeProps {
    items: TimePickerType[];
    selectedValue: TimePickerType | null;
    onValueChange: (value: TimePickerType) => void;
    placeholder: string;
}