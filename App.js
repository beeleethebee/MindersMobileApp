import GetStarted from "./src/screens/GetStarted.js";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Activity from "./src/screens/Activity";

import ActivityContainer from "./src/screens/ActivityContainer";

import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: "#7E85F9",
    accent: "#011234",
    placeholder: "#BCBFD2",
  },
};

export default () => {
  let [fontsLoaded] = useFonts({
    "Avenir-demi": require("./assets/fonts/AvenirNextRoundedProDemi.ttf"),
    "Avenir-medium": require("./assets/fonts/AvenirNextRoundedProMedium.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Accueil" component={ActivityContainer} />
            <Stack.Screen name="Activités" component={Activity} />
            <Stack.Screen name="Bienvenue" component={GetStarted} />
            <Stack.Screen name="Inscription" component={Register} />
            <Stack.Screen name="Connexion" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </PaperProvider>
    );
  }
};
