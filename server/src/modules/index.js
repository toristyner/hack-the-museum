import auth from './spotify/controllers/auth'
import search from './spotify/controllers/search'
import artists from './spotify/controllers/artists'

export default [
  {
    url: '/spotify',
    routes: [auth, search, artists]
  }
]
