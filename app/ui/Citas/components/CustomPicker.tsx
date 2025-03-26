import { useState } from "react";
import { TouchableOpacity, View, Modal, FlatList } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";

// Styles 
import { stylesPicker } from "../styles/stylesCustomPicker";
// Interfaces
import { CustomPickerProps } from "../interfaces/CustomPickerProps";


export const CustomPicker = ({ items, selectedValue, onValueChange, placeholder }: CustomPickerProps) => {
        const [modalVisible, setModalVisible] = useState<boolean>(false);
      
        const openModal = () => {
          setModalVisible(true);
        };
      
        const closeModal = () => {
          setModalVisible(false);
        };
      
        const handleItemPress = (item: any) => {
          onValueChange(item);
          closeModal();
        };
      
        const renderItem = ({ item }: { item: any}) => (
          <TouchableOpacity style={stylesPicker.item} onPress={() => handleItemPress(item)}>
            <TextWithColor>{item}</TextWithColor>
          </TouchableOpacity>
        );
      
        return (
          <View>
            <TouchableOpacity style={stylesPicker.pickerButton} onPress={openModal}>
              <TextWithColor style={stylesPicker.pickerButtonText}>
                {selectedValue ? selectedValue : placeholder}
              </TextWithColor>
            </TouchableOpacity>
      
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
              <View style={stylesPicker.modalContainer}>
                <View style={stylesPicker.modalContent}>
                  <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                  />
                  <TouchableOpacity style={stylesPicker.closeButton} onPress={closeModal}>
                    <TextWithColor style={stylesPicker.closeButtonText}>Cerrar</TextWithColor>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        );
      };