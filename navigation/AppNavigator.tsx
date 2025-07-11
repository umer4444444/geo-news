import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ArticleDetailScreen from '../screens/articleDetailScreen';
import SplashScreen from '../screens/SplashScreen';
import LiveTVScreen from '../screens/LiveTVScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
<Stack.Navigator initialRouteName="Splash">

        <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
        <Stack.Screen name="LiveTV" component={LiveTVScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
