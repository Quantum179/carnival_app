import mongoose from 'mongoose'
var Schema = mongoose.Schema

var options = { discriminatorKey: 'type', timestamps: true }

var VoteSchema = new Schema(
  {
    uuid: {type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parade: { type: Schema.Types.ObjectId, ref: 'Parade', required: true },
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    colorHarmony: { type: Number, min: 0, max: 15, required: true},
    costumes: { type: Number, min: 0, max: 20, required: true},
    ambiance: { type: Number, min: 0, max: 15, required: true},
    movements: { type: Number, min: 0, max: 15, required: true},
    originality: { type: Number, min: 0, max: 15, required: true}
  },
  options
)

export default VoteSchema