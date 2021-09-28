import {createStackNavigator} from "@react-navigation/stack";
import GetStarted from "../screens/GetStarted";
import ActivityContainer from "./ActivityContainer";
import Activity from "../screens/Activity";
import Register from "../screens/Register";
import Login from "../screens/Login";
import {NavigationContainer} from "@react-navigation/native";
import React from "react";

const Stack = createStackNavigator();

export default () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Bienvenue" component={GetStarted} />
          <Stack.Screen name="Accueil" component={ActivityContainer} />
          <Stack.Screen name="Inscription" component={Register} />
          <Stack.Screen name="Connexion" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}
