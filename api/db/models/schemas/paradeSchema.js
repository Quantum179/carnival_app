import mongoose from 'mongoose'
var Schema = mongoose.Schema

var options = { discriminatorKey: 'type', timestamps: true }

var ParadeSchema = new Schema(
  {
    uuid: String,
    name: { type: String, required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true},
    startDate: Date,
    endDate: Date,
    themes: [String],
    position: { type: {lat: {type: Number}, lng: {type: Number}}, required: true },
    area: { type: [{lat: {type: Number}, lng: {type: Number}}], required: true},
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group'}],
    circuits: [{ type: Schema.Types.ObjectId, ref: 'Circuit', required: true}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
  },
  options
)

export default ParadeSchema