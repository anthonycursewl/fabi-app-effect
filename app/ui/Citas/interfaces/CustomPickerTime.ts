export interface TimePickerType {
    label: string;
    value: string
}

export interface CustomPickerTimeProps {
    items: TimePickerType[];
    selectedValue: TimePickerType | null;
    onValueChange: (value: TimePickerType) => void;
    placeholder: string;
    loadMore: () => void;
    pagination: { take: number; skip: number; isEnd: boolean };
    setPagination: (value: { take: number; skip: number; isEnd: boolean }) => void;
}