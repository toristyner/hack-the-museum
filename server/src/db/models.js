import mongoose from 'mongoose'

const models = {
  artwork: 'Artwork',
  artist: 'Artist',
  image: 'Image',
  song: 'Song',
  genre: 'Genre'
}

const imageSchema = mongoose.Schema({
  url: String,
  height: Number,
  width: Number
})

const artistSchema = mongoose.Schema({
  id: String,
  name: String,
  images: [imageSchema]
})

const genreSchema = mongoose.Schema({
  name: String,
  artworkIds: [String],
  popularity: { type: Number, default: 1 }
})

const songSchema = mongoose.Schema({
  id: String,
  name: String,
  uri: String,
  artist: artistSchema,
  images: [imageSchema]
})

const artworkSchema = mongoose.Schema({
  id: String,
  songs: [songSchema],
  genres: mongoose.Schema.Types.Mixed
})

export const Artwork = () => mongoose.model(models.artwork, artworkSchema)
export const Genre = () => mongoose.model(models.genre, genreSchema)
