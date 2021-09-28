import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import React, {useEffect, useState} from "react";
import {BarCodeScanner} from "expo-barcode-scanner";
import {addTherapist, showTherapist} from "../api/API";
import Toast from "react-native-toast-message";
import {ErrorToast, SuccessToast} from "../components/Toats";

function QrScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({data}) => {
    setScanned(true);
    setDataLoaded(true);
    showTherapist(data)
        .then((data) => setData(data))
        .catch((error) => console.log(error));
  };

  const add = async () => {
    addTherapist(data.id)
        .then(() => {
          setScanned(false);
          return Toast.show({
            ...SuccessToast,
            text1: "Ajout de votre psychologue",
            text2: "Votre psychologue a été ajouté avec succès ! 😊",
          });
        })
        .catch(() => {
          return Toast.show({
            ...ErrorToast,
            text2: "Un problème est survenu 😔",
          });
        });
  };

  if (hasPermission === null) {
    return <Text>Nous avons besoin de la permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>Nous n'avons pas accès à la caméro</Text>;
  }
  if (!scanned) {
    return (
        <View
            style={{
              justifyContent: "center",
              marginTop: "auto",
              marginBottom: "auto",
            }}
        >
          <Text
              style={{
                paddingHorizontal: 40,
                marginBottom: 20,
                color: "#7E85F9",
                textAlign: "center",
              }}
          >
            Scanne le QRCode d'un professionnel
          </Text>
          <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{
                width: 300,
                height: 300,
                alignSelf: "center",
                borderRadius: 20,
              }}
          />
        </View>
    );
  }

  if (!dataLoaded) {
    return null;
  }

  return (
      <SafeAreaView style={{flex: 1}}>
        <View
            style={{
              paddingHorizontal: 50,
              marginTop: "auto",
              marginBottom: "auto",
            }}
        >
          <Text>Prénom : {data?.first_name}</Text>
          <Text>Nom : {data?.last_name}</Text>
          <Text>Email : {data?.email}</Text>
          <Text>Adresse : {data?.address}</Text>

          <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40,
              }}
          >
            <TouchableOpacity onPress={add} style={styles.button}>
              <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Avenir-demi",
                    color: "white",
                  }}
              >
                Ajouter {data?.first_name} {data?.last_name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setScanned(false)}
                style={styles.button2}
            >
              <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Avenir-demi",
                    color: "#7E85F9",
                  }}
              >
                Scanner un autre psychologue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  );
}

export default QrScanner;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7E85F9",
    width: "100%",
    marginTop: 80,
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
  button2: {
    width: "100%",
    marginTop: 20,
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
