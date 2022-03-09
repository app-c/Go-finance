/* eslint-disable react/prop-types */
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";

import { Home } from "../screens/Home";
import { Register } from "../screens/Register";

const Tab = createBottomTabNavigator();

export function AppRoutes() {
   const theme = useTheme();
   return (
      <Tab.Navigator
         tabBarOptions={{
            activeTintColor: theme.colors.secondary,
            inactiveTintColor: theme.colors.text,
            style: { height: 88, paddingVertical: 0 },
         }}
      >
         <Tab.Screen
            options={{
               tabBarIcon: ({ size, color }) => (
                  <MaterialIcons
                     name="format-list-bulleted"
                     size={size}
                     color={color}
                  />
               ),
            }}
            name="Listagem"
            component={Home}
         />
         <Tab.Screen
            name="Cadastrar"
            component={Register}
            options={{
               tabBarIcon: ({ size, color }) => (
                  <MaterialIcons
                     name="attach-money"
                     size={size}
                     color={color}
                  />
               ),
            }}
         />
         <Tab.Screen
            name="Listar"
            component={Register}
            options={{
               tabBarIcon: ({ size, color }) => (
                  <MaterialIcons name="pie-chart" size={size} color={color} />
               ),
            }}
         />
      </Tab.Navigator>
   );
}
