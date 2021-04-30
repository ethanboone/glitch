import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getAllNotes(id) {
    // populate the bug property with the bug the note is on
    const notes = await dbContext.Note.find({ bug: id })
    return notes
  }

  //   async getOneNote(id) {
  //     const note = await dbContext.Note.findOne({ _id: id })
  //     if (!note) {
  //       throw new BadRequest('Invalid Id')
  //     }
  //     return note
  //   }

  async delete(id) {
    const data = await dbContext.Note.findByIdAndDelete(id)
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'successfully deleted'
  }

  async create(body) {
    return await dbContext.Note.create(body)
  }
}

export const notesService = new NotesService()
