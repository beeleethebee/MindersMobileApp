import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { BottomPopup } from "../components/BottomPopUp";

const popuplist = [
  {
    id: 1,
    name: "Task",
  },
  {
    id: 2,
    name: "Note",
  },
  {
    id: 3,
    name: "Message",
  },
];

export default function Home() {
  let popupRef = React.createRef();

  const [show, setShow] = useState(false);

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
              <Text>Il était quelle heure ?</Text>
            </View>
          }
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txtSize: {
    fontSize: 20,
  },
});
