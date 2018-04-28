import axios from 'axios'
import spotifyConfig from '../../../configs/spotify'
import authService from './auth'

const { apiUrl, auth } = spotifyConfig
const { refresh } = auth
const MAX_RETRIES = 2

class API {
  constructor() {
    this.token = null
    this.refresh = refresh
    this.setToken()
  }

  request(req) {
    return this.retry({ ...req, token: this.token })
  }

  async setToken() {
    try {
      this.token = await authService.renewToken(this.refresh)
      console.log('Spotify Token Set')
    } catch (e) {
      console.log(e)
    }
  }

  async retry({ attempts = 0, maxRetries = MAX_RETRIES, ...req }) {
    try {
      return await this.httpRequest({ ...req, token: this.token })
    } catch ({ response, ...error }) {
      if (response.status !== 401 && attempts === maxRetries) {
        throw response
      }

      try {
        attempts++
        this.token = await authService.renewToken(this.refresh)
      } finally {
        return this.request({
          ...req,
          attempts,
          maxRetries
        })
      }
    }
  }

  httpRequest(req) {
    const {
      method = 'GET',
      url,
      uri,
      data = null,
      params = {},
      token,
      headers
    } = req

    const defaultHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    if (token) {
      params.market = 'from_token'
    }

    return axios({
      method,
      url: uri || apiUrl + url,
      params,
      data,
      headers: headers || defaultHeaders,
      json: true
    }).then(({ data }) => data)
  }
}

export default new API()
