import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/notesService'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:id', this.delete)
      .put('/:id', this.edit)
      .post('', this.create)
  }

  async delete(req, res, next) {
    try {
      const data = await notesService.delete(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await notesService.edit(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await notesService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
