import axios from 'axios'
import museumConfig from '../../../configs/museum'

const { apiUrl, token } = museumConfig

class API {
  getAllLocations() {
    return this.httpRequest({
      url: '/collection/locations'
    })
  }

  getLocation(name) {
    return this.httpRequest({
      url: '/collection/object/location',
      params: {
        name
      }
    })
  }

  getArtwork(query) {
    return this.httpRequest({
      url: '/collection/object',
      params: {
        query
      }
    })
  }

  httpRequest(req) {
    const { method = 'GET', url, params = {} } = req

    return axios({
      method,
      url: apiUrl + url,
      params: {
        api_token: token,
        ...params
      }
    }).then(({ data }) => data)
  }
}

export default new API()
