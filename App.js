import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Recharge from './pages/Recharge';

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <>
      <NavigationContainer>
 
        <Stack.Navigator
           screenOptions={{
            contentStyle:{backgroundColor:"#cdde3a"},
            headerStyle:{backgroundColor:'#3a9cde'},
            headerTintColor:'#de3a81'
  
          }}
        
        >
          <Stack.Screen name="Login" component={Login} options={{title:"Login Here"}}/>
          <Stack.Screen name="Signup" component={Signup} options={{title:"Signup Here"}}/>
          <Stack.Screen name="Recharge" component={Recharge} />
        </Stack.Navigator>
      </NavigationContainer>
    
  
    </>
  );
}


