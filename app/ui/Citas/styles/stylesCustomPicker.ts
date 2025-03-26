import { ColorsApp } from "@/app/shared/constants/ColorsApp";
import { StyleSheet } from "react-native";

export const stylesPicker = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 10,
    },
    pickerButton: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      borderRadius: 5,
      width: 200,
      alignItems: 'center',
    },
    pickerButtonText: {
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    item: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    closeButton: {
      backgroundColor: ColorsApp.primary.color,
      padding: 10,
      borderRadius: 14,
      alignItems: 'center',
      marginTop: 10,
    },
    closeButtonText: {
      fontSize: 16,
      color: 'white'
    },
    selectedText: {
      marginTop: 20,
      fontSize: 16,
    },
  });