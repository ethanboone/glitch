import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
// make sure to .populate bug ObjectId

const Note = new Schema({
  body: { type: String, required: true },
  bug: { type: ObjectId, ref: 'Bug', required: true },
  creatorId: { type: String, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Note.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Note
