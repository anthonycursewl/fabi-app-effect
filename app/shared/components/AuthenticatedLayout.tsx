import { View, ScrollView, Alert, BackHandler } from "react-native";
import ButtonCard from "./ButtonCard";

// Contants
import { ButtonsApp } from "../constants/ButtonsApp";

// Hooks
import { useEffect } from "react";

// Navigation
import { useNavigation, useNavigationState } from "@react-navigation/native";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {

  const navigation = useNavigation();
  const currentPath = useNavigationState((state) => state.routes[state.index].name);
  const routes = useNavigationState((state) => state.routes);
  
  useEffect(() => {

    if (currentPath === 'Dashboard') {
        BackHandler.addEventListener('hardwareBackPress', () => {
            Alert.alert('BRD | Salir', '¿Desea salir de la app?', [
                {
                    text: 'No',
                    onPress: () => {
                        return true
                    },
                    style: 'cancel'
                },
                {
                text: 'Si',
                onPress: () => {
                    BackHandler.exitApp()
                    return true
                }
            }
            ])
            return true
        })
    }
  
    return () => {
        BackHandler.removeEventListener('hardwareBackPress', () => {
            return true
         })
     }
  }, [currentPath])

  return (
    <>
      {children}

      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          bottom: 0,
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 0)",
          boxShadow: "0px 4px 10px rgba(36, 36, 36, 0.5)",
        }}
      >
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "85%",
              paddingTop: 10,
              paddingBottom: 8,
            }}
          >

            {/* Iteration in order to create the buttons. Buttons are in the constant ButtonsApp */}
            {ButtonsApp.map((item, index) => (
              <ButtonCard key={index} icon={item.icon} name={item.name} namePath={item.namePath} currentPath={currentPath} navigation={{ navigation: navigation }}/>
            ))}


          </View>
        </ScrollView>
      </View>
    </>
  );
}
