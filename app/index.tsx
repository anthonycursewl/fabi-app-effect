import { createNativeStackNavigator } from '@react-navigation/native-stack'
// Components
import Login from './ui/auth/login/login';
import Register from './ui/auth/register/register';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import Main from './ui/dashboard/main/main';
import Citas from './ui/Citas/citas';
import { Easing } from 'react-native';
import { TransitionSpecs } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync()

export default function Index() {
  const [loaded] = useFonts({
    OnestRegular: require('../assets/fonts/Onest-Regular.ttf'),
  })

  const MyCustomTransition = {
    cardStyleInterpolator: ({ current }: { current: any }) => {
      return {
        cardStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1], // Desvanecimiento de 0 (transparente) a 1 (opaco)
          }),
        },
      };
    },
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Stack.Navigator
    screenOptions={{ animation: 'simple_push', animationDuration: 1 }} 
    >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name="Dashboard" component={Main} options={{ headerShown: false }}/>
      <Stack.Screen name="Citas" component={Citas} options={{ headerShown: false }}/>
    </Stack.Navigator> 
  );
}
