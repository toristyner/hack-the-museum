import Redis from '../../../shared/redis'
import config from '../../../configs/museum'

export default new Redis(config.cacheNamespace)
