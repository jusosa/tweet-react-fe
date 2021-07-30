import { API_HOST, TOKEN_KEY } from "../utils/constants";
import jwtDecode from "jwt-decode";

export function signUpApi(user) {
  const url = `${API_HOST}/register`;
  const userTemp = {
    ...user,
    mail: user.mail.toLowerCase(),
    birthdate: new Date(),
  };
  delete userTemp.repeatPassword;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userTemp),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "Email ya esta registrado" };
    })
    .then((result) => result)
    .catch((err) => err);
}

export function login(user) {
  const url = `${API_HOST}/login`;

  const data = {
    ...user,
    mail: user.mail.toLowerCase(),
  };

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "Email ya esta registrado" };
    })
    .then((result) => result)
    .catch((err) => err);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function setTokenApi(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getTokenApi() {
  return localStorage.getItem(TOKEN_KEY);
}

function isExpiredToken(token) {
  const { exp } = jwtDecode(token);
  const expired = exp * 1000;
  const timeout = expired - Date.now();

  return timeout <= 0;
}

export function isUserLogged() {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    logout();
    return null;
  }

  if (isExpiredToken(token)) {
    logout();
  }

  return jwtDecode(token);
}
