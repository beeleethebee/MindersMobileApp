import React, {useEffect, useState} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Chip, TextInput} from "react-native-paper";
import {postEntries, putEntries} from "../api/API";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import moment from "moment-timezone";
import PopUPNewCategory from "./PopUpNewCategory";
import {BottomPopUp} from "./BottomPopUp";

moment.tz.setDefault("Europe/Paris");
moment().locale("fr");

export default function PopUpNewEntry({
  show, setShow, onClosePopup, getEntries, entryToEdit, categories, setCategories,
}) {
  const [context, setContext] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [tagID, setTagID] = useState([]);

  const [showCreateNewCategory, setShowCreateNewCategory] = useState(false);

  useEffect(() => {
    setContext(entryToEdit ? entryToEdit.context : "");
    setLocation(entryToEdit ? entryToEdit.location : "");
    setDate(entryToEdit ? moment(entryToEdit.time).unix() : new Date());
    let date, month, year, hour, minute;
    if (entryToEdit) {
      date = moment(entryToEdit.time).format("DD");
      month = moment(entryToEdit.time).format("MM");
      year = moment(entryToEdit.time).format("YYYY");
      hour = entryToEdit.time.split("T")[1].split(":")[0];
      minute = moment(entryToEdit.time).format("mm");
      setDate(new Date(date, month, year, hour, minute));
      setTagID(entryToEdit.categories.map((x) => x.id));
    }
  }, [entryToEdit]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const newEntry = async () => {
    let dateTime = moment(date).format("DD/MM/YYYY");
    const data = {
      context: context,
      time: dateTime,
      location: location,
      category_ids: tagID,
    };
    postEntries(data).then(() => {
      getEntries();
      setShow(false);
      setTagID([]);
      setContext("");
      setLocation("");
    });
  };

  const changeEntry = async () => {
    let dateTime = moment(date).format("DD/MM/YYYY HH:mm");
    const data = {
      context: context,
      time: dateTime,
      location: location,
      category_ids: tagID,
    };
    putEntries(entryToEdit.id, data).then((data) => {
      getEntries();
      setShow(false);
    });
  };

  const manageCategory = (category) => {
    console.log(category)
    if (tagID.includes(category.id)) {
      const tagIDCopy = [...tagID];
      const index = tagIDCopy.indexOf(category.id);
      if (index > -1) tagIDCopy.splice(index, 1);
      setTagID([...tagIDCopy]);
    } else setTagID([...tagID, category.id]);
  };

  return (
      <BottomPopUp
          onClose={() => {
            setShow(false);
          }}
          show={show}
          title="Expliquez nous"
          onTouchOutside={onClosePopup}
      >
        <View>
          <Text style={styles.title}>Il était quelle heure ?</Text>
          {/* wont work in Android */}
          <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"hour"}
              is24Hour
              display="default"
              style={{marginTop: 5}}
              onChange={onChange}
          />
          <Text style={styles.title}>Où étiez-vous ?</Text>
          <TextInput
              value={location}
              placeholder="Ex : Chez de la famille"
              style={{backgroundColor: "white", height: 42}}
              mode="outlined"
              onChangeText={(value) => {
                setLocation(value);
              }}
          />
          <Text style={styles.title}>Que s’est-il passé ?</Text>
          <TextInput
              value={context}
              placeholder="Ex: Déjeuner de famille chez mamie.."
              mode="outlined"
              multiline
              style={{
                backgroundColor: "white",
              }}
              onChangeText={(value) => {
                setContext(value);
              }}
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
            {categories.map((category, i) => (
                <Chip
                    key={i}
                    style={styles.chip}
                    selected={tagID.includes(category.id)}
                    textStyle={styles.chipText}
                    selectedColor={"purple"}
                    onPress={() => {
                      manageCategory(category);
                    }}
                >
                  {category.name}
                </Chip>
            ))}

            <Chip
                style={styles.chip}
                textStyle={styles.chipText}
                onPress={() => setShowCreateNewCategory(true)}
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
                style={{
                  fontSize: 16,
                  fontFamily: "Avenir-demi",
                  color: "white",
                }}
            >
              Ajouter
            </Text>
          </TouchableOpacity>
          <PopUPNewCategory
              categories={categories}
              setCategories={setCategories}
              show={showCreateNewCategory}
              setShow={setShowCreateNewCategory}
              onClosePopup={() => {
                setShowCreateNewCategory(false);
              }}
          />
        </View>
      </BottomPopUp>
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
