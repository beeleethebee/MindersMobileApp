import GetStarted from "components/GetStarted";

import React from "react";
import { Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

export default (props) => {
  let [fontsLoaded] = useFonts({
    "Avenir-demi": require("./assets/fonts/AvenirNextRoundedProDemi.ttf"),
    "Avenir-medium": require("./assets/fonts/AvenirNextRoundedProMedium.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <GetStarted />
      </View>
    );
  }
};
