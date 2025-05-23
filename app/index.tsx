import { createNativeStackNavigator } from '@react-navigation/native-stack'
// Components
import Login from './ui/auth/login/login';
import Register from './ui/auth/register/register';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import Main from './ui/dashboard/main/main';
import Citas from './ui/Citas/citas';
import CreateProfileContador from './ui/Profile/profile';
import CitaUser from './ui/Citas/CitasUser/CitasUser';
import CitaDetails from './ui/Citas/CitasUser/CitaDetails';
import Profesionals from './ui/Profesionals/profesionals';
import ProfesionalDetails from './ui/Profesionals/components/ProfesionalDetails/ProfesionalsDetails';
import UserProfile from './ui/UserProfile/userprofile';
import Admin from './ui/Admin/Admin';
import UserDetails from './ui/Admin/UserDetails/UserDetails';
import RescheduleCita from './ui/Citas/RescheduleCita/RescheduleCita';
import Notifications from './ui/Notifications/notifications';
import NotificationDetails from './ui/Notifications/NotificationDetails/NotificationDetails';
import CitasPendingCont from './ui/Citas/CitasPendingCont/CitasPendingCont';
import CitaDetailsCont from './ui/Citas/CitasPendingCont/components/CitaDetailsCont';

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
            outputRange: [0, 1],
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
    screenOptions={{ animation: 'fade', ...MyCustomTransition }} 
    >
      {/* Here's the route for the Auth */}
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      {/* Here's the route for the Main u-u */}
      <Stack.Screen name="Dashboard" component={Main} options={{ headerShown: false }}/>

      {/* Here's the route to let professionals manage their stuff */}
      <Stack.Screen name="CreateProfileContador" component={CreateProfileContador} options={{ headerShown: false }}/>
      
      {/* Here's the route for the Citas */}
      <Stack.Screen name="Citas" component={Citas} options={{ headerShown: false }}/>
      <Stack.Screen name="CitasUser" component={CitaUser} options={{ headerShown: false }}/>
      <Stack.Screen name="CitaDetails" component={CitaDetails} options={{ headerShown: false }}/>
      <Stack.Screen name="CitasPendingCont" component={CitasPendingCont} options={{ headerShown: false }}/>
      <Stack.Screen name="CitaDetailsCont" component={CitaDetailsCont} options={{ headerShown: false }}/>
      <Stack.Screen name="RescheduleCita" component={RescheduleCita} options={{ headerShown: false }}/>

      {/* Here's the route for profesionals */}
      <Stack.Screen name="Profesionals" component={Profesionals} options={{ headerShown: false }}/>
      <Stack.Screen name="ProfesionalDetail" component={ProfesionalDetails} options={{ headerShown: false }}/>

      {/* Here's the route for UserProfile */}
      <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}/>

      {/* Here's the route for Admin */}
      <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }}/>
      <Stack.Screen name="UserDetails" component={UserDetails} options={{ headerShown: false }}/>

      {/* Here's the route for Notifications */}
      <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }}/>
      <Stack.Screen name="NotificationDetails" component={NotificationDetails} options={{ headerShown: false }}/>
    </Stack.Navigator> 
  );
}
