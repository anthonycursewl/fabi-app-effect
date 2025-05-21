import { TouchableOpacity, View, Image } from "react-native";
import { useCallback } from "react";
import TextWithColor from "./TextWithColor";

function ButtonCard({ icon, name, namePath, currentPath, navigation }: { icon: any, name: string, namePath: string, currentPath: string, navigation: any }) {

  const handlePress = useCallback(() => {
    if (currentPath === namePath) return
    navigation.navigation.replace(namePath);
  }, [namePath, navigation.navigation]);

  return (
    <TouchableOpacity
      style={currentPath === namePath ? { opacity: 1, borderBottomWidth: 1, borderBottomColor: 'rgba(171, 125, 255, 0.94)' } : { opacity: 0.7 }}
      onPress={handlePress}
    >
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image source={icon} style={{ width: 25, height: 25 }} />
        <TextWithColor style={{ fontSize: 10, color: 'rgba(29, 29, 29, 0.66)' }}>{name}</TextWithColor>
      </View>
    </TouchableOpacity>
  );
}

export default ButtonCard;