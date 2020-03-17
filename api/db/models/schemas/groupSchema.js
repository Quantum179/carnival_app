import mongoose from 'mongoose'
var Schema = mongoose.Schema

var options = { discriminatorKey: 'type', timestamps: true }

var GroupSchema = new Schema(
  {
    uuid: String,
    name: { type: String, required: true },
    city: {type: Schema.Types.ObjectId, ref: 'City', required: true},
    position: { type: {lat: {type: Number}, lng: {type: Number}}, required: true },
    typeGroup: { type: Schema.Types.ObjectId, ref: 'TypeGroup', required: true }
  },
  options
)

export default GroupSchema