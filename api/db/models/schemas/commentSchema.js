import mongoose from 'mongoose'
var Schema = mongoose.Schema

var options = { discriminatorKey: 'type', timestamps: true }

var CommentSchema = new Schema(
  {
    uuid: String,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parade: { type: Schema.Types.ObjectId, ref: 'Parade', required: true },
    content: String
  },
  options
)

export default CommentSchema