import { Stack } from "expo-router";
import { AuthProvider } from "./shared/context/ContextProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}/>
    </AuthProvider>
  )
}
