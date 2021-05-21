import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { BottomPopup } from "../components/BottomPopUp";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import { Chip } from "react-native-paper";
import Nav from "components/Navigation";

export default function Home() {
  let popupRef = React.createRef();

  const [show, setShow] = useState(false);

  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onShowPopup = () => {
    setShow(true);
  };

  const onClosePopup = () => {
    setShow(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={onShowPopup}>
          <Text style={styles.txtSize}>Show Popup</Text>
        </TouchableWithoutFeedback>
        <BottomPopup
          onClose={() => {
            setShow(false);
          }}
          show={show}
          title="Expliquez nous"
          onTouchOutside={onClosePopup}
          body={
            <View>
              <Text style={styles.title}>Il était quelle heure ?</Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"hour"}
                is24Hour
                display="default"
                style={{ marginTop: 5 }}
                onChange={onChange}
              />
              <Text style={styles.title}>Où étiez-vous ?</Text>
              <TextInput
                placeholder="Ex : Chez de la famille"
                style={{ backgroundColor: "white", height: 42 }}
                mode="outlined"
              />
              <Text style={styles.title}>Que s’est-il passé ?</Text>
              <TextInput
                placeholder="Ex: Déjeuner de famille chez mamie.."
                style={{
                  backgroundColor: "white",
                }}
                mode="outlined"
                multiline
              />
              <Text style={styles.title}>
                Si vous deviez catégoriser vos humeurs et émotions, où
                classeriez-vous celle-ci ?
              </Text>
              <View
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  style={styles.chip}
                  textStyle={styles.chipText}
                  onPress={() => console.log("Pressed")}
                >
                  Pervers
                </Chip>
                <Chip
                  style={styles.chip}
                  textStyle={styles.chipText}
                  onPress={() => console.log("Pressed")}
                >
                  Tristesse
                </Chip>
                <Chip
                  style={styles.chip}
                  textStyle={styles.chipText}
                  onPress={() => console.log("Pressed")}
                >
                  Obsession
                </Chip>
                <Chip
                  style={styles.chip}
                  textStyle={styles.chipText}
                  onPress={() => console.log("Pressed")}
                >
                  Confort
                </Chip>

                <Chip
                  style={styles.chip}
                  textStyle={styles.chipText}
                  onPress={() => console.log("Pressed")}
                >
                  Voyage
                </Chip>
                <Chip
                  style={styles.chip}
                  textStyle={styles.chipText}
                  onPress={() => console.log("Pressed")}
                >
                  Blessure
                </Chip>
                <Chip
                  style={styles.chip}
                  textStyle={styles.chipText}
                  onPress={() => console.log("Pressed")}
                >
                  Souvenirs
                </Chip>
                <Chip
                  style={styles.chip}
                  textStyle={styles.chipText}
                  onPress={() => console.log("Pressed")}
                >
                  +
                </Chip>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text
                  style={[
                    {
                      fontSize: 16,
                      fontFamily: "Avenir-demi",
                      color: "white",
                    },
                  ]}
                >
                  Ajouter
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </SafeAreaView>
    </>
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
