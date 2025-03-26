import { useState } from "react";
import { TouchableOpacity, View, Modal, FlatList } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";

// Styles 
import { stylesPicker } from "../styles/stylesCustomPicker";
// Interfaces
import { CustomPickerProps } from "../interfaces/CustomPickerProps";
import { ColorsApp } from "@/app/shared/constants/ColorsApp";
import { Colors } from "react-native/Libraries/NewAppScreen";


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
            <TouchableOpacity style={{ borderWidth: 1, borderColor: ColorsApp.primary.color, paddingVertical: 12, paddingHorizontal: 10, width: '100%', borderRadius: 12 }} onPress={openModal}>
              <TextWithColor style={{ fontSize: 14, color: ColorsApp.placeholders.color }}>
                {selectedValue ? selectedValue : placeholder}
              </TextWithColor>
            </TouchableOpacity>
      
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
              <View style={stylesPicker.modalContainer}>
                <View style={stylesPicker.modalContent}>
                  <FlatList
                    data={items}
                    renderItem={renderItem}
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