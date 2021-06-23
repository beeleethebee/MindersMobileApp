import PopUPNewEntry from "components/PopUPNewEntry";
import React, { useState, useEffect } from "react";
import { getEntries } from "../../API";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";

export default function Home() {
  const [show, setShow] = useState(false);

  const [entreties, setEntries] = useState([]);

  const onShowPopup = () => {
    setShow(true);
  };

  const onClosePopup = () => {
    setShow(false);
  };

  const getValues = async () => {
    getEntries().then((data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    getValues();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
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
          show={show}
          setShow={setShow}
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
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
});
