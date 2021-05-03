<template>
  <div class="row justify-content-center" v-if="state.bug">
    <div class="col-12">
      <p class="text">
        Title
      </p>
      <h2 class="text">
        {{ state.bug.title }}
      </h2>
      <p class="text">
        Reported By
      </p>
      <h3 class="text">
        {{ state.bug.creator.name }}
      </h3>
      <p class="text">
        Status
      </p><h3 class="text">
        {{ state.bug.closed }}
      </h3>
    </div>
    <div class="col-10 d-flex text-center card bg-dark my-4" v-if="state.bug.description">
      <p class="text-light">
        {{ state.bug.description }}
      </p>
    </div>
    <div class="col-10">
      <div class="d-flex">
        <h2 class="text mx-3">
          Notes
        </h2>
        <button class="btn btn-outline-green text" data-toggle="modal" data-target="#note-modal">
          +
        </button>
        <div class="modal" id="note-modal" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content bg-dark">
              <div class="modal-header bg-dark">
                <h5 class="modal-title text-light">
                  New Note
                </h5>
              </div>
              <div class="modal-body bg-dark">
                <form class="form-group" @submit.prevent="create">
                  <label>Note Message</label>
                  <input type="text" class="form-control" v-model="state.newNote.body" required>
                  <button type="button" class="btn btn-outline-danger text-danger" data-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" class="btn btn-outline-primary text-primary">
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Note v-for="note in state.notes" :key="note.id" :note="note" :bug="bug"></note>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
import { $ } from 'jquery'

export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.bugDetails),
      notes: computed(() => AppState.notes),
      newNote: { bug: route.params.id }
    })
    onMounted(async() => {
      try {
        await bugsService.getOne(route.params.id)
        await notesService.getAll(route.params.id)
        logger.log(state.notes)
      } catch (error) {

      }
    })
    return {
      state,
      async getBugs() {
        try {
          await bugsService.getAll()
        } catch (error) {
          logger.error(error)
        }
      },
      async create() {
        try {
          await notesService.create(state.newNote)
          $('#note-modal').modal('hide')
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.text{
    color: #00ff00;
}

.btn-outline-green{
    border-color: #00ff00;
}
</style>
