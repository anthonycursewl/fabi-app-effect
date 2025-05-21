import { View, ScrollView } from "react-native";
import ButtonCard from "./ButtonCard";

// Contants
import { ButtonsApp } from "../constants/ButtonsApp";

// Navigation
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useGlobalState } from "@/app/store/zustand/useGlobalState";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {

  const navigation = useNavigation();
  const currentPath = useNavigationState((state) => state.routes[state.index].name);
  const { user } = useGlobalState() 

  return (
    <>
      {children}

      <View
        style={{
          width: "100%",
          flexGrow: 1,
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
          showsHorizontalScrollIndicator={false}
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
              item.showTo === 'all' || item.showTo === user.role ? (
                <ButtonCard key={index} icon={item.icon} name={item.name} namePath={item.namePath} currentPath={currentPath} navigation={{ navigation: navigation }}/>
              ) : null
            ))}

          </View>
        </ScrollView>
      </View>
    </>
  );
}
