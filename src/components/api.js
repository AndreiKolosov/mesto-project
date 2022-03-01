const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '32e69527-8018-4c7f-823e-614d86c48870',
    'Content-Type': 'application/json',
  },
};

const parseResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => parseResponse(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => parseResponse(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  })
    .then((res) => parseResponse(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

const updateUser = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  })
    .then((res) => parseResponse(res))
    .catch((err) => {
      console.log(err);
    });
};

const createCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  })
    .then((res) => parseResponse(res))
    .catch((err) => {
      console.log(err);
    });
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => parseResponse(res))
    .catch((err) => {
      console.log(err);
    });
};

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((res) => parseResponse(res))
    .catch((err) => {
      console.log(err);
    });
};

const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => parseResponse(res))
    .catch((err) => {
      console.log(err);
    });
};
export default {
  getUser,
  getCards,
  updateAvatar,
  updateUser,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
