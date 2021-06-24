import React, { useState, useEffect } from "react";
import { BottomPopup } from "../components/BottomPopUp";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import { Chip } from "react-native-paper";
import { postEntries, putEntries } from "../../API";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import moment from "moment-timezone";

moment.tz.setDefault("Europe/Paris");
moment().locale("fr");

export default function PopUPNewEntry({
  show,
  setShow,
  onClosePopup,
  getEntries,
  entryToEdit,
}) {
  const [context, setContext] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setContext(entryToEdit ? entryToEdit.context : "");
    setLocation(entryToEdit ? entryToEdit.location : "");
    setDate(entryToEdit ? moment(entryToEdit.time).unix() : new Date());
    let date = null;
    let month = null;
    let year = null;
    let hour = null;
    let minute = null;
    if (entryToEdit) {
      date = moment(entryToEdit.time).format("DD");
      month = moment(entryToEdit.time).format("MM");
      year = moment(entryToEdit.time).format("YYYY");
      hour = entryToEdit.time.split("T")[1].split(":")[0];
      minute = moment(entryToEdit.time).format("mm");
      let dateTime = new Date(date, month, year, hour, minute);
      setDate(dateTime);
    }
  }, [entryToEdit]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const newEntry = async () => {
    let dateTime = moment(date).format("DD/MM/YYYY  ");
    const data = new FormData();
    data.append("context", context);
    data.append("time", dateTime);
    data.append("location", location);

    postEntries(data).then((data) => {
      getEntries();
      setShow(false);
    });
  };

  const changeEntry = async () => {
    let dateTime = moment(date).format("DD/MM/YYYY HH:mm");
    const data = new FormData();
    data.append("context", context);
    data.append("time", dateTime);
    data.append("location", location);

    putEntries(entryToEdit.id, data).then((data) => {
      getEntries();
      setShow(false);
    });
  };

  console.log(date);
  return (
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
            onChangeText={(value) => {
              setLocation(value);
            }}
            value={location}
            placeholder="Ex : Chez de la famille"
            style={{ backgroundColor: "white", height: 42 }}
            mode="outlined"
          />
          <Text style={styles.title}>Que s’est-il passé ?</Text>
          <TextInput
            onChangeText={(value) => {
              setContext(value);
            }}
            value={context}
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
          <TouchableOpacity
            onPress={() => {
              entryToEdit ? changeEntry() : newEntry();
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
              Ajouter
            </Text>
          </TouchableOpacity>
        </View>
      }
    />
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
