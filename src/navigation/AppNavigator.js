import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importing Screens
import LoginScreen from '../screens/LoginScreen';
import SignupSelectionScreen from '../screens/SignupSelectionScreen';
import StudentSignupScreen from '../screens/StudentSignupScreen';
import CivilianSignupScreen from '../screens/CivilianSignupScreen';
import StudentDashboard from '../screens/StudentDashboard';
import CivilianDashboard from '../screens/CivilianDashboard';
import AddListingScreen from '../screens/AddListingScreen';
import ManageHouseListingScreen from '../screens/ManageHouseListingScreen';
import EditListingScreen from '../screens/EditListingScreen';
import ChatScreen from '../screens/ChatScreen';
import HousingListingsScreen from '../screens/HousingListingsScreen'; // Importing the new screen

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // Hide headers for all screens
        }}
      >
        {/* Authentication Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignupSelection" component={SignupSelectionScreen} />
        <Stack.Screen name="StudentSignup" component={StudentSignupScreen} />
        <Stack.Screen name="CivilianSignup" component={CivilianSignupScreen} />

        {/* Dashboard Screens */}
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="CivilianDashboard" component={CivilianDashboard} />

        {/* Listing Screens */}
        <Stack.Screen name="AddListingScreen" component={AddListingScreen} />
        <Stack.Screen name="ManageHouseListingScreen" component={ManageHouseListingScreen} />
        <Stack.Screen name="EditListingScreen" component={EditListingScreen} />

        {/* Chat Screen */}
        <Stack.Screen name="ChatScreen" component={ChatScreen} />

        {/* Housing Listings Screen */}
        <Stack.Screen name="HousingListingsScreen" component={HousingListingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
