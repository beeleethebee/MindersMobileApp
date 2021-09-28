import React, {useState} from "react";
import {BottomPopup} from "./BottomPopUp";
import {TextInput} from "react-native-paper";
import {newCategory} from "../api/API";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Toast from "react-native-toast-message";
import moment from "moment-timezone";
import {ErrorToast, SuccessToast} from "./Toats";

moment.tz.setDefault("Europe/Paris");
moment().locale("fr");

export default function PopUPNewCategory({
  show, setShow, onClosePopup, categories, setCategories,
}) {
  const [name, setName] = useState("");

  const createCategory = async () => {
    newCategory({name: name})
        .then((data) => {
          setCategories([...categories, {id: -5, name: name}]);
          Toast.show({
            ...SuccessToast,
            text1: "Catégorie créée avec succès !",
          });
        })
        .catch((error) => {
          Toast.show({
            ...ErrorToast,
            text1: "Une erreur s'est produite..",
            text2: "Nous nous excusons, veuillez réessayer plus tard..",
          });
        });
  };

  return (
      <BottomPopup
          onClose={() => {
            setShow(false);
          }}
          show={show}
          title="Création d'une nouvelle catégorie"
          onTouchOutside={onClosePopup}
      >
        <View>
          <Text style={styles.title}>Nom de votre catégorie</Text>

          <TextInput
              onChangeText={(value) => {
                setName(value);
              }}
              value={name}
              placeholder="Ex : Addictions"
              style={{backgroundColor: "white", height: 42}}
              mode="outlined"
          />
          <TouchableOpacity
              onPress={() => {
                if (name) {
                  createCategory().then();
                }
                onClosePopup();
              }}
              style={styles.button}
          >
            <Text
                style={[
                  {
                    fontSize: 16,
                    fontFamily: "Avenir-demi",
                    color: "white",
                  },
                ]}
            >
              Créer
            </Text>
          </TouchableOpacity>
        </View>
      </BottomPopup>
  );
}
const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#FFE8E1",
    marginTop: 10,
    marginLeft: 4,
    marginRight: 4,
  },
  chipText: {
    color: "#FF9E83",
  },
  title: {
    color: "#7E85F9",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#7E85F9",
    width: "100%",
    marginTop: 20,
    height: 47,
    borderRadius: 15,
    marginBottom: 50,
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
