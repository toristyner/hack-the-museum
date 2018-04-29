import auth from './spotify/controllers/auth'
import search from './spotify/controllers/search'
import artist from './spotify/controllers/artist'
import genres from './spotify/controllers/genres'
import museumLocations from './museum/controllers/locations'
import museumJobs from './museum/controllers/jobs'
import museumArtwork from './museum/controllers/artwork'

export default [
  {
    url: '/spotify',
    routes: [auth, search, artist, genres]
  },
  {
    url: '/museum',
    routes: [museumLocations, museumArtwork, museumJobs]
  }
]
