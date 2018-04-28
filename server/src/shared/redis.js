import Redis from 'ioredis'

import redisConfig from '../configs/redis'

const client = new Redis(redisConfig)

class RedisClient {
  constructor(namespace = '', expire) {
    this.namespace = namespace
    this.expire = expire
  }

  async get(key) {
    key = this.getKey(key)
    return client.get(key)
  }

  set(key, value) {
    if (key && value) {
      key = this.getKey(key)
      return this.expire
        ? client.set(key, value, 'EX', this.expire)
        : client.set(key, value)
    }

    return false
  }

  async getJson(key) {
    try {
      const data = await this.get(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      return Promise.resolve(null)
    }
  }

  setJson(key, value) {
    if (key && value) {
      this.set(key, JSON.stringify(value))
    }
  }

  async hmget(key, field) {
    key = this.getKey(key)
    let data = null

    try {
      if (field) {
        data = await client.hmget(key, field)

        return data ? JSON.parse(data) : null
      }

      data = await client.hgetall(key)

      if (!Object.keys(data).length) {
        return null
      }

      return Object.keys(data).reduce(
        (obj, key) => ({
          [key]: JSON.parse(data[key]),
          ...obj
        }),
        {}
      )
    } catch (error) {
      return null
    }
  }

  hmset(key, field, value) {
    key = this.getKey(key)

    if (key && field && value) {
      return client.hmset(key, field, JSON.stringify(value))
    }

    return true
  }

  getKey(key) {
    return `${this.namespace}:${key.toLowerCase()}`
  }
}

export default RedisClient
