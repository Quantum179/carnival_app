import mongoose from 'mongoose'
var Schema = mongoose.Schema

var options = { discriminatorKey: 'type', timestamps: true }

var CircuitSchema = new Schema(
  {
    uuid: String,
    positions: { type: [{lat: {type: Number}, lng: {type: Number}}], required: true }
  },
  options
)

export default CircuitSchema