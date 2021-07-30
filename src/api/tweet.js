import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function saveTweetApi(message) {
  const url = `${API_HOST}/tweet`;

  const data = {
    message: message,
  };

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => result)
    .catch((err) => err);
}

export function getUserTweetsApi(idUser, page) {
  const url = `${API_HOST}/tweet?id=${idUser}&page=${page}`;

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => err);
}
