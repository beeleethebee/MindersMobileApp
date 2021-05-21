import {
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Text,
  FlatList,
} from "react-native";
import React from "react";

const deviceHeight = Dimensions.get("window").height;

export function BottomPopup({ title, body, onTouchOutside, show, onClose }) {
  const renderOutsideTouchable = (onTouch) => {
    const view = <View style={{ flex: 1, width: "100%" }} />;
    if (!onTouch) return view;

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{ flex: 1, width: "100%" }}
      >
        {view}
      </TouchableWithoutFeedback>
    );
  };

  const renderTitle = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: "#182E44",
            fontSize: 25,
            fontWeight: "500",
            marginTop: 15,
            marginBottom: 30,
          }}
        >
          {title}
        </Text>
      </View>
    );
  };

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={show}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#000000AA",
          justifyContent: "flex-end",
        }}
      >
        {renderOutsideTouchable(onTouchOutside)}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            width: "100%",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            paddingHorizontal: 10,
            maxHeight: deviceHeight * 0.4,
          }}
        >
          {renderTitle()}
          {body}
        </View>
      </View>
    </Modal>
  );
}
