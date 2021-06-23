import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getHeader = async () => {
  const accessToken = await AsyncStorage.getItem("@access-token");
  const client = await AsyncStorage.getItem("@client");
  const uid = await AsyncStorage.getItem("@uid");

  return {
    headers: {
      "access-token": accessToken,
      client: client,
      uid: uid,
    },
  };
};

export async function SignIn(data) {
  let rep = {};
  await api.post("auth/sign_in", data).then((response) => {
    // console.log(response.headers["access-token"]); // client // uid
    rep = response.data;
    try {
      AsyncStorage.setItem("@access-token", response.headers["access-token"]);
      AsyncStorage.setItem("@uid", response.headers["uid"]);
      AsyncStorage.setItem("@client", response.headers["client"]);
    } catch (error) {
      console.log(error);
    }
  });
  return rep;
}

export async function Registration(data) {
  let rep = {};
  await api.post("auth", data).then((response) => (rep = response.data));
  return rep;
}

export async function getEntries() {
  const header = await getHeader();
  let rep = {};
  await api.get("entries", header).then((response) => {
    rep = response.data;
  });
  return rep;
}
