import mongoose from 'mongoose'
var Schema = mongoose.Schema

var options = { discriminatorKey: 'type', timestamps: true }

var CitySchema = new Schema(
  {
    uuid: String,
    name: String
  },
  options
)

export default CitySchema