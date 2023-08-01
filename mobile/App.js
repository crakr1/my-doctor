import 'react-native-gesture-handler';
import React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import DoctorsScreen from './screens/Doctors';
import SingUpScreen from './screens/singUp';
import SignInScreen from './screens/signIn'
import ProfileScreen from './screens/profile';

const Stack = createStackNavigator();

export default function App() {

  const[loaded] = useFonts({
    NotoFont: require('./assets/fonts/NotoKufiArabic-Regular.ttf')
  })

  if(!loaded){
    return null
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#007bff"
          }, 
          headerTintColor: "#FFF",
          headerTitleStyle: {
            textAlign: 'right',
            fontFamily: 'NotoFont'
          }
        }}
      >
        <Stack.Screen
          name= "Home"
          component= {HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name= "Doctors"
          component= {DoctorsScreen}
          options={{
            title: 'الاطباء'
          }}
        />
        <Stack.Screen
          name= 'signUp'
          component={SingUpScreen}
          options={{
            title: 'sing up'
          }}
        />
        <Stack.Screen
          name= 'signIn'
          component={SignInScreen}
          options={{
            title: 'sing In'
          }}
        />
        <Stack.Screen
          name= 'profile'
          component={ProfileScreen}
          options={{
            title: 'profile'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
 
};

 