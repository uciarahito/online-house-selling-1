const mongoose = require('mongoose')
const Schema = mongoose.Schema

let houseSchema = new Schema({
  title: String,
  description: String,
  owner: String,
  phone: String,
  size: String,
  price: String,
  image: String,
  location: String,
  latlong: String,
  city: String,
  state: String,
  created_at: {
    type: Date,
    default: Date.now()
  }
})

let House = mongoose.model('House', houseSchema)
module.exports = House