import Queue from 'bull'
import config from '../configs/redis'

const { port, host, password } = config

export default desc => Queue(desc, { redis: { port, host, password } })
