import { useState } from "react";
import { TouchableOpacity, View, Modal, FlatList } from "react-native";
import TextWithColor from "@/app/shared/components/TextWithColor";

// Styles 
import { stylesPicker } from "../styles/stylesCustomPicker";
// Interfaces
import { CustomPickerTimeProps, TimePickerType } from "../interfaces/CustomPickerTime";
import { ColorsApp } from "@/app/shared/constants/ColorsApp";

export const CustomTimePicker = ({ items, selectedValue, onValueChange, placeholder, loadMore, pagination, setPagination }: CustomPickerTimeProps) => {
        const [modalVisible, setModalVisible] = useState<boolean>(false);
      
        const openModal = () => {
          setModalVisible(true);
        };
      
        const closeModal = () => {
          setModalVisible(false);
        };
      
        const handleItemPress = (item: any) => {
          onValueChange({ value: item, label: item });
          closeModal();
        };
      
        const renderItem = ({ item }: { item: TimePickerType }) => (
          <TouchableOpacity style={stylesPicker.item} onPress={() => handleItemPress(item.value)}>
            <TextWithColor>{item.value}</TextWithColor>
          </TouchableOpacity>
        );
      
        return (
          <View>
            <TouchableOpacity style={{ borderWidth: 1, borderColor: ColorsApp.primary.color, paddingVertical: 12, paddingHorizontal: 10, width: '100%', borderRadius: 12 }} onPress={openModal}>
              <TextWithColor style={{ fontSize: 14, color: selectedValue?.value ? 'rgb(24, 24, 24)' : ColorsApp.placeholders.color }}>
                {selectedValue?.value ? selectedValue.label : placeholder}
              </TextWithColor>
            </TouchableOpacity>
      
            <Modal visible={modalVisible} animationType="fade" transparent={true}>
              <View style={stylesPicker.modalContainer}>
                <View style={stylesPicker.modalContent}>
                  <FlatList
                    data={items}
                    renderItem={renderItem}
                    onEndReached={() => {
                      setPagination({ ...pagination, skip: pagination.skip + 1})
                      loadMore();
                    }}
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