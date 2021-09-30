import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Illustration from "assets/images/illustrations/cloud.png";
import Wave from "assets/images/shapes/wave.png";
import colors from "assets/design/colors";

const { width } = Dimensions.get("window");

export default function GetStarted({ navigation }) {
  // TODO : Faire un système d'auth automatique quand on se rappelle de l'utilisateur connecté

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View style={styles.container}>
        <Image style={styles.illustration} source={Illustration} />
        <Text style={[styles.textTop, colors.textAccent]}>
          Bienvenue sur Minders,
        </Text>
        <Text style={[styles.textBot, colors.textGrey]}>
          l'application qui vous guide et prend soin de vous ☁ 🤗
        </Text>
      </View>
      <View>
        <Image style={styles.wave} source={Wave} />
        <View style={{ ...colors.backgroundPrimary100, ...styles.bottomView }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Inscription")}
            underlayColor="violet"
          >
            <Text
              style={{
                ...colors.textPrimary100,
                fontSize: 16,
                fontFamily: "Avenir-demi",
              }}
            >
              Commencer l’aventure
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Connexion")}
            underlayColor="violet"
            style={{ marginTop: 30 }}
          >
            <Text
              style={{
                ...colors.textWhite,
                fontSize: 16,
                fontFamily: "Avenir-demi",
              }}
            >
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bottomView: {
    width: width,
    display: "flex",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 100,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  illustration: {
    marginTop: 50,
    width: 240,
    height: 189,
  },
  textTop: {
    fontFamily: "Avenir-demi",
    fontSize: 24,
    marginTop: 25,
  },
  textBot: {
    fontFamily: "Avenir-medium",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    paddingLeft: 35,
    paddingRight: 35,
  },
  wave: {
    width: width,
    height: 173,
  },
  button: {
    backgroundColor: "white",
    width: 253,
    height: 47,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
});
