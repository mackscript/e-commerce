import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../screens/home/HomeScreen';
import CategoriesScreen from '../screens/categories/CategoriesScreen';
import SearchScreen from '../screens/search/SearchScreen';
import AccountScreen from '../screens/account/AccountScreen';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,

                tabBarShowLabel: true,

                tabBarActiveTintColor: "#111111",
                tabBarInactiveTintColor: "#A0A0A0",

                tabBarStyle: {
                    position: "absolute",

                    left: 13,
                    right: 13,
                    bottom: 0,

                    height: 82,

                    backgroundColor: "#FFFFFF",

                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,

                    borderTopWidth: 0,

                    elevation: 0,
                    shadowOpacity: 0,

                    paddingBottom: 10,
                    paddingTop: 10,
                },

                tabBarLabelStyle: {
                    fontSize: 13,
                    fontWeight: "600",
                },

                tabBarItemStyle: {
                    justifyContent: "center",
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />

            <Tab.Screen
                name="Categories"
                component={CategoriesScreen}
            />

            <Tab.Screen
                name="Search"
                component={SearchScreen}
            />

            <Tab.Screen
                name="Account"
                component={AccountScreen}
            />
        </Tab.Navigator>

    );
}


export default TabNavigator;
