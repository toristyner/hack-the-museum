import mongoose from 'mongoose'
import config from '../configs/db'

const { username, password, port } = config

export default {
  connect: () =>
    mongoose.connect(`mongodb://${username}:${password}@mongo:${port}`)
}
