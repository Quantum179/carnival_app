import mongoose from 'mongoose'

import CircuitSchema from './schemas/circuitSchema'
import GroupSchema from './schemas/groupSchema'
import ParadeSchema from './schemas/paradeSchema'
import TypeGroupSchema from './schemas/typeGroupSchema'
import UserSchema from './schemas/userSchema'
import VoteSchema from './schemas/voteSchema'
import CommentSchema from './schemas/commentSchema'
import CitySchema from './schemas/citySchema'
import SeedSchema from './schemas/seedSchema'

export let Group, Parade, Vote, Circuit, Position, User, TypeGroup, Comment, City, Seed


export const loadModels = () => {
  Group = mongoose.model('Group', GroupSchema)
  User = mongoose.model('User', UserSchema)
  Parade = mongoose.model('Parade', ParadeSchema)
  TypeGroup = mongoose.model('TypeGroup', TypeGroupSchema)
  Vote = mongoose.model('Vote', VoteSchema)
  Comment = mongoose.model('Comment', CommentSchema)
  Circuit = mongoose.model('Circuit', CircuitSchema),
  City = mongoose.model('City', CitySchema),
  Seed = mongoose.model('Migration', SeedSchema)
}