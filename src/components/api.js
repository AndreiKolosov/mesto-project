const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '32e69527-8018-4c7f-823e-614d86c48870',
    'Content-Type': 'application/json',
  },
};

function responseHandler(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function errorHendler(err) {
  console.log(err);
}

function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(responseHandler);
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(responseHandler);
}

export default { getCards, getUser, errorHendler };
