import { SafeAreaView, View, TouchableOpacity, Image, Alert } from "react-native";

// Services
import { removeItem } from "@/app/store/removeItem"; 
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "@/app/shared/context/ContextProvider";
import { INavGlobal } from "@/app/shared/interfaces/INavGlobal";
import { useGlobalState } from "@/app/store/zustand/useGlobalState";

export default function StatusBarApp({ scrollPosition, styleDashboard, nav }: { scrollPosition: number, styleDashboard: any, nav: INavGlobal }) {
  const { setUser } = useContext(AuthContext)
  const { user: userGlobal } = useGlobalState()

  const navi = useNavigation()

  const deleteSesion = async (key: string) => {
    Alert.alert('Cerrar Sesión', 
      '¿Desea cerrar sesión?', 
      [
        {text: 'No', style: 'cancel'}, 
        {text: 'Si', onPress: async () => {
          await removeItem(key)
          navi.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Login' }] }))
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
                uri: userGlobal.icon_url || "../../../../assets/images/menu-app.png",
              }}
              style={styleDashboard.profilePicture}
              />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
