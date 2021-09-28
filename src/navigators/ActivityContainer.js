import React from "react";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Home from "../screens/Home";
import Scanner from "../screens/Scanner";

const Tab = createMaterialBottomTabNavigator();

export default function Nav() {
  return (
      <Tab.Navigator
          activeColor="#7E85F9"
          inactiveColor="#CBCEFD"
          barStyle={{backgroundColor: "#ECEDFF"}}
      >
        <Tab.Screen name="Mon journal" component={Home}/>
        <Tab.Screen name="Lier un professionnel" component={Scanner}/>
      </Tab.Navigator>
  );
}
