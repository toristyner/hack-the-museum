import Redis from '../../../shared/redis'
import config from '../../../configs/spotify'

export default new Redis(config.cacheNamespace)
