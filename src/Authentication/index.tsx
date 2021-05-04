import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./Login";
import Register from "./Register";

import { AuthenticationRoutes } from "../components/Navigation";
import { useTheme } from "../components";

const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();

export const AuthenticationNavigator = () => {
  const theme = useTheme();
  return (
    <AuthenticationStack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.white,
          paddingHorizontal: theme.spacing.m,
        },
      }}
    >
      <AuthenticationStack.Screen name="Login" component={Login} />
      <AuthenticationStack.Screen name="Register" component={Register} />
    </AuthenticationStack.Navigator>
  );
};
