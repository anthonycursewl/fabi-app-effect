import { View, Modal, Animated, TouchableOpacity, Image } from "react-native";
import { useEffect, useRef } from "react";
import TextWithColor from "./TextWithColor";
import { ColorsApp } from "../constants/ColorsApp";

export default function ModalShowState({ setActiveModal, stateModal, message = "¡El texto ha sido copiado a portapapeles!" }: { setActiveModal: (value: boolean) => void; stateModal: boolean, message?: string }) {
  // Animations
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (stateModal) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 60,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [stateModal, scaleAnim]);

  return (
    <Modal
      statusBarTranslucent
      visible={stateModal}
      animationType="fade"
      onRequestClose={() => setActiveModal(false)}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          height: "100%",
          width: "100%",
        }}
      >
        <View style={{ position: "relative" }}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 100,
              height: 100,
              backgroundColor: "rgba(81, 224, 117, 0.47)",
              filter: "blur(30px)",
            }}
          ></View>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Image
              source={require("@/assets/images/copy-success.png")}
              style={{ width: 80, height: 80 }}
            />
          </Animated.View>
        </View>

        <TextWithColor style={{ fontSize: 20, textAlign: "center", maxWidth: "80%" }}>
            {message}
        </TextWithColor>

        <TouchableOpacity
          style={{
                  backgroundColor: ColorsApp.primary.color,
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  borderRadius: 16, 
              }}
          onPress={() => setActiveModal(false)}
        >
          <TextWithColor
            color="white"
            style={{ fontSize: 16, textAlign: "center" }}
          >
            Cerrar
          </TextWithColor>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
