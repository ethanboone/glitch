import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async getAll(bug) {
    const res = await api.get(`api/bugs/${bug}/notes`)
    AppState.notes = res.data
  }

  async create(note) {
    await api.post('api/notes', note)
    this.getAll(note.bug)
  }

  async delete(bug, id) {
    api.delete(`api/notes/${id}`)
    this.getAll(bug)
  }
}

export const notesService = new NotesService()
