import PopUPNewEntry from "components/PopUPNewEntry";
import React, {useEffect, useState} from "react";
import {deleteEntry, getCategories, getEntries} from "../api/API";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, FlatList} from "react-native";
import moment from "moment";
import {Entry} from "../components/Entry";

export default function Home() {
  const [show, setShow] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState(null);
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCat = async () => {
    getCategories().then((data) => {
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
    deleteEntry(id).then(() => {
      getValues();
    });
  };

  const getValues = async () => {
    getEntries().then((data) => {
      setEntries(data.reverse());
    });
  };

  useEffect(() => {
    getValues().then();
    getCat().then();
  }, []);

  return (
      <>
        <StatusBar barStyle="dark-content"/>
        <ScrollView style={styles.container}>
          { entries.map((entry, i) => (<Entry entry={entry} key={i} setEntryToEdit={setEntryToEdit} setShow={setShow} deleteRow={deleteRow} />))}
        </ScrollView>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={onShowPopup}>
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
