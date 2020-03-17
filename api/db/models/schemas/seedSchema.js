import mongoose from 'mongoose'
var Schema = mongoose.Schema

var options = { discriminatorKey: 'type', timestamps: true }

var SeedSchema = new Schema(
  {
    name: String
  },
  options
)

export default SeedSchema