import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Register from "../screens/Register";
import Login from "../screens/Login";

const Tab = createMaterialBottomTabNavigator();

export default function Nav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Enregistrer" component={Register} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
}
