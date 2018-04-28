//import redis from '../../../shared/redis'

// Remove when we have redis setup
const redis = {
  hget: () => Promise.resolve({}),
  hset: () => Promise.resolve({})
}

export default {
  get,
  set
}

async function get(key, track) {
  try {
    let { _id: id, ...cache } = await redis.hget(key)
    return track ? tracks[track] : { id, cache }
  } catch (error) {
    return Promise.resolve({})
  }
}

async function set(key, { id, ...tracks }) {
  let value = tracks

  if (id) {
    value._id = id
  }

  redis.hset(key, value)
}
