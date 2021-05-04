import React from "react";
import { ThemeProvider } from "@shopify/restyle";
import { createStackNavigator } from "@react-navigation/stack";

import { LoadAssets } from "./src/components";
import { theme } from "./src/components/Theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppRoutes } from "./src/components/Navigation";
import { AuthenticationNavigator } from "./src/Authentication";
import { HomeNavigator } from "./src/Home";

const assets: number[] = [];

const fonts = {
  "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
};

const AppStack = createStackNavigator<AppRoutes>();

export default function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <LoadAssets {...{ fonts, assets }}>
        <SafeAreaProvider>
          <AppStack.Navigator
            headerMode="none"
            screenOptions={() => ({
              cardStyle: { backgroundColor: theme.colors.white },
            })}
          >
            <AppStack.Screen
              name="Authentication"
              component={AuthenticationNavigator}
            />
            <AppStack.Screen name="Home" component={HomeNavigator} />
          </AppStack.Navigator>
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
}
