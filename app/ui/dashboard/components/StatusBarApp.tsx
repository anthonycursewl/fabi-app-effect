import { SafeAreaView, View, TouchableOpacity, Image } from "react-native";

export default function StatusBarApp({ scrollPosition, styleDashboard }: { scrollPosition: number, styleDashboard: any }) {
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

        <View>
          <Image
            source={{
              uri: "https://png.pngtree.com/background/20230616/original/pngtree-faceted-abstract-background-in-3d-with-shimmering-iridescent-metallic-texture-of-picture-image_3653595.jpg",
            }}
            style={styleDashboard.profilePicture}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
