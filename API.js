import axios from "axios";

const api = axios.create({
  baseURL: "http://46.101.225.34/api/",
  timeout: 20000,
  headers: {
    // Authorization: "Bearer " + getCookie("token"),
    "Content-Type": "application/json",
  },
});

export async function ValidateToken() {
  let rep = {};
  await api.get("validate_token").then((response) => (rep = response.data));
  return rep;
}

export async function SignIn(data) {
  let rep = {};
  await api
    .post("auth/sign_in", data)
    .then((response) => (rep = response.data));
  return rep;
}

export async function Registration(data) {
  let rep = {};
  await api.post("auth", data).then((response) => (rep = response.data));
  return rep;
}
