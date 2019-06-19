import config from '../config'

const UsersApiService = {
  postLogin(user) {
    return fetch(`${config.API_ENDPOINT}/users/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => {
      if (!res.ok) {
        return res.json()
          .then(e => Promise.reject(e))
      }
      return res.json()
      }
    )
  }
}

export default UsersApiService