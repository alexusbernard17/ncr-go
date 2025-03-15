import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from "./pages/profile-page";
import BrowseItemsScreen from "./pages/browse-items";
import ShoppingListScreen from "./pages/shopping-list";
import HomeScreen from "./pages/home-screen";
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator 
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#DCDCDC' }
          }}
        >
            <Stack.Screen name="Select Store" component={HomeScreen} />
            <Stack.Screen name="Browse Items" component={BrowseItemsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Shopping List" component={ShoppingListScreen} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
            <Toast />
        </NavigationContainer>
    );
}