import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // ✅ Correct icon library

import HomeScreen from '../screens/HomeScreen';
import LiveTVScreen from '../screens/LiveTVScreen';

const Tab = createBottomTabNavigator();

const VideosScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Videos Coming Soon</Text>
  </View>
);

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Live"
        component={LiveTVScreen}
        options={{
          tabBarLabel: 'Live',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle" size={size + 8} color="#d10000" />
          ),
        }}
      />
      <Tab.Screen
        name="Videos"
        component={VideosScreen}
        options={{
          tabBarLabel: 'Videos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="videocam-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
