import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";

import "react-native-gesture-handler";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Root from "./src/navigators/Root";

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
        <Root/>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </PaperProvider>
    );
  }
};
