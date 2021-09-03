import { Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { showTherapist } from "../../API";

function QrScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setDataLoaded(true);
    console.log("spec");
    showTherapist(data)
      .then((data) => {
        console.log(data, "oui");
        setData(data);
      })
      .catch((error) => {
        console.log(error, "ok");
      });
  };

  function submitAddFriend() {
    console.log("non");
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (!scanned) {
    return (
      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => {
            console.log("ok");
          }}
          style={{ height: "100%", justifyContent: "center", display: "flex" }}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{
              width: 300,
              height: 300,
              alignSelf: "center",
              borderRadius: 20,
            }}
          />
          <Text>Scanne le QRCode d'un professionnel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!dataLoaded) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          setScanned(false);
        }}
      >
        <Text>back {data}</Text>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => submitAddFriend()}
          style={{
            width: "50%",
            borderWidth: 2,
            borderRadius: 25,
            paddingVertical: 5,
            marginTop: 50,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {" "}
            AJOUTER{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default QrScanner;
