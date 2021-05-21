import * as React from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dimensions } from "react-native";
var width = Dimensions.get("window").width;
import Illustration from "assets/images/illustrations/Minders.png";
import Toast from "react-native-toast-message";
import { SignIn } from "../../API";
import { TextInput } from "react-native-paper";
import { useEffect } from "react";

export default function Login({ navigation }) {
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLog, setIsLog] = React.useState(false);

  useEffect(() => {
    if (isLog) {
      navigation.navigate("ActivityPage");
    }
  });

  const sendForm = async () => {
    if (!mail || !password)
      return Toast.show({
        type: "error",
        position: "top",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 55,
        bottomOffset: 40,
        text1: "Erreur",
        text2: "Il ne manquerai pas quelque chose ? 🤔",
      });
    const data = { email: mail, password: password };

    SignIn(data)
      .then(() => {
        Toast.show({
          type: "success",
          position: "top",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 55,
          bottomOffset: 40,
          text1: "Coucou <insérer nom> !",
          text2: "Content de te voir 🤗",
        });
        setIsLog(true);
      })
      .catch((error) => {
        let textError =
          "Il y a un petit soucis de notre côté .. Veuillez réessayer 😟";
        if (error.response.status === 401)
          textError = "Mauvais identifiants ☹️";
        return Toast.show({
          type: "error",
          position: "top",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 55,
          bottomOffset: 40,
          text1: "Erreur",
          text2: textError,
        });
      });
  };

  return (
    <ScrollView
      style={{
        width: width,
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 45,
          paddingRight: 45,
          paddingTop: 60,
          paddingBottom: 60,
        }}
      >
        <Image style={styles.illustration} source={Illustration} />
        <Text style={styles.welcome}>Bienvenue,</Text>
        <Text style={styles.tinyText}>Connectez-vous pour continuer</Text>

        <TextInput
          label="Email"
          style={{ backgroundColor: "white", marginTop: 40, height: 42 }}
          value={mail}
          onChangeText={(mail) => setMail(mail)}
          mode="outlined"
        />

        <TextInput
          label="Mot de passe"
          secureTextEntry={true}
          style={{ backgroundColor: "white", marginTop: 15, height: 42 }}
          value={password}
          onChangeText={(password) => setPassword(password)}
          mode="outlined"
        />
        <Text
          style={[
            {
              fontSize: 12,
              fontFamily: "Avenir-demi",
              color: "#011234",
              width: "100%",
              textAlign: "right",
              marginTop: 10,
            },
          ]}
        >
          Mot de passe oublié ?
        </Text>

        <TouchableOpacity style={styles.button} onPress={sendForm}>
          <Text
            style={[
              {
                fontSize: 16,
                fontFamily: "Avenir-demi",
                color: "white",
              },
            ]}
          >
            Connexion
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  illustration: {
    width: 290,
    height: 50,
    position: "absolute",
    top: 48,
    left: 45,
  },
  welcome: {
    fontFamily: "Avenir-demi",
    color: "#011234",
    fontSize: 36,
  },
  tinyText: {
    fontSize: 16,
    color: "#CBCEFD",
    fontFamily: "Avenir-demi",
    paddingBottom: 50,
  },
  button: {
    backgroundColor: "#7E85F9",
    width: "100%",
    marginTop: 80,
    height: 47,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7E85F9",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
});
