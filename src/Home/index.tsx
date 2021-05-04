import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Home";

import { HomeRoutes } from "../components/Navigation";
import { useTheme } from "../components";
import AddNewDiary from "./AddNewDiary";

const HomeStack = createStackNavigator<HomeRoutes>();

export const HomeNavigator = () => {
  const theme = useTheme();
  return (
    <HomeStack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.white,
          paddingHorizontal: theme.spacing.m,
        },
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="AddNewDiary" component={AddNewDiary} />
    </HomeStack.Navigator>
  );
};
