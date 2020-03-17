import mongoose from 'mongoose'
import { v4 as uuid4} from 'uuid'
import { hashPass } from '../../../utils'
var Schema = mongoose.Schema

var options = { discriminatorKey: 'type', timestamps: true }

var UserSchema = new Schema(
  {
    uuid: {type: String, required: true},
    name: { type: String, required: true },
    roles: [String],
    email: { type: String, required: true },
    position: { type: { lat: { type: Number }, lng: { type: Number }}},
    password: {type: String, required: true}
  },
  options
)

UserSchema.pre('validate', function (next) {
  this.uuid = uuid4()
  next()
})

UserSchema.pre('save', function(next) {
  hashPass(this.password)
    .then(hash => {
      this.password = hash
      next()
    })
})

export default UserSchema