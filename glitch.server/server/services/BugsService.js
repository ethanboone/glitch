import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getAll(query = {}) {
    const bugs = await dbContext.Bug.find(query)
      .populate('creator')
    return bugs
  }

  async getOne(id) {
    const bug = await dbContext.Bug.findOne({ _id: id })
      .populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async delete(bugId, userId) {
    // delete request updates the bug to closed, considered a "soft delete"
    const data = await dbContext.Bug.findOneAndUpdate({ _id: bugId, creatorId: userId }, { closed: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'successfully deleted'
  }

  async edit(body) {
    // what does this param say?
    // first argument is properties to find in database, second is what is being updated, ensures that the updated object is being sent back

    const data = await dbContext.Bug.findOneAndUpdate({ _id: body.id, closed: false }, { description: body.description, title: body.title }, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Bug Id or Not The Creator')
    }
    return data
  }

  async create(body) {
    return await dbContext.Bug.create(body)
  }
}

export const bugsService = new BugsService()
