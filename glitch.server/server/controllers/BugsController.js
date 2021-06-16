import BaseController from '../utils/BaseController'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from '../utils/Logger'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('/:id/notes', this.getAllNotes)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:id', this.delete)
      .put('/:id', this.edit)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      //
      const data = await bugsService.getAll()
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const data = await bugsService.getOne(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const data = await bugsService.delete(req.params.id, req.userInfo.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      logger.log('controller')
      req.body.id = req.params.id
      const data = await bugsService.edit(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await bugsService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAllNotes(req, res, next) {
    try {
      const data = await notesService.getAllNotes(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
