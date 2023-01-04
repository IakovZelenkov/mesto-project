import config from "./config.json";
export const localConfig = config;

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export function getUser() {
  return fetch(`${localConfig.baseUrl}/users/me`, {
    headers: localConfig.headers,
  }).then((res) => checkResponse(res));
}

export function setUserId(userId) {
  localConfig.userId = userId;
}

export function getInitialCards() {
  return fetch(`${localConfig.baseUrl}/cards`, {
    headers: localConfig.headers,
  }).then((res) => checkResponse(res));
}

export function updateUserData(name, about) {
  return fetch(`${localConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: localConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => checkResponse(res));
}

export function updateUserAvatar(avatar) {
  return fetch(`${localConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: localConfig.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then((res) => checkResponse(res));
}

export function postNewCard(name, link) {
  return fetch(`${localConfig.baseUrl}/cards`, {
    method: "POST",
    headers: localConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => checkResponse(res));
}

export function deleteCard(id) {
  return fetch(`${localConfig.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: localConfig.headers,
  }).then((res) => checkResponse(res));
}

export function toggleLike(id, method) {
  return fetch(`${localConfig.baseUrl}/cards/likes/${id}`, {
    method: method,
    headers: localConfig.headers,
  }).then((res) => checkResponse(res));
}
