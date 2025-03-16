import { createNativeStackNavigator } from '@react-navigation/native-stack'
// Components
import Login from './ui/auth/login/login';
import Register from './ui/auth/register/register';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import Main from './ui/dashboard/main/main';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync()

export default function Index() {
  const [loaded] = useFonts({
    OnestRegular: require('../assets/fonts/Onest-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name="Dashboard" component={Main} options={{ headerShown: false }}/>
    </Stack.Navigator> 
  );
}
