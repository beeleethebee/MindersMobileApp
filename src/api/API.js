import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://studygrock.ngrok.io/api/",
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

export async function showTherapist(id) {
  const header = await getHeader();
  let rep = {};
  await api.get(`therapists/${id}`, header).then((response) => {
    rep = response.data;
  });
  return rep;
}

export async function SignIn(data) {
  let rep = {};
  await api.post("auth/sign_in", data).then((response) => {
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

export async function addTherapist(id) {
  const header = await getHeader();
  let rep = {};
  await api.get(`therapists/${id}/add`, header).then((response) => {
    rep = response.data;
  });
  return rep;
}

export async function newCategory(data) {
  const header = await getHeader();
  let rep = {};
  await api.post("categories/", data, header).then((response) => {
    rep = response.data;
  });
  return rep;
}

export async function getCategories() {
  const header = await getHeader();
  let rep = {};
  await api.get("categories/", header).then((response) => {
    rep = response.data;
  });
  return rep;
}

export async function validateToken() {
  const header = await getHeader();
  let rep = {};
  await api
    .get("auth/validate_token", header)
    .then((response) => {
      rep = response.data.success;
    })
    .catch((error) => {
      console.log(error);
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

export async function postEntries(data) {
  const header = await getHeader();
  let rep = {};
  await api
    .post("entries", data, header)
    .then((response) => {
      rep = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return rep;
}

export async function putEntries(id, data) {
  const header = await getHeader();
  let rep = {};
  await api.put(`entries/${id}`, data, header).then((response) => {
    rep = response.data;
  });
  return rep;
}

export async function deleteEntry(id) {
  const header = await getHeader();
  let rep = {};
  await api.delete(`entries/${id}`, header).then((response) => {
    rep = response.data;
  });
  return rep;
}
