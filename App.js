import GetStarted from "components/GetStarted";
import Register from "components/Register";
import Login from "components/Login";
import ActivityPage from "components/ActivityPage";

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

export default (props) => {
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
            <Stack.Screen name="Bienvenue" component={GetStarted} />
            <Stack.Screen name="Inscription" component={Register} />
            <Stack.Screen name="Connexion" component={Login} />
            <Stack.Screen name="ActivityPage" component={ActivityPage} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </PaperProvider>
    );
  }
};
