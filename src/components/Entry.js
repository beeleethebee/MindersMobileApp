import {Text, TouchableOpacity, View} from "react-native";
import moment from "moment";
import React from "react";

export function Entry({
  entry, setEntryToEdit, setShow, deleteRow,
}) {
  if (entry === undefined) {
    return null;
  }

  const {
    time,
    context,
    location,
    id,
  } = entry;

  const hour = time
      .split("T")[1]
      .split(":")
      .slice(0, 2)
      .join(":");

  return (
      <View style={styles.card} key={i}>
        <Text>{context}</Text>
        <Text>{location}</Text>
        <Text>
          {moment(time).format("DD/MM/YYYY [at] ") + hour}
        </Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
              deleteRow(id).then();
            }}
        >
          <Text
              style={{
                fontSize: 16,
                fontFamily: "Avenir-demi",
                color: "white",
              }}
          >
            Supprimer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setEntryToEdit(entry);
              setShow(true);
            }}
        >
          <Text
              style={{
                fontSize: 16,
                fontFamily: "Avenir-demi",
                color: "white",
              }}
          >
            Modifier
          </Text>
        </TouchableOpacity>
      </View>
  );
}
