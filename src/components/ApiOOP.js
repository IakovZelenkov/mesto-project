export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      this._handleResponse
    );
  }

  updateUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      this._handleResponse
    );
  }

  updateUserData(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleResponse);
  }

  postNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  toggleLike(id, method) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: method,
      headers: this._headers,
    }).then(this._handleResponse);
  }
  // _getData = (path, method = "GET", body = null) => {
  //   const params = {
  //     method: method,
  //     headers: this._headers,
  //   };
  //   if (body){
  //     params.body = JSON.stringify(body);
  //   }

  //   return fetch (`${this._baseUrl}/${path}`, params)
  //     .then ((res) => {
  //       return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  //     });
  //   }

  // getUser(){
  //   // return this._getData("users/me");
  //   console.log(this._baseUrl);
  //   console.log(this._headers);
  //   return fetch(`${this._baseUrl}/users/me`, {
  //   headers: this._headers,
  // }).then((res) => this._handleResponse(res));
  // }

  // getInitialCards(){
  //   return this._getData("cards");
  // }

  // updateUserData(name, about) {
  //   return this._getData("users/me", "PATCH", {name: name, about: about});
  // }

  // postNewCard(name, link){
  //   return this._getData("cards", "POST", {name: name, link: link});
  // }

  // deleteCard(id){
  //   return this._getData(`cards/${id}`, "DELETE");
  // }

  // toggleLike(id, method){
  //   return this._getData(`cards/likes/${id}`, method);
  // }

  // updateUserAvatar(link){
  //   return this._getData("users/me/avatar", "PATCH", {avatar: link});
  // }
}

// Перенести в index.js
// let userId;

// const cohortId = "plus-cohort-17";
// const authorizationToken = "05444bda-d82e-43a1-ae97-19d1fc6a52cf";

// const config = {
//     baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
//     headers: {
//         authorization: authorizationToken,
//         "Content-type": "application/json",
//     }
// };

// UserInfo
// function setUserId (id){
//     userId = id;
// }
