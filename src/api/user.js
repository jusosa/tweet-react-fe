import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function getUserApi(id) {
  const url = `${API_HOST}/profile?id=${id}`;
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      console.log(response);
      // eslint-disable-next-line no-throw-literal
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => result)
    .catch((err) => err);
}

export function uploadBannerApi(file) {
  const url = `${API_HOST}/banner`;

  const formData = new FormData();
  formData.append("banners", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: formData,
  };

  return fetch(url, params)
    .then((response) => {
      // eslint-disable-next-line no-throw-literal
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => result)
    .catch((err) => err);
}

export function uploadAvatarApi(file) {
  const url = `${API_HOST}/avatar`;

  const formData = new FormData();
  formData.append("avatars", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: formData,
  };

  return fetch(url, params)
    .then((response) => {
      // eslint-disable-next-line no-throw-literal
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => result)
    .catch((err) => err);
}

export function updateUserInfo(data) {
  const url = `${API_HOST}/updateProfile`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => response)
    .catch((err) => err);
}
