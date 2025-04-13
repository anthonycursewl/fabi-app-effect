import * as Clipboard from 'expo-clipboard'
export const handleCopyToClipboard = async (text: string, setValue: (value: boolean) => void) => {
    await Clipboard.setStringAsync(text)
    setValue(true)
}