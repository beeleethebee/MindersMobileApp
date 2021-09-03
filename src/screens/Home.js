import PopUPNewEntry from "components/PopUPNewEntry";
import React, { useState, useEffect } from "react";
import { getEntries, deleteEntry, getCategories } from "../../API";
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import moment from "moment";

export default function Home() {
  const [show, setShow] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState(null);

  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCat = async () => {
    getCategories().then((data) => {
      console.log(data);
      setCategories(data);
    });
  };

  const onShowPopup = () => {
    setShow(true);
  };

  const onClosePopup = () => {
    setShow(false);
  };

  const deleteRow = async (id) => {
    deleteEntry(id).then((data) => {
      getValues();
    });
  };

  const getValues = async () => {
    getEntries().then((data) => {
      setEntries(data.reverse());
    });
  };

  useEffect(() => {
    getValues();
    getCat();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container}>
        {entries.map((entry, i) => {
          const hour = entry.time
            .split("T")[1]
            .split(":")
            .slice(0, 2)
            .join(":");

          return (
            <View style={styles.card} key={i}>
              <Text>{entry.context}</Text>
              <Text>{entry.location}</Text>
              <Text>
                {moment(entry.time).format("DD/MM/YYYY [at] ") + hour}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  deleteRow(entry.id);
                }}
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
                  style={[
                    {
                      fontSize: 16,
                      fontFamily: "Avenir-demi",
                      color: "white",
                    },
                  ]}
                >
                  Modifier
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onShowPopup}>
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
        <PopUPNewEntry
          setCategories={setCategories}
          categories={categories}
          getEntries={getValues}
          show={show}
          setShow={setShow}
          entryToEdit={entryToEdit}
          onClosePopup={onClosePopup}
        />
      </SafeAreaView>
    </>
  );
}

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
  container: {
    padding: 20,
  },
});
