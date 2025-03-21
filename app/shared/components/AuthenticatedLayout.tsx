import { View, ScrollView } from "react-native";
import { ButtonCard } from "./ButtonCard";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ButtonsApp = [
    { icon: require("@/assets/images/nav/home-icon.png"), name: "Inicio" },
    { icon: require("@/assets/images/nav/citas-icon.png"), name: "Citas" },
    {
      icon: require("@/assets/images/nav/notification-icon.png"),
      name: "Notis",
    },
    { icon: require("@/assets/images/nav/profile-icon.png"), name: "Perfil" },
  ];

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
            {ButtonsApp.map((item, index) => (
              <ButtonCard key={index} icon={item.icon} name={item.name} />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
