import { AppState } from '../AppState'
import { api } from './AxiosService'
import { logger } from '../utils/Logger'

class BugsService {
  async getAll() {
    const res = await api.get('api/bugs')
    logger.log(res.data)
    AppState.bugs = res.data
  }

  async getOne(id) {
    const res = await api.get(`api/bugs/${id}`)
    logger.log(res.data)
    AppState.bugDetails = res.data
  }
}

export const bugsService = new BugsService()
