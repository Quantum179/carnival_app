import mongoose from 'mongoose'
var Schema = mongoose.Schema

var options = { discriminatorKey: 'type', timestamps: true }

var TypeGroupSchema = new Schema(
  {
    uuid: String,
    name: String
  },
  options
)

export default TypeGroupSchema