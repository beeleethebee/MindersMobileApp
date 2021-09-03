import GetStarted from "./src/screens/GetStarted.js";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Activity from "./src/screens/Activity";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ActivityContainer from "./src/screens/ActivityContainer";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { validateToken } from "./API.js";

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

export default ({ navigation }) => {
  const [logged, setLogged] = useState(false);

  let [fontsLoaded] = useFonts({
    "Avenir-demi": require("./assets/fonts/AvenirNextRoundedProDemi.ttf"),
    "Avenir-medium": require("./assets/fonts/AvenirNextRoundedProMedium.ttf"),
  });

  validateToken().then((isLogged) => {
    setLogged(isLogged);
    console.log(isLogged, " baba");
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            {logged ? (
              <Stack.Screen name="Accueil" component={ActivityContainer} />
            ) : (
              <Stack.Screen name="Bienvenue" component={GetStarted} />
            )}
            <Stack.Screen name="Activités" component={Activity} />
            <Stack.Screen name="Inscription" component={Register} />
            <Stack.Screen name="Connexion" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </PaperProvider>
    );
  }
};
