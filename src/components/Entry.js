import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import moment from "moment";
import React from "react";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7E85F9",
    width: "100%",
    height: 47,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7E85F9",
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#0E151C",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    marginTop: 10,
    marginBottom: 10,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    borderRadius: 4,
    padding: 15,
  },

});


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
      <View style={styles.card}>
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
