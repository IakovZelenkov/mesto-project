import config from "./config.json";
export const localConfig = config;

export function getUser() {
  return fetch(`${localConfig.baseUrl}/users/me`, {
    headers: localConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

export function setUserId(userId) {
  localConfig.userId = userId;
}

export function getInitialCards() {
  return fetch(`${localConfig.baseUrl}/cards`, {
    headers: localConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

export function updateUserData(name, about) {
  return fetch(`${localConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: localConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

export function updateUserAvatar(avatar) {
  return fetch(`${localConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: localConfig.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

export function postNewCard(name, link) {
  return fetch(`${localConfig.baseUrl}/cards`, {
    method: "POST",
    headers: localConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

export function deleteCard(id) {
  return fetch(`${localConfig.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: localConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

export function setLike(id) {
  return fetch(`${localConfig.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: localConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

export function unsetLike(id) {
  return fetch(`${localConfig.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: localConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}
