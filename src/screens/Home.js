import PopUPNewEntry from "components/PopUpNewEntry";
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
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="dark-content"/>
        <Text style={{
          fontSize: 26,
          textAlign: 'center',
          fontFamily: "Avenir-demi",
          marginTop: 10,
        }}>
          Accueil
        </Text>
        <FlatList
            data={entries}
            style={styles.container}
            renderItem={(({item}) => (
                <Entry entry={item}
                       setEntryToEdit={setEntryToEdit}
                       setShow={setShow}
                       deleteRow={deleteRow}
                />
            ))}
            keyExtractor={item => item.id}
        />
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
      </SafeAreaView>
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
  container: {
    padding: 20,
  },
});
