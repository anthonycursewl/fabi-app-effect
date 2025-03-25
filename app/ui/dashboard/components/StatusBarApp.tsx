import { SafeAreaView, View, TouchableOpacity, Image, Alert } from "react-native";

// Services
import { removeItem } from "@/app/store/removeItem"; 
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "@/app/shared/context/ContextProvider";

export default function StatusBarApp({ scrollPosition, styleDashboard }: { scrollPosition: number, styleDashboard: any }) {
  const { setUser } = useContext(AuthContext)
  const nav = useNavigation()
  const deleteSesion = async (key: string) => {
    Alert.alert('Cerrar Sesión', 
      '¿Desea cerrar sesión?', 
      [
        {text: 'No', style: 'cancel'}, 
        {text: 'Si', onPress: async () => {
          await removeItem(key)
          nav.goBack()
          setUser({ id: '', username: '', email: '', password: '', created_at: '', role: '', name: '', iat: 0, exp: 0, jti: '' })
        }}
      ]
      )
  }
  
  
  return (
    <SafeAreaView
      style={[
        styleDashboard.header,
        {
          backgroundColor: scrollPosition > 0 ? "white" : "transparent",
          elevation: scrollPosition > 0 ? 4 : 0,
          borderBottomWidth: scrollPosition > 0 ? 1 : 0,
          borderBottomColor: "rgba(51, 51, 51, 0)",
        },
      ]}
    >
      <View style={styleDashboard.headerDashboard}>
        <View style={styleDashboard.headerDecorationLeft}></View>

        <View style={styleDashboard.headerDecorationRight}></View>

        <View>
          <TouchableOpacity>
            <Image
              source={require("../../../../assets/images/menu-app.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
          <TouchableOpacity onPress={() => {deleteSesion('AuthToken')}}>
            <Image source={require("../../../../assets/images/logout-icon.png")} style={{ width: 32, height: 32 }}/>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/bitter-app-14614.appspot.com/o/profile-default.jpg?alt=media&token=60f5b6dc-6e9f-4c7a-8399-018d8796b831",
              }}
              style={styleDashboard.profilePicture}
              />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
