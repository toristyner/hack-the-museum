import auth from './spotify/controllers/auth'
import search from './spotify/controllers/search'
import artists from './spotify/controllers/artists'
import museumLocations from './museum/controllers/locations'
import museumJobs from './museum/controllers/jobs'

export default [
  {
    url: '/spotify',
    routes: [auth, search, artists]
  },
  {
    url: '/museum',
    routes: [museumLocations, museumJobs]
  }
]
